import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkmodeProvider, ToastProvider, AuthProvider } from "@/contexts";
import { ToastList } from "./components";
import {PrivateRoute} from "@/routes";
import {routes} from "./routes/routes";

function App() {
  return (
    <DarkmodeProvider>
      <ToastProvider>
        <ToastList />
        <BrowserRouter>
        <AuthProvider>
          <Routes>
          {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={
                    <PrivateRoute requireAuth={route.requireAuth}>
                      {route.element}
                    </PrivateRoute>
                  }
                  key={route.path}
                />
              );
            })}
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </DarkmodeProvider>
  );
}

export default App;
