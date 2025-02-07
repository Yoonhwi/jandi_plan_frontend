import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Test,
  AuthLayout,
  CreatePlan,
  SearchLayout,
  Notice,
} from "@/pages";
import { PageEndPoints } from "@/constants";
import { DarkModeProvider, ToastProvider } from "@/contexts";
import { ToastList } from "./components";

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <ToastList />
        <BrowserRouter>
          <Routes>
            <Route path={PageEndPoints.HOME} element={<Home />} />
            <Route path={PageEndPoints.TEST} element={<Test />} />
            <Route path={PageEndPoints.AUTH} element={<AuthLayout />} />
            <Route path={PageEndPoints.CREATEPLAN} element={<CreatePlan />} />
            <Route path={PageEndPoints.SEARCH} element={<SearchLayout />} />
            <Route path={PageEndPoints.NOTICE} element={<Notice />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
