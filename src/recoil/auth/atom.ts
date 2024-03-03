import { atom } from "recoil";

const authState = atom<string>({
  key: "authState",
  default: "admin",
});

export default authState;
