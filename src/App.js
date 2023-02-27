// Global imports
import { useState } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import { materialTheme } from './theme';
import { AuthContext } from './utils/AuthContext';
import { PrivateRoutes, PublicRoutes } from './pages/routes';

import './App.css';

const RouteProvider = ({ isAuth }) => {
    if (!isAuth) {
        return <PublicRoutes />;
    }
    return <PrivateRoutes />;
};

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [userName, setUserName] = useState('none');

    return (
        <AuthContext.Provider value={{ setIsAuth, userName, setUserName }}>
            <MaterialThemeProvider theme={materialTheme}>
                <RouteProvider isAuth={isAuth} />
            </MaterialThemeProvider>
        </AuthContext.Provider>
    );
};

export default App;
