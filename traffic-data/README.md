# GitHub Traffic Monitoring

## Why this exists

This repo sees ~500 clones / 134 unique cloners biweekly but only ~30 views / 2 unique viewers. Even accounting for Vercel deployment clones (~207 total deployments), the numbers don't add up — this is almost certainly bot cloning.

GitHub's traffic API only retains **14 days** of data and doesn't expose clone IPs or user agents, so we archive the data daily.

## Setup

### 1. Create a Personal Access Token

The default `GITHUB_TOKEN` doesn't have traffic API access. You need a **fine-grained PAT**:

1. Go to [GitHub Settings → Developer Settings → Fine-grained tokens](https://github.com/settings/personal-access-tokens/new)
2. Set repository access to **"Only select repositories"** → select `MohamedYakoubi`
3. Under **Repository permissions**, grant:
   - **Administration**: Read-only (required for traffic API)
4. Copy the token
5. Go to your repo **Settings → Secrets and variables → Actions**
6. Create a new secret named `TRAFFIC_TOKEN` with the token value

### 2. Enable the workflow

The GitHub Action at `.github/workflows/traffic-archive.yml` runs daily at 06:00 UTC. You can also trigger it manually from the Actions tab.

### 3. Analyze the data

After a few days of data collection:

```bash
python scripts/analyze-traffic.py traffic-data/
```

This shows:
- Daily clone/view breakdown with anomaly flags
- Day-of-week distribution (bots clone uniformly)
- Referrer analysis
- Clone-to-view ratio verdicts

## What the data tells us

| Metric | Your repo | Normal personal repo |
|--------|-----------|---------------------|
| Clones/14d | ~500 | 5-30 |
| Unique cloners/14d | ~134 | 1-10 |
| Views/14d | ~30 | 20-100 |
| Clone/View ratio | ~16x | 0.5-3x |

## What GitHub doesn't tell you

- No IP addresses for cloners
- No user-agent strings
- No geographic data
- No way to block specific cloners
- Clone data is only retained for 14 days

## What you can do

1. **Archive data** (this workflow) — build a historical picture
2. **Check forks/mirrors**: https://github.com/mohamedyaakoubi/MohamedYakoubi/network/members
3. **Search for mirrors**: Google `"MohamedYakoubi" site:github.com -mohamedyaakoubi` or check GitLab/Gitea mirrors
4. **Make repo private** if the cloning is a security concern (breaks portfolio visibility)
5. **Remove secrets from history** if you ever committed any — bot scrapers target these
