import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BatteryAsset from "./pages/battery/BatteryAsset";
import Asset from "./pages/asset/Asset";
import Analyze from "./pages/analyze/Analyze";
import AnalyzeResult from "./pages/analyze/AnalyzeResult";
import Wave from './pages/wave_analyze/Wave'
import NotFound from "./pages/NotFound";
import { createGlobalStyle } from 'styled-components'; 
import WaveResult from "./pages/wave_analyze/WaveResult";

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
      <GlobalStyle />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battery-asset" element={<BatteryAsset />} />
          <Route path="/asset" element={<Asset />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/analyze/success" element={<AnalyzeResult />} />
          <Route path="/wave-analyze" element={<Wave />} />
          <Route path="/wave-analyze/success" element={<WaveResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
