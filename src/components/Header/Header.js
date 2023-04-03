import { useContext } from 'react';
import { Box, Grid, Stack, Typography, Switch, Tooltip } from '@mui/material';

import { AuthContext } from '../../utils/AuthContext';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';

import logo from '../../assets/images/logo.jpeg';
import iIcon from '../../assets/images/iIcon.jpg';

const Header = ({ isDescriptiveText, setIsDescriptiveText }) => {
    const { userName } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);

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
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Switch defaultChecked />
                            <img src={iIcon} alt="pic" style={{ height: '20px' }} />
                            <Typography variant="body3">{descriptiveText.information}</Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
            </Grid>
        </Box>
    );
};

export default Header;
