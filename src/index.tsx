import "./index.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.Component";
import TablePage from "./pages/TablePage/TablePage.Component";
import RedirectPage from "./pages/RedirectPage/RedirectPage.Component";
import LinkPage from "./pages/LinkPage/LinkPage.Component";
import ROUTES from "./app/routes/routes";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path={ROUTES.TABLE} element={<TablePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.LINK} element={<LinkPage />} />
            <Route path={ROUTES.REDIRECT} element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);