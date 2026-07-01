// analyticsData.js

export const kpiData = [
  {
    title: "Predicted Overall Consumption",
    value: "125,430 m³",
    subtitle: "Total water consumption",
  },
  {
    title: "Predicted Monthly Consumption",
    value: "12,450 m³",
    subtitle: "Current month usage",
  },
  {
    title: "Predicted Yearly Consumption",
    value: "89,320 m³",
    subtitle: "Current year usage",
  },
];

export const monthlyConsumptionData = [
  { month: "Jan", consumption: 10150 },
  { month: "Feb", consumption: 10820 },
  { month: "Mar", consumption: 11240 },
  { month: "Apr", consumption: 11780 },
  { month: "May", consumption: 12030 },
  { month: "Jun", consumption: 12450 }, // Predicted
];

export const yearlyConsumptionData = [
  { year: "2021", consumption: 70120 },
  { year: "2022", consumption: 74850 },
  { year: "2023", consumption: 79210 },
  { year: "2024", consumption: 83540 },
  { year: "2025", consumption: 86420 },
  { year: "2026", consumption: 89320 }, // Predicted
];

export const purokConsumptionData = {
  "Purok 1": {
    monthly: [
      { month: "Jan", consumption: 4200 },
      { month: "Feb", consumption: 4450 },
      { month: "Mar", consumption: 4680 },
      { month: "Apr", consumption: 4820 },
      { month: "May", consumption: 5010 },
      { month: "Jun", consumption: 5200 },
    ],
    yearly: [
      { year: "2021", consumption: 48500 },
      { year: "2022", consumption: 51200 },
      { year: "2023", consumption: 54800 },
      { year: "2024", consumption: 57100 },
      { year: "2025", consumption: 59800 },
      { year: "2026", consumption: 62400 },
    ],
  },

  "Purok 2": {
    monthly: [
      { month: "Jan", consumption: 3900 },
      { month: "Feb", consumption: 4020 },
      { month: "Mar", consumption: 4200 },
      { month: "Apr", consumption: 4380 },
      { month: "May", consumption: 4550 },
      { month: "Jun", consumption: 4800 },
    ],
    yearly: [
      { year: "2021", consumption: 45200 },
      { year: "2022", consumption: 47000 },
      { year: "2023", consumption: 49600 },
      { year: "2024", consumption: 52100 },
      { year: "2025", consumption: 54800 },
      { year: "2026", consumption: 57600 },
    ],
  },

  "Purok 3": {
    monthly: [
      { month: "Jan", consumption: 4500 },
      { month: "Feb", consumption: 4680 },
      { month: "Mar", consumption: 4900 },
      { month: "Apr", consumption: 5120 },
      { month: "May", consumption: 5350 },
      { month: "Jun", consumption: 6100 },
    ],
    yearly: [
      { year: "2021", consumption: 53800 },
      { year: "2022", consumption: 56600 },
      { year: "2023", consumption: 59400 },
      { year: "2024", consumption: 62100 },
      { year: "2025", consumption: 64900 },
      { year: "2026", consumption: 68400 },
    ],
  },

  "Purok 4": {
    monthly: [
      { month: "Jan", consumption: 3700 },
      { month: "Feb", consumption: 3820 },
      { month: "Mar", consumption: 3960 },
      { month: "Apr", consumption: 4100 },
      { month: "May", consumption: 4250 },
      { month: "Jun", consumption: 4300 },
    ],
    yearly: [
      { year: "2021", consumption: 43200 },
      { year: "2022", consumption: 44600 },
      { year: "2023", consumption: 46200 },
      { year: "2024", consumption: 47800 },
      { year: "2025", consumption: 49500 },
      { year: "2026", consumption: 51200 },
    ],
  },

  "Purok 5": {
    monthly: [
      { month: "Jan", consumption: 4100 },
      { month: "Feb", consumption: 4250 },
      { month: "Mar", consumption: 4420 },
      { month: "Apr", consumption: 4600 },
      { month: "May", consumption: 4790 },
      { month: "Jun", consumption: 5600 },
    ],
    yearly: [
      { year: "2021", consumption: 46800 },
      { year: "2022", consumption: 49100 },
      { year: "2023", consumption: 51500 },
      { year: "2024", consumption: 53900 },
      { year: "2025", consumption: 56300 },
      { year: "2026", consumption: 59100 },
    ],
  },

  "Purok 6": {
    monthly: [
      { month: "Jan", consumption: 4000 },
      { month: "Feb", consumption: 4130 },
      { month: "Mar", consumption: 4280 },
      { month: "Apr", consumption: 4410 },
      { month: "May", consumption: 4580 },
      { month: "Jun", consumption: 4900 },
    ],
    yearly: [
      { year: "2021", consumption: 45600 },
      { year: "2022", consumption: 47200 },
      { year: "2023", consumption: 48900 },
      { year: "2024", consumption: 50700 },
      { year: "2025", consumption: 52600 },
      { year: "2026", consumption: 54800 },
    ],
  },
};

// Latest Historical Monthly Comparison (May)

export const monthlyComparisonData = [
  { purok: "Purok 1", consumption: 5010 },
  { purok: "Purok 2", consumption: 4550 },
  { purok: "Purok 3", consumption: 5350 },
  { purok: "Purok 4", consumption: 4250 },
  { purok: "Purok 5", consumption: 4790 },
  { purok: "Purok 6", consumption: 4580 },
];

// Latest Historical Yearly Comparison (2025)

export const yearlyComparisonData = [
  { purok: "Purok 1", consumption: 59800 },
  { purok: "Purok 2", consumption: 54800 },
  { purok: "Purok 3", consumption: 64900 },
  { purok: "Purok 4", consumption: 49500 },
  { purok: "Purok 5", consumption: 56300 },
  { purok: "Purok 6", consumption: 52600 },
];