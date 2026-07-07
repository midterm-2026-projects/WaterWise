// services/mockData/mockBillingData.js

const mockBillingData = [
  // =========================
  // January 2025
  // =========================
  {
    id: 1,
    user_id: 101,
    name: "Juan Dela Cruz",
    previous_reading: 120,
    present_reading: 138,
    cubic_used: 18,
    cubic_used_last_month: 16,
    current_bill: 270,
    total_bill: 270,
    billing_date: "2025-01-15",
    due_date: "2025-01-30",
    payment_1: 270,
    payment_2: 0,
    payment_total: 270,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-01-15T08:00:00Z",
    payment_1_date: "2025-01-20",
    payment_2_date: null,
    reference_code: "REF-202501001",
  },
  {
    id: 2,
    user_id: 102,
    name: "Maria Santos",
    previous_reading: 85,
    present_reading: 107,
    cubic_used: 22,
    cubic_used_last_month: 19,
    current_bill: 330,
    total_bill: 330,
    billing_date: "2025-01-18",
    due_date: "2025-02-02",
    payment_1: 330,
    payment_2: 0,
    payment_total: 330,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-01-18T08:00:00Z",
    payment_1_date: "2025-01-25",
    payment_2_date: null,
    reference_code: "REF-202501002",
  },

  // =========================
  // February 2025
  // =========================
  {
    id: 3,
    user_id: 103,
    name: "Pedro Reyes",
    previous_reading: 200,
    present_reading: 225,
    cubic_used: 25,
    cubic_used_last_month: 22,
    current_bill: 375,
    total_bill: 375,
    billing_date: "2025-02-10",
    due_date: "2025-02-25",
    payment_1: 375,
    payment_2: 0,
    payment_total: 375,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-02-10T08:00:00Z",
    payment_1_date: "2025-02-15",
    payment_2_date: null,
    reference_code: "REF-202502001",
  },
  {
    id: 4,
    user_id: 104,
    name: "Ana Garcia",
    previous_reading: 140,
    present_reading: 160,
    cubic_used: 20,
    cubic_used_last_month: 18,
    current_bill: 300,
    total_bill: 300,
    billing_date: "2025-02-18",
    due_date: "2025-03-05",
    payment_1: 300,
    payment_2: 0,
    payment_total: 300,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-02-18T08:00:00Z",
    payment_1_date: "2025-02-23",
    payment_2_date: null,
    reference_code: "REF-202502002",
  },

  // =========================
  // March 2025
  // =========================
  {
    id: 5,
    user_id: 105,
    name: "Jose Mendoza",
    previous_reading: 170,
    present_reading: 200,
    cubic_used: 30,
    cubic_used_last_month: 27,
    current_bill: 450,
    total_bill: 450,
    billing_date: "2025-03-12",
    due_date: "2025-03-27",
    payment_1: 450,
    payment_2: 0,
    payment_total: 450,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-03-12T08:00:00Z",
    payment_1_date: "2025-03-18",
    payment_2_date: null,
    reference_code: "REF-202503001",
  },

  // =========================
  // April 2025
  // =========================
  {
    id: 6,
    user_id: 106,
    name: "Luisa Ramos",
    previous_reading: 110,
    present_reading: 138,
    cubic_used: 28,
    cubic_used_last_month: 26,
    current_bill: 420,
    total_bill: 420,
    billing_date: "2025-04-08",
    due_date: "2025-04-23",
    payment_1: 420,
    payment_2: 0,
    payment_total: 420,
    remaining_balance: 0,
    status: "Paid",
    created_at: "2025-04-08T08:00:00Z",
    payment_1_date: "2025-04-15",
    payment_2_date: null,
    reference_code: "REF-202504001",
  },
];

// =========================
// Overall Forecast Data
// =========================
export const overallPrediction = {
  monthly: {
    currentMonth: "April 2025",
    predictedMonth: "May 2025",
    currentConsumption: 143,
    predictedConsumption: 150,
  },

  yearly: {
    currentYear: "2025",
    predictedYear: "2026",
    currentConsumption: 143,
    predictedConsumption: 1800,
  },
};

export default mockBillingData;