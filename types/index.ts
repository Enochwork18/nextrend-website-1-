export interface TrendingVideo {
  id: string;
  title: string;
  channel: string;
  subscribers: string;
  thumbnail: string;
  outlierScore: string;
  views: string;
  engagement: string;
  viewsPerHour: string;
  timeAgo: string;
  tags: string[];
  durationMinutes: number;
  videoType: 'video' | 'short' | 'thumbnail';
}

export interface Keyword {
  keyword: string;
  volume: string;
  trend: string;
  difficulty: string;
  category: string;
}
