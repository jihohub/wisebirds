import { Users } from "@/type";
import moment from "moment";

export interface UsersColumnProps extends Users {
  openEditModal: () => void;
}

const UsersColumn = ({
  id,
  email,
  name,
  lastLoggedIn,
  company,
  openEditModal,
  ...rest
}: UsersColumnProps) => {
  return (
    <div key={id}>
      <div className="flex justify-between items-center gap-10 h-[30px]">
        <div className="flex-1">
          <p className="text-left">{email}</p>
        </div>
        <div className="flex-1">
          <p className="text-left">{name}</p>
        </div>
        <div className="flex-1">
          <p className="text-left">
            {moment(lastLoggedIn.toDate()).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
        <div className="flex-1">
          <button type="button" className="w-full">
            <p className="text-center text-blue-500" onClick={openEditModal}>
              수정
            </p>
          </button>
        </div>
      </div>
      <hr className="" />
    </div>
  );
};

export default UsersColumn;
