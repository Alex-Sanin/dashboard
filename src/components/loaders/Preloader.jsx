import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export const Preloader = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
        </Stack>
    );
};

export default Preloader;
