// Global imports
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';

// Local imports
import Header from './components/Header/Header';
import Configuration from './components/Configuration/Configuration';
import Summary from './components/Summary/Summary';
import Result from './components/Results/Results';
import { materialTheme } from './theme';

import './App.css';

const App = () => {
    return (
        <MaterialThemeProvider theme={materialTheme}>
            <Stack
                direction="column"
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    pb: 10,
                    backgroundColor: '#E5E5E5',
                    gap: '40px',
                }}
            >
                <Header />
                <Grid container spacing={3} sx={{ px: 10 }}>
                    <Grid item sm={12} md={4}>
                        <Configuration />
                    </Grid>
                    <Grid item sm={12} md={8}>
                        <Stack direction="column" spacing={3}>
                            <Summary />
                            <Result />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </MaterialThemeProvider>
    );
};

export default App;
