import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "@/pages/main";
import SettingsPage from "@/pages/settings";
import { ROUTES } from "@/routes";

function MainRoute() {
  const navigate = useNavigate();
  return <MainPage onNavigate={navigate} />;
}

function SettingsRoute() {
  const navigate = useNavigate();
  return <SettingsPage onNavigate={navigate} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.main} replace />} />
      <Route path={ROUTES.main} element={<MainRoute />} />
      <Route path={ROUTES.settings} element={<SettingsRoute />} />
      <Route path="*" element={<Navigate to={ROUTES.main} replace />} />
    </Routes>
  );
}
