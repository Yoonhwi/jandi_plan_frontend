import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test, AuthLayout } from "@/pages";
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
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
