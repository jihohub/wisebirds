import authState from "@recoil/auth/atom";
import { useRecoilState } from "recoil";

const authority = [
  { key: "admin", name: "어드민" },
  { key: "manager", name: "매니저" },
  { key: "viewer", name: "뷰어" },
];

const AuthListBox = () => {
  const [userRole, setUserRole] = useRecoilState(authState);

  return (
    <div className="w-[200px] text-black">
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        className="w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
      >
        {authority.map((auth) => (
          <option key={auth.key} value={auth.key}>
            {auth.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthListBox;
