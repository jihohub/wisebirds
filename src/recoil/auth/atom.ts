import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const authState = atom<string>({
  key: "authState",
  default: "admin",
  effects_UNSTABLE: [persistAtom],
});

export default authState;
