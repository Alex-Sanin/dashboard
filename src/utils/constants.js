export const baseURL = '';

//Configuration form
export const regions = [
    {
        value: 'Israel',
        label: 'Israel',
    },
    {
        value: 'South Africa',
        label: 'South Africa',
    },
    {
        value: 'Germany',
        label: 'Germany',
    },
];

export const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
    },
    {
        value: 'NIS',
        label: 'NIS',
    },
];

export const initialBatterySize = Array.from(Array(100), (_, index) => index + 1);

export const initialBatteryPower = [];
let initialBatteryPowerValue = 0;
while (initialBatteryPowerValue <= 10) {
    initialBatteryPower.push(+initialBatteryPowerValue.toFixed(1));
    initialBatteryPowerValue = initialBatteryPowerValue + 0.1;
}

export const initialBatteryCost = [];
let initialBatteryCostValue = 0;
while (initialBatteryCostValue <= 350) {
    initialBatteryCost.push(+initialBatteryCostValue.toFixed(1));
    initialBatteryCostValue = initialBatteryCostValue + 10;
}

export const initialPvSize = [];
let initialPvSizeValue = 0;
while (initialPvSizeValue <= 10) {
    initialPvSize.push(+initialPvSizeValue.toFixed(1));
    initialPvSizeValue = initialPvSizeValue + 0.5;
}

export const initialPvCost = [];
let initialPvCostValue = 0;
while (initialPvCostValue <= 800) {
    initialPvCost.push(+initialPvCostValue.toFixed(1));
    initialPvCostValue = initialPvCostValue + 10;
}

export const grid = [];
let gridValue = 0;
while (gridValue <= 10) {
    grid.push(+gridValue.toFixed(1));
    gridValue = gridValue + 0.1;
}
