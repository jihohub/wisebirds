import { UsersProps } from "@/user";
import { Dispatch, SetStateAction } from "react";
import UsersColumn from "./UsersColumn";

interface UsersTableProps extends UsersProps {
  openEditModal: () => void;
  setCurrentUserId: Dispatch<SetStateAction<number>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
}

const UsersTable = ({
  user,
  openEditModal,
  setCurrentUserId,
  setCurrentName,
  setSelectedEmail,
}: UsersTableProps) => {
  const index = ["아이디", "이름", "마지막 로그인 일시", "수정"];
  return (
    <div>
      <div className="flex justify-between items-center gap-10 h-[30px]">
        {index.map((eachIndex) => (
          <div className="flex-1" key={eachIndex}>
            <p className={eachIndex === "수정" ? "text-center" : "text-left"}>
              {eachIndex}
            </p>
          </div>
        ))}
      </div>
      <hr className="" />
      {user.map((eachUser) => (
        <UsersColumn
          {...eachUser}
          openEditModal={() => {
            setCurrentUserId(eachUser.id);
            setCurrentName(eachUser.name);
            setSelectedEmail(eachUser.email);
            openEditModal();
          }}
          key={eachUser.id}
        />
      ))}
    </div>
  );
};

export default UsersTable;
