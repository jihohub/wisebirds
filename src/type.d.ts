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
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

export interface Users {
  id: number;
  email: string;
  name: string;
  lastLoggedIn: Date;
  company: {
    id: number;
    name: string;
  };
}

export interface UsersProps {
  user: Users[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
  openEditModal: () => void;
  setCurrentUserId: Dispatch<SetStateAction<string | null>>;
  setCurrentName: Dispatch<SetStateAction<string | null>>;
  setSelectedEmail: Dispatch<SetStateAction<string | null>>;
}

export interface UpdateCampaignProps {
  campaignId: number;
  newEnabledStatus: boolean;
}

export interface UpdateUserProps {
  userId: number;
  newEnabledStatus: boolean;
}
export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pages: number;
}
