import Header from "@components/common/Header";
import Home from "@pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecoilProvider from "./lib/recoil/provider";

function App() {
  return (
    <RecoilProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </RecoilProvider>
  );
}

export default App;
