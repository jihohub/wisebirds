import { updateData } from "@/apis/campaigns";
import { Campaigns } from "@/type";
import convertCampaignObj from "@/utils/convertCampaignObj";
import { Switch } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CampaignsColumn = ({ ...campaign }: Campaigns) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
  return (
    <div key={campaign.id}>
      <div className="flex justify-between items-center gap-10 h-[30px]">
        <div className="w-[100px] text-center">
          <Switch
            checked={campaign.enabled}
            onChange={() =>
              mutation.mutate({
                campaignId: campaign.id,
                newEnabledStatus: !campaign.enabled,
              })
            }
            className={`${
              campaign.enabled ? "bg-blue-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                campaign.enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="w-[100px] text-left">
          <p>{campaign.name}</p>
        </div>
        <div className="flex-1 text-left">
          <p>{convertCampaignObj(campaign.campaign_objective)}</p>
        </div>
        <div className="flex-1 text-right">
          <p>{campaign.impressions.toLocaleString()}</p>
        </div>
        <div className="flex-1 text-right">
          <p>{campaign.clicks.toLocaleString()}</p>
        </div>
        <div className="flex-1 text-right">
          <p>{`${Math.round(campaign.ctr * 100)}%`}</p>
        </div>
        <div className="flex-1 text-right">
          <p>{campaign.video_views}</p>
        </div>
        <div className="flex-1 text-right">
          <p>{`${Math.round(campaign.vtr * 100)}%`}</p>
        </div>
      </div>
      <hr className="" />
    </div>
  );
};

export default CampaignsColumn;