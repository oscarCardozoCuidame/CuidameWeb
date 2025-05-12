import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/Home/Home.layout";
import MarketLayout from "./layouts/Market/Market.layout";
import SolutionsLayout from "./layouts/Solutions/Solutions.layout.module";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/market/*" element={<MarketLayout />} />
      <Route path="/solutions/*" element={<SolutionsLayout />} />
    </Routes>
  );
};

export default PublicRoutes;
