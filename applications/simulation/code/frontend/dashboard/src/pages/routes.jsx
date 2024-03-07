import { Route, Routes, Navigate } from 'react-router';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />}>
                <Route path="login" element={<Login />} />
                <Route index element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
        </Routes>
    );
};

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};
