import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          {publicRoutes.map((route, i) => {
            const Page = route.component;
            return <Route key={i} path={route.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
        <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
