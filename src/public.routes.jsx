import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy imports
const HomeLayout = lazy(() => import("./layouts/Home/Home.layout"));
const MarketLayout = lazy(() => import("./layouts/Market/Market.layout"));
const SolutionsLayout = lazy(() => import("./layouts/Solutions/Solutions.layout.module"));
const DoctorLayout = lazy(() => import("./layouts/Doctor/Doctor.layout.module"));
const StartWithUsLayout = lazy(() => import("./layouts/StartWithUs/StartWithUs.layout.module"));
const PrivacyPolicyLayout = lazy(() => import("./layouts/PrivacyPolicy/PrivacyPolicy.layout.module"));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/market/*" element={<MarketLayout />} />
        <Route path="/solutions/*" element={<SolutionsLayout />} />
        <Route path="/doc/*" element={<DoctorLayout />} />
        <Route path="/start-with-us/*" element={<StartWithUsLayout />} />
        <Route path="/privacy-policy/*" element={<PrivacyPolicyLayout />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
