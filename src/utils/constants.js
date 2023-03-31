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

export const time = Array.from(Array(6), (_, index) => index + 1);

export const dieselGenerator = [];
let dieselGeneratorValue = 0;
while (dieselGeneratorValue <= 1.01) {
    dieselGenerator.push(+dieselGeneratorValue.toFixed(2));
    dieselGeneratorValue = dieselGeneratorValue + 0.01;
}

export const initialBatterySize = Array.from(Array(101), (_, index) => index);

export const initialBatteryPower = Array.from(Array(51), (_, index) => index);

export const initialBatteryCost = [];
let initialBatteryCostValue = 150;
while (initialBatteryCostValue <= 500) {
    initialBatteryCost.push(+initialBatteryCostValue);
    initialBatteryCostValue = initialBatteryCostValue + 10;
}

export const initialPvSize = Array.from(Array(101), (_, index) => index);

export const initialPvCost = [0, 800, 900, 1000, 1100, 1200];

export const grid = Array.from(Array(11), (_, index) => index);
