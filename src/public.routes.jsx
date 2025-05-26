import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/Home/Home.layout";
import MarketLayout from "./layouts/Market/Market.layout";
import SolutionsLayout from "./layouts/Solutions/Solutions.layout.module";
import DoctorLayout from "./layouts/Doctor/Doctor.layout.module";
import StartWithUsLayout from "./layouts/StartWithUs/StartWithUs.layout.module";
import PrivacyPolicyLayout from "./layouts/PrivacyPolicy/PrivacyPolicy.layout.module";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/market/*" element={<MarketLayout />} />
      <Route path="/solutions/*" element={<SolutionsLayout />} />
      <Route path="/doc/*" element={<DoctorLayout />} />
      <Route path="/start-with-us/*" element={<StartWithUsLayout />} />
      <Route path="/privacy-policy/*" element={<PrivacyPolicyLayout />} />
    </Routes>
  );
};

export default PublicRoutes;
