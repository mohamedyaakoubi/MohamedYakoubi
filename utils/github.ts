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

export async function getGithubRepos(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos')
    }

    const repos: Repository[] = await response.json()
    return repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}


export async function getRepoTopics(username: string, repo: string): Promise<string[]> {
  try {
    const response = await octokit.repos.getAllTopics({
      owner: username,
      repo: repo,
    })

    return response.data.names
  } catch (error) {
    console.error("Error fetching repository topics:", error)
    return []
  }
}

export async function getRepoLanguages(username: string, repo: string): Promise<Record<string, number>> {
  try {
    const response = await octokit.repos.listLanguages({
      owner: username,
      repo: repo,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching repository languages:", error)
    return {}
  }
}

