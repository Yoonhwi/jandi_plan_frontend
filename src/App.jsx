import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test, AuthLayout } from "@/pages";
import { PageEndPoints } from "@/constants";
import { DarkModeProvider } from "@/contexts";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PageEndPoints.HOME} element={<Home />} />
          <Route path={PageEndPoints.TEST} element={<Test />} />
          <Route path={PageEndPoints.AUTH} element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
