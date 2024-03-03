import Header from "@components/common/Header";
import Campaigns from "@pages/Campaigns";
import Home from "@pages/Home";
import Users from "@pages/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecoilProvider from "./lib/recoil/provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </BrowserRouter>
      </RecoilProvider>
    </QueryClientProvider>
  );
}

export default App;
