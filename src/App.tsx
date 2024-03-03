import Header from "@components/common/Header";
import Home from "@pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecoilProvider from "./lib/recoil/provider";
import Campaigns from "./pages/Campaigns";

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
          </Routes>
        </BrowserRouter>
      </RecoilProvider>
    </QueryClientProvider>
  );
}

export default App;
