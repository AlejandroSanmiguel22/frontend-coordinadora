import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ProfilePage from './features/user/pages/ProfilePage';
import PrivateRoute from './routes/PrivateRoute';
import CreateShipmentPage from './features/shipments/pages/CreateShipmentPage';
import ShipmentsListPage from './features/shipments/pages/ShipmentsListPage';
import AdminDashboardPage from './features/shipments/pages/AdminDashboardPage';
import AssignShipmentPage from './features/shipments/pages/AssignShipmentPage';
import TrackShipmentPage from './features/shipments/pages/TrackShipmentPage';
import AdminReportPage from './features/shipments/pages/AdminReportPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/users/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipments/create"
          element={
            <PrivateRoute>
              <CreateShipmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipments"
          element={
            <PrivateRoute>
              <ShipmentsListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipments/:id/assign"
          element={
            <PrivateRoute>
              <AssignShipmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipments/:id/track"
          element={
            <PrivateRoute>
              <TrackShipmentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/report"
          element={
            <PrivateRoute>
              <AdminReportPage />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
export default App;
