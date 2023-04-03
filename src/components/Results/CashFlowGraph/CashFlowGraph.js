import React, {useContext, useEffect, useState} from 'react';
import { Stack, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { dataFormatter } from '../../../utils/functions';
import ChartLegendIcon from '../../../assets/images/ChartLegendIcon';
import Preloader from '../../loaders/Preloader';
import {DescriptiveTextContext} from "../../../utils/DescriptiveTextContext";
import DescriptiveText from "../../DescriptiveText/DescriptiveText";

const CashFlowGraph = ({ graphData }) => {
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const [data, setData] = useState([]);
    const [isActiveLineOP, setIsActiveLineOP] = useState(true);
    const [isActiveLineAC, setIsActiveLineAC] = useState(true);

    const handleLineVisibility = (value) => {
        if (value === 'OP') {
            setIsActiveLineOP(!isActiveLineOP);
        }
        if (value === 'AC') {
            setIsActiveLineAC(!isActiveLineAC);
        }
    };

    useEffect(() => {
        if (graphData) {
            setData(
                graphData.map((item) => {
                    return {
                        year: item.year,
                        'Operation profit': Number(item['operation profit']),
                        'Accumulative cash': Number(item['accumulative cash']),
                    };
                })
            );
        }
    }, [graphData]);

    if (!graphData) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%', position: 'relative' }}>
            <Typography variant="h3">P&L - Cash Flow (NIS)</Typography>
            <DescriptiveText
                text={descriptiveText.resultsPlCashFlow}
                top="-25px"
                left="210px"
                l
            />
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ pt: 3 }}
            >
                <LineChart
                    width={700}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 40, //can cut YAxis data
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={dataFormatter} />
                    <Tooltip formatter={dataFormatter} />
                    <Line
                        type="monotone"
                        dataKey="Operation profit"
                        stroke="#556B2F"
                        activeDot={{ r: 8 }}
                        style={{ opacity: isActiveLineOP ? 1 : 0 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Accumulative cash"
                        stroke="#a09b9b"
                        activeDot={{ r: 8 }}
                        style={{ opacity: isActiveLineAC ? 1 : 0 }}
                    />
                </LineChart>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        onClick={() => handleLineVisibility('OP')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#556B2F" />
                        <Typography variant="body1" style={{ color: '#556B2F' }}>
                            Operation profit
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        onClick={() => handleLineVisibility('AC')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#a09b9b" />
                        <Typography variant="body1" style={{ color: '#a09b9b' }}>
                            Accumulative cash
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CashFlowGraph;
