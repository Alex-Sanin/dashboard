import React, { useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { BarChart, Bar, Cell } from 'recharts';

const SummaryBarChart = ({barChartData}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const data = barChartData.map((item) => {
        return { roi: item };
    });

    const activeItem = data[activeIndex];

    const handleClick = useCallback(
        (entry, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );
    if (!barChartData) {
        return null
    }

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ pt: 3 }}>
            <BarChart width={600} height={350} data={data}>
                <Bar dataKey="roi" onClick={handleClick}>
                    {data.map((entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? '#1665C1' : '#E5E5E5'}
                            key={`cell-${index}`}
                        />
                    ))}
                </Bar>
            </BarChart>
            <p className="content">{`ROI of the period: ${activeItem.roi}`}</p>
        </Stack>
    );
};

export default SummaryBarChart;
