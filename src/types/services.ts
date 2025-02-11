import { IconType } from 'react-icons';

export type ServiceCategory = 
  | "Language Services" 
  | "Career Development" 
  | "Technical Services" 
  | "Consulting"
  | "AI & Data Services"
  | "Education & Training"
  | "Tech & IT Services"
  | "Business & Research";

export interface Service {
  name: string;
  icon: IconType; // Add this type for icons
  description: string;
  category: ServiceCategory;
  features: string[];
  process?: string[];
}