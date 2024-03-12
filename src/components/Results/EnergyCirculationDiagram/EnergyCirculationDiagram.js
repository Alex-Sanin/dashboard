import { Stack, Paper, Typography } from '@mui/material';

import batteryIcon from '../../../assets/images/battery.svg';
import powerLinesIcon from '../../../assets/images/powerLines.svg';
import solarPanelIcon from '../../../assets/images/solarPanel.svg';
import factoryIcon from '../../../assets/images/factory.svg';
import arrowRightRound from '../../../assets/images/arrowRightRound.svg';
import arrowLeft from '../../../assets/images/arrowLeft.svg';

const EnergyCirculationDiagram = () => {
    return (
        <Stack direction="column" sx={{ gap: '20px' }}>
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={2}
                sx={{ position: 'relative', ml: '13px' }}
            >
                <img
                    src={arrowRightRound}
                    alt="pic"
                    style={{
                        height: '180px',
                        marginTop: '35px',
                        transform: 'translate(-5px, -5px) rotate(270deg)',
                    }}
                />
                <img
                    src={arrowRightRound}
                    alt="pic"
                    style={{
                        position: 'absolute',
                        height: '154px',
                        marginBottom: '35px',
                        transform: 'translate(4px, 61px) rotate(0deg) rotateY(180deg)',
                    }}
                />
                <img src={powerLinesIcon} alt="pic" style={{ height: '70px' }} />
                <img
                    src={arrowRightRound}
                    alt="pic"
                    style={{ height: '180px', marginTop: '35px' }}
                />
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(-50px, 20px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(60px, 115px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(395px, 20px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'relative' }}>
                <img src={batteryIcon} alt="pic" style={{ height: '70px' }} />
                <img src={arrowLeft} alt="pic" style={{ width: '360px' }} />
                <img
                    src={arrowLeft}
                    alt="pic"
                    style={{
                        position: 'absolute',
                        width: '360px',
                        transform: 'translateX(55px) rotate(270deg)',
                    }}
                />
                <img src={solarPanelIcon} alt="pic" style={{ height: '70px' }} />
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(73px, 37px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(250px, 120px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
            </Stack>
            <Stack
                direction="row"
                alignItems="flex-end"
                spacing={2}
                sx={{ position: 'relative', ml: '13px' }}
            >
                <img
                    src={arrowRightRound}
                    alt="pic"
                    style={{
                        height: '180px',
                        marginBottom: '35px',
                        transform: 'rotate(270deg) rotateY(180deg)',
                    }}
                />
                <img src={factoryIcon} alt="pic" style={{ height: '70px' }} />
                <img
                    src={arrowRightRound}
                    alt="pic"
                    style={{ height: '180px', marginBottom: '35px', transform: 'rotate(90deg)' }}
                />
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(-50px, -27px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(395px, -27px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">100 MWh</Typography>
                        <Typography variant="body3">100 $</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};

export default EnergyCirculationDiagram;
