import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BatteryDB from "./pages/battery/BatteryDB";
import AdminLogin from "./pages/AdminLogin";
import AdminInspection from "./pages/AdminInspection";
import AdminNotice from "./pages/AdminNotice";
import Nav from "./components/Nav";
import AdminNav from "./components/AdminNav";
import Footer from "./components/Footer";
import AdminFooter from "./components/AdminFooter";
import Asset from "./pages/asset/Asset";
import Analyze from "./pages/analyze/Analyze";
import AnalyzeResult from "./pages/analyze/AnalyzeResult";
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
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battery-asset" element={<BatteryDB />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-inspection" element={<AdminInspection />} />
          <Route path="/admin-notice" element={<AdminNotice />} />
          <Route path="/asset" element={<Asset />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/analyze/success" element={<AnalyzeResult />} />
          {/* <Route path="/AnalyzeMid" element={<AnalyzeMid />} />
          <Route path="/AnalyzeCompl" element={<AnalyzeCompl />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
