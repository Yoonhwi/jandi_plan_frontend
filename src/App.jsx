import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test, AuthLayout } from "@/pages";
import { PageEndPoints } from "@/constants";
import { DarkmodeProvider } from "@/contexts";

function App() {
  return (
    <DarkmodeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PageEndPoints.HOME} element={<Home />} />
          <Route path={PageEndPoints.TEST} element={<Test />} />
          <Route path={PageEndPoints.AUTH} element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </DarkmodeProvider>
  );
}

export default App;
