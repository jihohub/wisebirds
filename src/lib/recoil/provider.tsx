import React from "react";
import { RecoilRoot } from "recoil";

const RecoilProvider = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

export default RecoilProvider;
