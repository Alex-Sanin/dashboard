import React, { useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { BarChart, Bar, Cell } from 'recharts';

const data = [
    {
        name: 'January',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const BarChartResult = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = data[activeIndex];

    const handleClick = useCallback(
        (entry, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ pt: 3 }}>
            <BarChart width={600} height={350} data={data}>
                <Bar dataKey="uv" onClick={handleClick}>
                    {data.map((entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? '#1665C1' : '#E5E5E5'}
                            key={`cell-${index}`}
                        />
                    ))}
                </Bar>
            </BarChart>
            <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
        </Stack>
    );
};

export default BarChartResult;
