
export enum ProjectType {
  CODEX = 'Codex',
  BULK_TRADE = 'Bulk Trade'
}

export interface ProjectData {
  name: string;
  description: string;
  keyFeatures: string[];
  docs: string;
  links: string[];
  imageUrls: string[];
}

export interface AnalyticsData {
  date: string;
  followers: number;
  engagement: number;
  impressions: number;
}

export interface TrendingTopic {
  name: string;
  tweet_volume: number | null;
  relevance_score: number;
  reason: string;
}

export type ViewState = 'generator' | 'analytics' | 'trending';
