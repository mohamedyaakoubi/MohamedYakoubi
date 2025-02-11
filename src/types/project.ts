export type ProjectCategory = "AI/ML" | "Web Development" | "Healthcare" | "Tools";

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  category: ProjectCategory;
  features: string[];
  status: "completed" | "in-progress" | "planned";
}