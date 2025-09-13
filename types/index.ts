export interface TrendingVideo {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  timeAgo: string;
  channel: string;
  subscribers: string;
  outlierScore: string;
  engagement: string;
  viewsPerHour: number;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}
