import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/global.d.ts";
import "./App.css";
import PublicRoutes from "./public.routes";
import ScrollToTop from "./utils/useScrollTop";

function App(): React.ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <PublicRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
