import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BatteryDB from "./pages/BatteryDB";
import AdminLogin from "./pages/AdminLogin";
import AdminInspection from "./pages/AdminInspection";
import AdminNotice from "./pages/AdminNotice";
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BatteryDB" element={<BatteryDB />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminInspection" element={<AdminInspection />} />
        <Route path="/AdminNotice" element={<AdminNotice />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
