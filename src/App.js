// Global imports
import { useState, useEffect } from 'react';
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
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [executiveSummaryTitle, setExecutiveSummaryTitle] = useState({
        customerName: '',
        simulationName: '',
        isFormsUpdate: false,
        isTablesUpdate: false,
    });
    useEffect(()=>{
        const storedIsAuth = window.localStorage.getItem('auth');
        if (storedIsAuth){
            const data = JSON.parse(storedIsAuth);
            setIsAuth(data.auth);
            setUserName(data['user first name'] + '_' + data['user last name']);
            setToken(data.token);
            setEmail(data['email']);

        }
    }, [isAuth, setIsAuth, setUserName, setToken, setEmail]);

    return (
        <AuthContext.Provider
            value={{
                setIsAuth,
                userName,
                setUserName,
                token,
                setToken,
                email,
                setEmail,
                executiveSummaryTitle,
                setExecutiveSummaryTitle,
            }}
        >
            <MaterialThemeProvider theme={materialTheme}>
                <RouteProvider isAuth={isAuth} />
            </MaterialThemeProvider>
        </AuthContext.Provider>
    );
};

export default App;
