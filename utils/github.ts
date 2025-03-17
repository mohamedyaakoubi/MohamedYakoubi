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

// Update the getGithubRepos function to be more resilient
export async function getGithubRepos(username: string): Promise<Repository[]> {
  try {
    // Remove the localhost check or make it based on environment
    const isLocal = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
    
    if (isLocal) {
      console.log("Using mock GitHub data");
      return [
        {
          id: 1,
          name: "sample-repo",
          full_name: `${username}/sample-repo`,
          description: "This is a sample repository",
          html_url: `https://github.com/${username}/sample-repo`,
          homepage: null,
          language: "TypeScript",
          stargazers_count: 5,
          watchers_count: 5,
          forks_count: 2,
          private: false,
          archived: false,
          disabled: false
        }
      ];
    }
    
    // For production, use API route
    console.log(`Fetching GitHub repos for ${username}`);
    const response = await fetch(
      `/api/github?username=${encodeURIComponent(username)}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GitHub API response not OK:', response.status, errorData);
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const repos: Repository[] = await response.json();
    console.log(`Fetched ${repos.length} GitHub repositories`);
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}