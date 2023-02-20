import { Stack, Paper, Typography } from '@mui/material';

import Preloader from '../../loaders/Preloader';
import { dataFormatter } from '../../../utils/constants';

import batteryIcon from '../../../assets/images/battery.svg';
import gridConnection from '../../../assets/images/gridConnection.svg';
import solarPanelIcon from '../../../assets/images/solarPanel.svg';
import factoryIcon from '../../../assets/images/factory.svg';
import arrowRightRound from '../../../assets/images/arrowRightRound.svg';
import arrowLeft from '../../../assets/images/arrowLeft.svg';
import arrowShort from '../../../assets/images/arrowShort.svg';

const PlDiagram = ({ diagramData, plDiagramDescription }) => {
    const data = diagramData.map((item) => {
        return {
            action: item.action,
            from: item.from,
            to: item.from,
            cost: item.cost ? dataFormatter(item.cost) : '',
            energy: item.energy ? dataFormatter(item.energy) : '',
            income: item.income ? dataFormatter(item.income) : '',
        };
    });

    if (!diagramData) {
        return <Preloader />;
    }
    return (
        <Stack direction="column" sx={{ gap: '20px' }}>
            <Stack direction="column" alignItems="center" spacing={2} sx={{ ml: '-12px' }}>
                <Typography variant="h3">Market</Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                    <Paper sx={{ minWidth: '100px', height: '100%', py: 1, px: 1.5 }}>
                        <Stack direction="column">
                            <Typography variant="body3" sx={{ pb: 1 }}>
                                Battery:
                            </Typography>
                            <Typography variant="body3">{data[2].energy} MWh</Typography>
                            <Typography variant="body3">{data[2].cost} $</Typography>
                        </Stack>
                    </Paper>
                    <img src={arrowShort} alt="pic" />
                    <Paper sx={{ minWidth: '100px', height: '100%', py: 1, px: 1.5 }}>
                        <Stack direction="column">
                            <Typography variant="body3" sx={{ pb: 1 }}>
                                Customer:
                            </Typography>
                            <Typography variant="body3">{data[1].energy} MWh</Typography>
                            <Typography variant="body3">{data[1].cost} $</Typography>
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
                <Stack direction="column" spacing={1}>
                    <img src={gridConnection} alt="pic" style={{ height: '70px' }} />
                    <Typography
                        variant="subtitle1"
                        style={{
                            position: 'absolute',
                            transform: 'translate(-25px, 70px)',
                        }}
                    >
                        Grid connection: {plDiagramDescription[0]} MW
                    </Typography>
                </Stack>
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
                        <Typography variant="body3">{data[6].energy} MWh</Typography>
                        <Typography variant="body3">{data[6].income} $</Typography>
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
                        <Typography variant="body3">{data[4].energy} MWh</Typography>
                        <Typography variant="body3">
                            {data[4].cost || data[4].income || '-'} $
                        </Typography>
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
                        <Typography variant="body3">{data[9].energy} MWh</Typography>
                        <Typography variant="body3">{data[9].income} $</Typography>
                    </Stack>
                </Paper>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'relative' }}>
                <Stack
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    style={{ transform: 'translateX(-30px)' }}
                >
                    <img src={batteryIcon} alt="pic" style={{ height: '70px' }} />
                    <Typography variant="subtitle1">Battery</Typography>
                    <Stack direction="column" alignItems="center">
                        <Typography variant="body3">Size: {plDiagramDescription[1]} MWh</Typography>
                        <Typography variant="body3">Power: {plDiagramDescription[2]} Wh</Typography>
                        <Typography variant="body3">
                            Cost: {dataFormatter(plDiagramDescription[3])} $
                        </Typography>
                    </Stack>
                </Stack>
                <img
                    src={arrowLeft}
                    alt="pic"
                    style={{
                        width: '330px',
                        transform: 'translateX(-50px)',
                    }}
                />
                <img
                    src={arrowLeft}
                    alt="pic"
                    style={{
                        position: 'absolute',
                        width: '410px',
                        transform: 'translateX(17px) rotate(270deg)',
                    }}
                />
                <Stack
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(412px)',
                    }}
                >
                    <img src={solarPanelIcon} alt="pic" style={{ height: '70px' }} />
                    <Typography variant="subtitle1">PV</Typography>
                    <Stack direction="column" alignItems="center">
                        <Typography variant="body3">Size: {plDiagramDescription[4]} MW</Typography>
                        <Typography variant="body3">
                            Cost: {dataFormatter(plDiagramDescription[5])} $
                        </Typography>
                    </Stack>
                </Stack>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(103px, 37px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">{data[8].energy} MWh</Typography>
                        <Typography variant="body3">
                            {data[8].cost || data[8].income || '-'} $
                        </Typography>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        position: 'absolute',
                        py: 1,
                        px: 1.5,
                        transform: 'translate(240px, 120px)',
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body3">{data[3].energy} MWh</Typography>
                        <Typography variant="body3">{data[3].income} $</Typography>
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
                        <Typography variant="body3">{data[5].energy} MWh</Typography>
                        <Typography variant="body3">{data[5].income} $</Typography>
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
                        <Typography variant="body3">{data[7].energy} MWh</Typography>
                        <Typography variant="body3">{data[7].income} $</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};

export default PlDiagram;
