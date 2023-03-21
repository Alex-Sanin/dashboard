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

export const discount = [];
let discountValue = 0;
while (discountValue <= 20) {
   discount.push(+discountValue);
   discountValue = discountValue + 1;
}
export const interestRate = [];
let interestRateValue = 0;
while (interestRateValue <= 20) {
    interestRate.push(+interestRateValue);
    interestRateValue = interestRateValue + 1;
}
export const initialBatterySize = Array.from(Array(100), (_, index) => index + 1);

export const initialBatteryPower = Array.from(Array(50), (_, index) => index + 1);

export const initialBatteryCost = [];
let initialBatteryCostValue = 150;
while (initialBatteryCostValue <= 500) {
    initialBatteryCost.push(+initialBatteryCostValue);
    initialBatteryCostValue = initialBatteryCostValue + 10;
}

export const initialPvSize = Array.from(Array(100), (_, index) => index + 1);

export const initialPvCost = [0, 800, 900, 1000, 1100, 1200];

export const grid = Array.from(Array(10), (_, index) => index + 1);
