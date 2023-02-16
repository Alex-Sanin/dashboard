import { Stack, Paper, Typography } from '@mui/material';

import Preloader from '../../loaders/Preloader';

import batteryIcon from '../../../assets/images/battery.svg';
import powerLinesIcon from '../../../assets/images/powerLines.svg';
import solarPanelIcon from '../../../assets/images/solarPanel.svg';
import factoryIcon from '../../../assets/images/factory.svg';
import arrowRightRound from '../../../assets/images/arrowRightRound.svg';
import arrowLeft from '../../../assets/images/arrowLeft.svg';
import arrowShort from '../../../assets/images/arrowShort.svg';

const PlDiagram = ({ diagramData }) => {

    if (!diagramData) {
        return <Preloader />;
    }
    return (
        <Stack direction="column" sx={{ gap: '20px' }}>
            <Stack direction="column" alignItems="center" spacing={2} sx={{ ml: '-12px' }}>
                <Typography variant="h3">Market</Typography>
                <Stack direction="row" jusifyContent="center" alignItems="center" spacing={3}>
                    <Paper sx={{ minWidth: '100px',height: '100%', py: 1, px: 1.5 }}>
                        <Stack direction="column">
                            <Typography variant="body3" sx={{ pb: 1 }}>
                                Battery:
                            </Typography>
                            <Typography variant="body3">{diagramData[2].energy} MWh</Typography>
                            <Typography variant="body3">{diagramData[2].cost} $</Typography>
                        </Stack>
                    </Paper>
                    <img src={arrowShort} alt="pic" />
                    <Paper sx={{ minWidth: '100px', height: '100%', py: 1, px: 1.5 }}>
                        <Stack direction="column">
                            <Typography variant="body3" sx={{ pb: 1 }}>
                                Customer:
                            </Typography>
                            <Typography variant="body3">{diagramData[1].energy} MWh</Typography>
                            <Typography variant="body3">{diagramData[1].cost} $</Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
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
                    style={{
                        height: '180px',
                        marginTop: '35px',
                        transform: 'translateX(-8px) rotate(90deg) rotateY(180deg)',
                    }}
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
                        <Typography variant="body3">{diagramData[6].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[6].income} $</Typography>
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
                        <Typography variant="body3">{diagramData[4].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[4].cost || diagramData[4].income || '-'} $</Typography>
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
                        <Typography variant="body3">{diagramData[9].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[9].income} $</Typography>
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
                        <Typography variant="body3">{diagramData[8].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[8].cost || diagramData[8].income || '-'} $</Typography>
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
                        <Typography variant="body3">{diagramData[3].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[3].income} $</Typography>
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
                        <Typography variant="body3">{diagramData[5].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[5].income} $</Typography>
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
                        <Typography variant="body3">{diagramData[7].energy} MWh</Typography>
                        <Typography variant="body3">{diagramData[7].income} $</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};

export default PlDiagram;
