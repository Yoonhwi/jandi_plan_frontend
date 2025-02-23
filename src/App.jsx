import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Test,
  AuthLayout,
  PlanCreate,
  PlanList,
  SearchLayout,
  Notice,
  Board,
  BoardDetail,
  BoardWrite,
  PlanDetail,
  MyPage,
  DestinationDetail,
  DestinationList,
} from "@/pages";
import { PageEndPoints } from "@/constants";
import { DarkmodeProvider, ToastProvider, AuthProvider } from "@/contexts";
import { ToastList } from "./components";
import PreferenceLayout from "./pages/Preference/PreferenceLayout";

function App() {
  return (
    <DarkmodeProvider>
      <AuthProvider>
        <ToastProvider>
          <ToastList />
          <BrowserRouter>
            <Routes>
              <Route path={PageEndPoints.HOME} element={<Home />} />
              <Route path={PageEndPoints.TEST} element={<Test />} />
              <Route path={PageEndPoints.AUTH} element={<AuthLayout />} />
              <Route path={PageEndPoints.SEARCH} element={<SearchLayout />} />
              <Route path={PageEndPoints.NOTICE} element={<Notice />} />
              <Route path={PageEndPoints.MYPAGE} element={<MyPage />} />

              <Route
                path={PageEndPoints.DESTINATION_DETAIL}
                element={<DestinationDetail />}
              />
              <Route
                path={PageEndPoints.DESTINATION_LIST}
                element={<DestinationList />}
              />

              <Route
                path={PageEndPoints.PREFERENCE}
                element={<PreferenceLayout />}
              />

              <Route
                path={PageEndPoints.PLAN_DETAIL}
                element={<PlanDetail />}
              />
              <Route
                path={PageEndPoints.PLAN_CREATE}
                element={<PlanCreate />}
              />
              <Route path={PageEndPoints.PLAN_LIST} element={<PlanList />} />

              <Route path={PageEndPoints.BOARD} element={<Board />} />
              <Route
                path={PageEndPoints.BOARD_DETAIL}
                element={<BoardDetail />}
              />
              <Route
                path={PageEndPoints.BOARD_WRITE}
                element={<BoardWrite />}
              />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </DarkmodeProvider>
  );
}

export default App;
