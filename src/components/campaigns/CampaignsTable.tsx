import { CampaignsProps } from "@/campaign";
import CampaignsColumn from "./CampaignsColumn";

const CampaignsTable = ({ content }: CampaignsProps) => {
  const index = [
    "상태",
    "캠페인명",
    "캠페인 목적",
    "노출수",
    "클릭수",
    "CTR",
    "동영상조회수",
    "VTR",
  ];
  return (
    <div className="pb-40">
      <div className="flex justify-between items-center gap-10 h-[30px]">
        {index.map((eachIndex) => (
          <div
            className={
              eachIndex === "상태" || eachIndex === "캠페인명"
                ? "w-[100px]"
                : "flex-1"
            }
            key={eachIndex}
          >
            <p
              className={
                eachIndex === "상태"
                  ? "text-center"
                  : eachIndex === "캠페인명" || eachIndex === "캠페인 목적"
                  ? "text-left"
                  : "text-right"
              }
            >
              {eachIndex}
            </p>
          </div>
        ))}
      </div>
      <hr className="" />
      {content.map((campaign) => (
        <CampaignsColumn {...campaign} key={campaign.id} />
      ))}
    </div>
  );
};

export default CampaignsTable;
