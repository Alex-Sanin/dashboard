import { useContext } from 'react';
import { Box, Grid, Stack, Typography, Switch, Tooltip } from '@mui/material';

import logo from '../../assets/images/logo.jpeg';
import { AuthContext } from '../../utils/AuthContext';

const Header = ({ isDescriptiveText, setIsDescriptiveText }) => {
    const { userName } = useContext(AuthContext);
    const descriptiveTextToggle = () => setIsDescriptiveText(!isDescriptiveText);

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
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h3">{userName}</Typography>
                    <Tooltip
                        title="Descriptive text"
                        placement="bottom"
                        onClick={descriptiveTextToggle}
                    >
                        <Switch />
                    </Tooltip>
                </Stack>
            </Grid>
        </Box>
    );
};

export default Header;
