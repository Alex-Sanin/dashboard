import { Typography, CircularProgress, Box } from '@mui/material';

const ProgressBar = ({ progress }) => {
    if (progress <= 0 || progress >= 100) {
        return null;
    }
    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress variant="determinate" size={70} value={progress} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body1">{progress}%</Typography>
            </Box>
        </Box>
    );
};

export default ProgressBar;
