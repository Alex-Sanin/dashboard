import { Box, Grid, Typography } from '@mui/material';

import logo from '../../assets/images/logo.jpeg';

const Header = () => {
    return (
        <Box
            sx={{
                px: 10,
                backgroundColor: '#ffffff',
                boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04)',
            }}
        >
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%', height: '80px' }}
            >
                <img src={logo} alt="pic" style={{ height: '50px' }} />
                <Typography variant="h3">John Smith</Typography>
            </Grid>
        </Box>
    );
};

export default Header;
