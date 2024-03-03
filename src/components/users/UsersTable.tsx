import { UsersProps } from "@/type";
import UsersColumn from "./UsersColumn";

const UsersTable = ({
  user,
  openEditModal,
  setCurrentUserId,
  setCurrentName,
  setSelectedEmail,
  ...rest
}: UsersProps) => {
  const index = ["아이디", "이름", "마지막 로그인 일시", "수정"];
  return (
    <div>
      <div className="flex justify-between items-center gap-10 h-[30px]">
        {index.map((eachIndex) => (
          <div className="flex-1">
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
        />
      ))}
    </div>
  );
};

export default UsersTable;
