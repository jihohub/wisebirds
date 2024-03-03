export interface Campaigns {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective:
    | "WEBSITE_CONVERSIONS"
    | "WEBSITE_TRAFFIC"
    | "SALES"
    | "APP_INSTALLATION"
    | "LEAD"
    | "BRAND"
    | "VIDEO_VIEWS";
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
}

export interface CampaignsProps {
  content: Campaigns[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

export interface UpdateCampaignProps {
  campaignId: number;
  newEnabledStatus: boolean;
}
