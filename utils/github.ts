import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  private: boolean
  archived: boolean
  disabled: boolean
}

// For SSG build-time data fetching
export async function getGithubRepos(username: string): Promise<Repository[]> {
  try {
    // During build time, we can directly use the GitHub API
    if (process.env.GITHUB_TOKEN) {
      console.log(`Fetching GitHub repos for ${username} during build`);
      const response = await octokit.rest.repos.listForUser({
        username,
        type: 'all',
        sort: 'updated',
        per_page: 100,
      });

      const repos: Repository[] = response.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        private: repo.private,
        archived: repo.archived,
        disabled: repo.disabled,
      }));

      console.log(`Fetched ${repos.length} GitHub repositories during build`);
      return repos;
    }
    
    // Fallback to mock data if no token
    console.log("Using mock GitHub data (no token available)");
    return getMockRepos(username);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return mock data on error to prevent build failure
    return getMockRepos(username);
  }
}

// Client-side version for runtime fetching (using direct GitHub API)
export async function getGithubReposClient(username: string): Promise<Repository[]> {
  try {
    console.log(`Fetching GitHub repos for ${username} on client`);
    
    // For client-side, fetch directly from GitHub API without authentication
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'mohamed-portfolio',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      console.error('GitHub API response not OK:', response.status);
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const data = await response.json();
    const repos: Repository[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      private: repo.private,
      archived: repo.archived,
      disabled: repo.disabled,
    }));

    console.log(`Fetched ${repos.length} GitHub repositories on client`);
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos on client:', error);
    // Return mock data on error
    return getMockRepos(username);
  }
}

// Mock data function
function getMockRepos(username: string): Repository[] {
  return [
    {
      id: 1,
      name: "MohamedYakoubi",
      full_name: `${username}/MohamedYakoubi`,
      description: "Personal portfolio website built with Next.js",
      html_url: `https://github.com/${username}/MohamedYakoubi`,
      homepage: "https://mohamed-yakoubi.vercel.app",
      language: "TypeScript",
      stargazers_count: 5,
      watchers_count: 5,
      forks_count: 2,
      private: false,
      archived: false,
      disabled: false
    },
    {
      id: 2,
      name: "notyet",
      full_name: `${username}/notyet`,
      description: "AI-powered career guidance platform for Tunisian students",
      html_url: `https://github.com/${username}/notyet`,
      homepage: "https://notyet-demo.vercel.app",
      language: "JavaScript",
      stargazers_count: 3,
      watchers_count: 3,
      forks_count: 1,
      private: false,
      archived: false,
      disabled: false
    },
    {
      id: 3,
      name: "documed",
      full_name: `${username}/documed`,
      description: "Healthcare management application built with React and Firebase",
      html_url: `https://github.com/${username}/documed`,
      homepage: "https://docu-med.vercel.app",
      language: "JavaScript",
      stargazers_count: 2,
      watchers_count: 2,
      forks_count: 0,
      private: false,
      archived: false,
      disabled: false
    },
    {
      id: 4,
      name: "potential",
      full_name: `${username}/potential`,
      description: "AI-powered search engine for Abu Dhabi Open Data Platform",
      html_url: `https://github.com/${username}/potential`,
      homepage: "https://potential-kegz.vercel.app",
      language: "TypeScript",
      stargazers_count: 4,
      watchers_count: 4,
      forks_count: 1,
      private: false,
      archived: false,
      disabled: false
    }
  ];
}