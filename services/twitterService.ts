
import { TrendingTopic } from '../types.ts';

export class TwitterService {
  private bearerToken: string;
  private baseUrl = 'https://api.twitter.com/2';

  constructor() {
    // سيقوم النظام تلقائياً بحقن الـ Token إذا كان معرفاً في البيئة
    // وإلا يمكنك وضعه هنا مؤقتاً للتجربة (لكن لا يفضل ذلك للنشر)
    this.bearerToken = (window as any).process?.env?.TWITTER_BEARER_TOKEN || '';
  }

  async fetchTrends(): Promise<TrendingTopic[]> {
    if (!this.bearerToken) return [];
    try {
      // تويتر API v2 يتطلب إعدادات خاصة للتريندات، هنا نتصل بنقطة النهاية
      const response = await fetch(`${this.baseUrl}/trends/by_location?id=1`, {
        headers: { 'Authorization': `Bearer ${this.bearerToken}` }
      });
      if (!response.ok) return [];
      const data = await response.json();
      return data.map((t: any) => ({
        name: t.name,
        tweet_volume: t.tweet_volume,
        relevance_score: 90,
        reason: 'Direct API signal'
      }));
    } catch (e) {
      return [];
    }
  }

  async fetchUserStats(username: string) {
    if (!this.bearerToken) return null;
    try {
      const response = await fetch(`${this.baseUrl}/users/by/username/${username}?user.fields=public_metrics`, {
        headers: { 'Authorization': `Bearer ${this.bearerToken}` }
      });
      const data = await response.json();
      return data.data;
    } catch (e) {
      return null;
    }
  }
}
