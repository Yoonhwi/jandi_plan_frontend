import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test } from "@/pages";
import { PageEndPoints } from "@/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageEndPoints.HOME} element={<Home />} />
        <Route path={PageEndPoints.TEST} element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
