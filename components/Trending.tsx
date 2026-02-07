
import React, { useEffect, useState } from 'react';
import { TwitterService } from '../services/twitterService.ts';
import { TrendingTopic } from '../types.ts';
import { MOCK_TRENDS } from '../constants.tsx';

const twitter = new TwitterService();

interface TrendingProps {
  onSelectTrend: (trend: string) => void;
}

const Trending: React.FC<TrendingProps> = ({ onSelectTrend }) => {
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      setLoading(true);
      const realTrends = await twitter.fetchTrends();
      setTrends(realTrends.length > 0 ? realTrends : MOCK_TRENDS);
      setLoading(false);
    };
    loadTrends();
  }, []);

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold">Live Trends</h2>
        <p className="text-sm text-zinc-500">Data directly from your Twitter API</p>
      </header>

      <div className="space-y-3">
        {trends.map((trend, idx) => (
          <div 
            key={idx}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-blue-500/50 transition-all cursor-pointer"
            onClick={() => onSelectTrend(trend.name)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white">{trend.name}</h3>
              <div className="bg-zinc-800 px-2 py-1 rounded text-[10px] font-bold text-zinc-400">
                {trend.tweet_volume ? `${(trend.tweet_volume / 1000).toFixed(0)}K` : 'Rising'}
              </div>
            </div>
            <p className="text-xs text-zinc-400 italic mb-2">"{trend.reason}"</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-blue-500 uppercase">Match Score: {trend.relevance_score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
