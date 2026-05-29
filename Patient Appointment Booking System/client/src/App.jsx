import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { AppLayout } from './layouts/AppLayout.jsx';
import LandingPage from './pages/public/LandingPage.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';
import AdminAuthPage from './pages/auth/AdminAuthPage.jsx';
import PatientDashboard from './pages/patient/PatientDashboard.jsx';
import PatientMetricDetailsPage from './pages/patient/PatientMetricDetailsPage.jsx';
import DoctorsPage from './pages/patient/DoctorsPage.jsx';
import DoctorProfilePage from './pages/patient/DoctorProfilePage.jsx';
import AppointmentsPage from './pages/patient/AppointmentsPage.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminMetricDetailsPage from './pages/admin/AdminMetricDetailsPage.jsx';
import AssistantPage from './pages/public/AssistantPage.jsx';
import AnalyticsPage from './pages/public/AnalyticsPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/admin-auth" element={<AdminAuthPage />} />
      <Route path="/assistant" element={<AssistantPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/dashboard/details/:view" element={<PatientMetricDetailsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/details/:view" element={<AdminMetricDetailsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}