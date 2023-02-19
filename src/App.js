// Global imports
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import { materialTheme } from './theme';
import { PrivateRoutes, PublicRoutes } from './pages/routes';

import './App.css';

const RouteProvider = ({ isAuth }) => {
    if (!isAuth) {
        return <PublicRoutes />;
    }
    return <PrivateRoutes />;
};

const App = () => {
    const isAuth = true;

    return (
        <MaterialThemeProvider theme={materialTheme}>
            <RouteProvider isAuth={isAuth} />
        </MaterialThemeProvider>
    );
};

export default App;
