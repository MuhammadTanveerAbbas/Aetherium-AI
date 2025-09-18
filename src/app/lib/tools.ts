import type { LucideIcon } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  href: string;
  iconName: "PenSquare" | "SearchCheck" | "Film" | "Briefcase" | "Bot" | "ShoppingBasket" | "ImageIcon";
  disabled?: boolean;
}

export const tools: Tool[] = [
  {
    name: "AI Blog Writer",
    description: "Transform your ideas into complete, well-structured articles. Provide a simple brief and optional keywords to generate engaging content ready for publication.",
    href: "/tools/blog-writer",
    iconName: "PenSquare",
  },
  {
    name: "SEO Optimizer",
    description: "Boost your search engine rankings. Paste your content to receive an in-depth SEO analysis, actionable suggestions, and an AI-rewritten version.",
    href: "/tools/seo-optimizer",
    iconName: "SearchCheck",
  },
  {
    name: "Video Script Generator",
    description: "Create engaging video scripts for platforms like YouTube, TikTok, or Instagram. Just provide a topic, and get a script with scenes and dialogue.",
    href: "/tools/video-script-generator",
    iconName: "Film",
  },
  {
    name: "Name Generator",
    description: "Find the perfect name for your brand. Describe your business and get a curated list of creative, catchy, and available name ideas instantly.",
    href: "/tools/business-name-generator",
    iconName: "Briefcase",
  },
  {
    name: "AI Persona Creator",
    description: "Understand your audience on a deeper level. Generate detailed user personas, including demographics, goals, and pain points, to guide your strategy.",
    href: "/tools/ai-persona-creator",
    iconName: "Bot",
  },
  {
    name: "Description Generator",
    description: "Turn features into benefits with persuasive copy. Create compelling, SEO-friendly product descriptions that attract customers and drive sales.",
    href: "/tools/product-description-generator",
    iconName: "ShoppingBasket",
  },
];
