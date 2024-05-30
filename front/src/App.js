import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BatteryDB from "./pages/BatteryDB";
import AdminLogin from "./pages/AdminLogin";
import AdminInspection from "./pages/AdminInspection";
import AdminNotice from "./pages/AdminNotice";
import Nav from "./components/Nav";
import AdminNav from "./components/AdminNav";
import Footer from "./components/Footer";
import AdminFooter from "./components/AdminFooter";
import Asset from "./pages/Asset";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");

    body {
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

function Navigation() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/Admin");

  return isAdminPath ? <AdminNav /> : <Nav />;
}

function Footers() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/Admin");

  return isAdminPath ? <AdminFooter /> : <Footer />;
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BatteryDB" element={<BatteryDB />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminInspection" element={<AdminInspection />} />
          <Route path="/AdminNotice" element={<AdminNotice />} />
          <Route path="/Asset" element={<Asset />} />
        </Routes>
      </div>
      <Footers />
    </Router>
  );
}

export default App;
