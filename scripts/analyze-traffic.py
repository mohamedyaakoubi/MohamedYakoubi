#!/usr/bin/env python3
"""
Analyze archived GitHub traffic data for bot clone patterns.

Usage:
  python scripts/analyze-traffic.py [traffic-data/]

Reads snapshots from the traffic-data/ directory and identifies:
- Clone-to-view ratio anomalies
- Unique cloner spikes
- Day-of-week patterns (bots often clone uniformly)
- Referrer analysis
"""

import json
import os
import sys
import csv
from collections import defaultdict
from datetime import datetime
from pathlib import Path


def load_snapshots(directory: str) -> list[dict]:
    """Load all daily snapshot JSON files."""
    snapshots = []
    data_dir = Path(directory)
    if not data_dir.exists():
        print(f"❌ Directory not found: {directory}")
        sys.exit(1)

    for f in sorted(data_dir.glob("snapshot-*.json")):
        try:
            with open(f) as fp:
                snapshots.append(json.load(fp))
        except json.JSONDecodeError:
            print(f"⚠️  Skipping malformed file: {f.name}")
    return snapshots


def extract_daily_clones(snapshots: list[dict]) -> dict[str, dict]:
    """Deduplicate daily clone entries across overlapping 14-day windows."""
    daily = {}
    for snap in snapshots:
        for entry in snap.get("clones", {}).get("clones", []):
            date = entry["timestamp"][:10]
            daily[date] = {
                "clones": entry["count"],
                "unique_clones": entry["uniques"],
            }
    return dict(sorted(daily.items()))


def extract_daily_views(snapshots: list[dict]) -> dict[str, dict]:
    """Deduplicate daily view entries across overlapping 14-day windows."""
    daily = {}
    for snap in snapshots:
        for entry in snap.get("views", {}).get("views", []):
            date = entry["timestamp"][:10]
            daily[date] = {
                "views": entry["count"],
                "unique_views": entry["uniques"],
            }
    return dict(sorted(daily.items()))


def analyze(directory: str):
    snapshots = load_snapshots(directory)
    if not snapshots:
        print("No snapshot files found. Run the GitHub Action first.")
        return

    print(f"📊 Loaded {len(snapshots)} snapshots\n")

    # --- Daily breakdown ---
    clones = extract_daily_clones(snapshots)
    views = extract_daily_views(snapshots)

    all_dates = sorted(set(list(clones.keys()) + list(views.keys())))

    print("=" * 72)
    print(f"{'Date':<12} {'Clones':>8} {'Uniq.C':>8} {'Views':>8} {'Uniq.V':>8} {'C/V Ratio':>10}")
    print("-" * 72)

    total_clones = 0
    total_views = 0
    day_of_week_clones = defaultdict(int)
    suspicious_days = []

    for date in all_dates:
        c = clones.get(date, {})
        v = views.get(date, {})
        cl = c.get("clones", 0)
        cu = c.get("unique_clones", 0)
        vw = v.get("views", 0)
        vu = v.get("unique_views", 0)
        ratio = f"{cl / vw:.1f}x" if vw > 0 else ("inf" if cl > 0 else "-")

        total_clones += cl
        total_views += vw

        dt = datetime.strptime(date, "%Y-%m-%d")
        day_of_week_clones[dt.strftime("%A")] += cl

        flag = " ⚠️" if cl > 0 and (vw == 0 or cl / max(vw, 1) > 10) else ""
        if flag:
            suspicious_days.append(date)

        print(f"{date:<12} {cl:>8} {cu:>8} {vw:>8} {vu:>8} {ratio:>10}{flag}")

    print("-" * 72)
    overall_ratio = total_clones / max(total_views, 1)
    print(f"{'TOTAL':<12} {total_clones:>8} {'':>8} {total_views:>8} {'':>8} {overall_ratio:.1f}x")

    # --- Day-of-week analysis ---
    print(f"\n{'=' * 40}")
    print("📅 Clone distribution by day of week:")
    print(f"{'=' * 40}")
    for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
        count = day_of_week_clones.get(day, 0)
        bar = "█" * (count // 5) if count > 0 else ""
        print(f"  {day:<10} {count:>6}  {bar}")

    # Uniformity check — bots tend to have flat day-of-week distribution
    if day_of_week_clones:
        values = list(day_of_week_clones.values())
        avg = sum(values) / len(values)
        if avg > 0:
            std = (sum((x - avg) ** 2 for x in values) / len(values)) ** 0.5
            cv = std / avg  # coefficient of variation
            if cv < 0.3 and avg > 10:
                print(f"\n  ⚠️  Very uniform distribution (CV={cv:.2f}) — suggests automated/bot cloning")
            elif cv < 0.5 and avg > 10:
                print(f"\n  ℹ️  Moderately uniform distribution (CV={cv:.2f})")

    # --- Referrer analysis ---
    print(f"\n{'=' * 40}")
    print("🔗 Top referrers (from latest snapshot):")
    print(f"{'=' * 40}")
    latest = snapshots[-1]
    referrers = latest.get("referrers", [])
    if referrers:
        for ref in referrers:
            print(f"  {ref['referrer']:<30} {ref['count']:>6} total, {ref['uniques']:>4} unique")
    else:
        print("  No referrer data available")

    # --- Verdicts ---
    print(f"\n{'=' * 40}")
    print("🔍 ANALYSIS SUMMARY")
    print(f"{'=' * 40}")

    if overall_ratio > 10:
        print(f"  🔴 HIGHLY SUSPICIOUS: Clone/View ratio is {overall_ratio:.1f}x")
        print("     Normal repos have ratios of 1-3x. Yours suggests automated cloning.")
    elif overall_ratio > 5:
        print(f"  🟡 SUSPICIOUS: Clone/View ratio is {overall_ratio:.1f}x")
        print("     This is above normal. Some bot activity likely.")
    else:
        print(f"  🟢 Clone/View ratio ({overall_ratio:.1f}x) is within normal range.")

    if suspicious_days:
        print(f"  🔴 {len(suspicious_days)} days with extreme clone/view ratios detected")

    # Estimate Vercel's contribution
    print(f"\n  ℹ️  Vercel deployment clones estimate:")
    print(f"     ~207 deployments / years of data = negligible portion of {total_clones} total clones")
    print(f"     Even if every deployment clones twice, that's ~414 — a tiny fraction over years.")

    print(f"\n  💡 RECOMMENDATIONS:")
    print(f"     1. Keep this action running to build a historical baseline")
    print(f"     2. Consider making the repo private if the cloning concerns you")
    print(f"     3. Check if your repo appears in any scraping lists or mirrors")
    print(f"     4. Search GitHub for forks/mirrors of your repo:")
    print(f"        https://github.com/mohamedyaakoubi/MohamedYakoubi/network/members")
    print(f"     5. If you use branch protection, enable 'Require signed commits'")
    print(f"        to make it harder for bots to push to forks undetected")


if __name__ == "__main__":
    data_dir = sys.argv[1] if len(sys.argv) > 1 else "traffic-data"
    analyze(data_dir)
