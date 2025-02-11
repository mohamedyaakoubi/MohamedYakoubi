import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
}

export async function getGithubRepos(username: string): Promise<Repository[]> {
  try {
    const response = await octokit.repos.listForUser({
      username,
      sort: "updated",
      direction: "desc",
      per_page: 100,
    })

    return response.data as Repository[]
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
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

