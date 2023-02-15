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

export const initialBatteryPower = [0.1, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let initialBatteryPowerValue = 1.5;
// while (initialBatteryPowerValue <= 10) {
//     initialBatteryPower.push(+initialBatteryPowerValue.toFixed(1));
//     initialBatteryPowerValue = initialBatteryPowerValue + 0.1;
// }

export const initialBatteryCost = [];
let initialBatteryCostValue = 150;
while (initialBatteryCostValue <= 500) {
    initialBatteryCost.push(+initialBatteryCostValue);
    initialBatteryCostValue = initialBatteryCostValue + 10;
}

export const initialPvSize = [];
let initialPvSizeValue = 0;
while (initialPvSizeValue <= 10) {
    initialPvSize.push(+initialPvSizeValue.toFixed(1));
    initialPvSizeValue = initialPvSizeValue + 0.5;
}

export const initialPvCost = [0, 800, 900, 1000, 1100, 1200];
// let initialPvCostValue = 0;
// while (initialPvCostValue <= 1200) {
//     initialPvCost.push(+initialPvCostValue.toFixed(1));
//     initialPvCostValue = initialPvCostValue + 10;
// }

export const grid = [];
let gridValue = 0;
while (gridValue <= 10) {
    grid.push(+gridValue.toFixed(1));
    gridValue = gridValue + 0.1;
}
