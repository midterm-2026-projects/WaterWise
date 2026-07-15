CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    purok VARCHAR(100) NOT NULL,
    house_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meter_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reading_date DATE NOT NULL,
    previous_reading NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    present_reading NUMERIC(10, 2) NOT NULL,
    consumption NUMERIC(10, 2) GENERATED ALWAYS AS (present_reading - previous_reading) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    billing_month VARCHAR(100) NOT NULL,
    consumption_period VARCHAR(255),
    previous_reading NUMERIC(10, 2),
    present_reading NUMERIC(10, 2),
    amount_due NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Unpaid',
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row-Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meter_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Consumer Isolation Policies
CREATE POLICY select_own_profile ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY select_own_readings ON meter_readings FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY select_own_invoices ON invoices FOR SELECT USING (profile_id = auth.uid());