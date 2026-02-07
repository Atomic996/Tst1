
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ANALYTICS } from '../constants.tsx';
import { TwitterService } from '../services/twitterService.ts';

const twitter = new TwitterService();

const Analytics: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // سيقوم بجلب بيانات الحساب المربوط بالـ API
    twitter.fetchUserStats('Twitter').then(data => {
      if (data) setUserData(data);
    });
  }, []);

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Performance</h2>
          <p className="text-sm text-zinc-500">
            {userData ? `@${userData.username} live metrics` : 'Twitter activity overview'}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border transition-colors ${userData ? 'bg-green-500/10 border-green-500/50' : 'bg-zinc-900 border-zinc-800'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${userData ? 'text-green-500' : 'text-blue-500'}`}>
            {userData ? 'Real API Active' : 'API Connecting...'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label="Followers" 
          value={userData?.public_metrics?.followers_count ? (userData.public_metrics.followers_count / 1000).toFixed(1) + 'K' : '14.1K'} 
          change="+12.4%" 
        />
        <StatCard 
          label="Total Posts" 
          value={userData?.public_metrics?.tweet_count ? userData.public_metrics.tweet_count.toLocaleString() : '2,401'} 
          change="Live" 
        />
      </div>

      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Engagement Growth</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_ANALYTICS}>
              <defs>
                <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; change: string }> = ({ label, value, change }) => (
  <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
    <p className="text-xs font-medium text-zinc-500 mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-[10px] font-bold text-green-500">{change}</span>
    </div>
  </div>
);

export default Analytics;
