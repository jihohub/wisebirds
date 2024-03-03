import authState from "@/recoil/auth/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const diabled = auth !== "admin";
  return (
    <main className="flex h-[100vh] items-center justify-center p-24">
      <button
        type="button"
        className="w-[700px] h-[400px] bg-sky-500 m-5 rounded-lg bg-"
        onClick={() => navigate("/campaigns")}
      >
        <p className="text-white text-2xl">캠페인 관리 바로가기</p>
      </button>
      <button
        type="button"
        disabled={diabled}
        className={`w-[700px] h-[400px]  m-5 rounded-lg ${
          diabled ? "bg-gray-500" : "bg-sky-500"
        }`}
        onClick={() => navigate("/users")}
      >
        <p className="text-white text-2xl">{`사용자 관리 바로가기${
          diabled ? " 불가능" : ""
        }`}</p>
        {diabled && <p className="text-white">어드민으로 로그인해주세요.</p>}
      </button>
    </main>
  );
}
