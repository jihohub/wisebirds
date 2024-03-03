import { fetchUsers } from "@/apis/users";
import Pagination from "@/components/common/Pagination";
import UsersCreateDialog from "@/components/users/UsersCreateDialog";
import UsersEditDialog from "@/components/users/UsersEditDialog";
import authState from "@/recoil/auth/atom";
import { UsersProps } from "@/type";
import UsersTable from "@components/users/UsersTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function Users() {
  const [page, setPage] = useState<number>(1);
  const size = 25;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const { isLoading, data } = useQuery({
    queryKey: ["users", page, size],
    queryFn: () => fetchUsers(page, size),
  });
  const transformedData: UsersProps = {
    user: data?.user || [],
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

  const [timer, setTimer] = useState<number>(3);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  useEffect(() => {
    if (auth !== "admin" && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    }
  }, [timer, auth]);
  if (isLoading || !data) {
    return <></>;
  }

  if (auth !== "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        {timer > 0 && (
          <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
            <p>권한이 없습니다. 잘못된 접근입니다.</p>
            <p>{`${timer}초 뒤 메인페이지로 이동됩니다.`}</p>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 pt-40">
      <div className="w-full pb-10">
        <p className="text-2xl">사용자 관리</p>
      </div>
      <div className="w-full h-full">
        <div>
          <button
            className="w-[70px] h-[40px] bg-blue-500 m-5 rounded-lg"
            onClick={openCreateModal}
          >
            <p className="text-white">생성</p>
          </button>
        </div>
        <UsersTable
          {...transformedData}
          openEditModal={openEditModal}
          setCurrentUserId={setCurrentUserId}
          setCurrentName={setCurrentName}
          setSelectedEmail={setSelectedEmail}
        />
        <Pagination
          currentPage={page}
          onPageChange={(newPage: number) => handlePageChange(newPage)}
          pages={transformedData.total_pages}
        />
        <UsersCreateDialog
          isCreateOpen={isCreateOpen}
          closeCreateModal={closeCreateModal}
        />
        <UsersEditDialog
          isEditOpen={isEditOpen}
          closeEditModal={closeEditModal}
          currentUserId={currentUserId}
          currentName={currentName}
          selectedEmail={selectedEmail}
        />
      </div>
    </main>
  );
}
