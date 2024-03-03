import { fetchData } from "@/apis/campaigns";
import { CampaignsProps } from "@/type";
import CampaignsTable from "@components/campaigns/CampaignsTable";
import Pagination from "@components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Campaigns() {
  const [page, setPage] = useState<number>(1);
  const size = 25;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const { isLoading, data } = useQuery({
    queryKey: ["campaigns", page, size],
    queryFn: () => fetchData(page, size),
  });
  const transformedData: CampaignsProps = {
    content: data?.content || [],
    total_elements: data?.total_elements || 0,
    total_pages: data?.total_pages || 0,
    last: data?.last || false,
    number: data?.number || 0,
    size: data?.size || 0,
    sort: data?.sort || {},
    number_of_elements: data?.number_of_elements || 0,
    first: data?.first || false,
    empty: data?.empty || true,
  };
  if (isLoading || !data) {
    return <></>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center px-24 pt-40">
      <div className="w-full pb-10">
        <p className="text-2xl">캠페인 관리</p>
      </div>
      <div className="w-full h-full">
        <CampaignsTable {...transformedData} />
        <Pagination
          currentPage={page}
          onPageChange={(newPage: number) => handlePageChange(newPage)}
          pages={transformedData.total_pages}
        />
      </div>
    </main>
  );
}
