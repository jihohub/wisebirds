import { Users } from "@/user";
import moment from "moment";

export interface UsersColumnProps extends Users {
  openEditModal: () => void;
}

const UsersColumn = ({
  email,
  name,
  lastLoggedIn,
  openEditModal,
}: UsersColumnProps) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-10 h-[30px]">
        <div className="flex-1">
          <p className="text-left">{email}</p>
        </div>
        <div className="flex-1">
          <p className="text-left">{name}</p>
        </div>
        <div className="flex-1">
          <p className="text-left">
            {/* firestore에서 Date 대신 Timestamp 값으로 오기 때문에 임시로 toDate() 메서드 사용 */}
            {/* {moment(lastLoggedIn).format("YYYY-MM-DD HH:mm:ss")} */}
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
