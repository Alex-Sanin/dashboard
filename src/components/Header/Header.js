import { useContext } from 'react';
import { Box, Grid, Stack, Typography, Switch, Tooltip } from '@mui/material';

import { AuthContext } from '../../utils/AuthContext';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';

import logo from '../../assets/images/logo.jpeg';
import iIcon from '../../assets/images/iIcon.jpg';
import logout_icon from '../../assets/images/logout.svg';//Image downloaded from https://www.iconfinder.com/icons/1564506/download/svg/4096, available under the Creative Comons v3 license (https://creativecommons.org/licenses/by/3.0/)

const Header = ({ isDescriptiveText, setIsDescriptiveText }) => {
    const { userName, setIsAuth, setUserName, setToken, setEmail } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const descriptiveTextToggle = () => setIsDescriptiveText(!isDescriptiveText);
    const doLogout = () => {
        const data = {'auth': false, 'user first name': 'null', 'user last name': 'null', 'token': null, 'email': null};
        setIsAuth(false);
        setUserName(null);
        setToken(data.token);
        setEmail(data['email']);
        window.localStorage.setItem('auth',JSON.stringify(data));
        console.log("logging out");
        window.location.replace("/")
    }
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
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <img src={logout_icon} alt="log out" style={{ height: '20px' }} onClick={()=>doLogout()}/>
                            <Switch defaultChecked onClick={descriptiveTextToggle} />
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
