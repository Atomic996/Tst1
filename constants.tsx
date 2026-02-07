
import { ProjectType, ProjectData, AnalyticsData, TrendingTopic } from './types';

export const PROJECTS: Record<ProjectType, ProjectData> = {
  [ProjectType.CODEX]: {
    name: 'Codex',
    description: 'An advanced AI-integrated developer workspace designed for seamless pair programming and automated legacy code migration.',
    keyFeatures: [
      'Real-time AI logic suggestions',
      'Automated Documentation Generator',
      'Legacy-to-Modern Migration Tooling',
      'Secure Sandbox Execution'
    ],
    docs: `
      Codex Documentation V2.1:
      Our architecture focuses on the 'Syntactic Transformer' which allows developers to map entire repositories for structural analysis. 
      The goal is to reduce technical debt by 40% in the first quarter of deployment.
      Current release focuses on TypeScript, Rust, and Go support.
    `,
    links: ['https://codex.dev', 'https://github.com/codex-hq/core'],
    imageUrls: ['https://picsum.photos/seed/codex1/800/600', 'https://picsum.photos/seed/codex2/800/600']
  },
  [ProjectType.BULK_TRADE]: {
    name: 'Bulk Trade',
    description: 'The premier institutional liquidity aggregator for large-scale digital asset swaps with zero price impact.',
    keyFeatures: [
      'Deep Liquidity Pools',
      'Atomic Swap Integration',
      'Zero-Slippage Algorithm',
      'Multi-Chain Institutional Custody'
    ],
    docs: `
      Bulk Trade Protocol Whitepaper Summary:
      The protocol utilizes Batch Auctioning to mitigate front-running and MEV extraction. 
      By pooling institutional orders, we create a 'Dark Pool' environment that guarantees execution at the mid-market rate.
    `,
    links: ['https://bulktrade.finance', 'https://docs.bulktrade.finance'],
    imageUrls: ['https://picsum.photos/seed/trade1/800/600', 'https://picsum.photos/seed/trade2/800/600']
  }
};

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: 'Mon', followers: 12400, engagement: 4.2, impressions: 85000 },
  { date: 'Tue', followers: 12550, engagement: 4.5, impressions: 92000 },
  { date: 'Wed', followers: 12800, engagement: 5.1, impressions: 105000 },
  { date: 'Thu', followers: 12950, engagement: 3.8, impressions: 88000 },
  { date: 'Fri', followers: 13200, engagement: 4.9, impressions: 110000 },
  { date: 'Sat', followers: 13500, engagement: 6.2, impressions: 130000 },
  { date: 'Sun', followers: 14100, engagement: 7.1, impressions: 155000 },
];

export const MOCK_TRENDS: TrendingTopic[] = [
  { name: '#AIRevolution', tweet_volume: 120000, relevance_score: 95, reason: 'High overlap with Codex AI features.' },
  { name: '$ETH ETFs', tweet_volume: 85000, relevance_score: 88, reason: 'Institutional crypto interest drives Bulk Trade usage.' },
  { name: 'Web3Dev', tweet_volume: 45000, relevance_score: 92, reason: 'Core target audience for Codex.' },
  { name: 'Liquidity Pools', tweet_volume: 32000, relevance_score: 90, reason: 'Directly related to Bulk Trade engine.' },
  { name: 'TypeScript 5.4', tweet_volume: 12000, relevance_score: 85, reason: 'Relevant for Codex technical updates.' }
];
