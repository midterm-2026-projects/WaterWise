-- 1. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CONSUMERS TABLE
CREATE TABLE IF NOT EXISTS consumers (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    purok_no INTEGER,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. METER READERS TABLE
CREATE TABLE IF NOT EXISTS meter_readers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CONSUMPTION LOGS TABLE
CREATE TABLE IF NOT EXISTS consumption (
    id SERIAL PRIMARY KEY,
    consumer_id INTEGER NOT NULL REFERENCES consumers (id) ON DELETE CASCADE,
    reading_date DATE NOT NULL,
    previous_reading NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    present_reading NUMERIC(10,2) NOT NULL, 
    consumption NUMERIC(10,2) GENERATED ALWAYS AS (present_reading - previous_reading) STORED,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. BILLING HISTORY TABLE
CREATE TABLE IF NOT EXISTS billing (
    id SERIAL PRIMARY KEY,
    consumption_id INTEGER NOT NULL REFERENCES consumption (id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES consumers (id) ON DELETE CASCADE,
    billing_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_bill NUMERIC(10,2) NOT NULL, 
    remaining_balance NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'Unpaid',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. NOTIFICATIONS TABLE 
-- Updated to allow a targeted consumer_id (NULL tracks system-wide admin announcements)
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    consumer_id INT REFERENCES consumers(id) ON DELETE CASCADE,
    announcement_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    announcement_date DATE NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notifications
ADD COLUMN IF NOT EXISTS consumer_id INT REFERENCES consumers(id) ON DELETE CASCADE;

-- Indexes for lightning-fast queries when filtering notifications by target consumer
CREATE INDEX IF NOT EXISTS notifications_consumer_id_idx 
ON notifications (consumer_id);

-- 7. NOTIFICATION READS (Junction table to handle isolated read/unread telemetry)
CREATE TABLE IF NOT EXISTS notification_reads (
    notification_id INTEGER NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
    consumer_id INT NOT NULL REFERENCES consumers(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    dismissed_at TIMESTAMPTZ,
    PRIMARY KEY (notification_id, consumer_id)
);

ALTER TABLE notification_reads
ADD COLUMN IF NOT EXISTS dismissed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS notification_reads_consumer_id_idx 
ON notification_reads (consumer_id);

-- 8. AUTOMATED TRIGGER FUNCTION (Updated to map consumer_id context onto billing alerts)
CREATE OR REPLACE FUNCTION generate_billing_announcement()
RETURNS TRIGGER AS $$
DECLARE
    consumer_name VARCHAR(100);
    calculated_bill NUMERIC(10,2);
    base_rate CONSTANT NUMERIC(10,2) := 15.00; 
BEGIN
    SELECT full_name INTO consumer_name 
    FROM consumers 
    WHERE id = NEW.consumer_id;

    calculated_bill := NEW.consumption * base_rate;

    INSERT INTO notifications (
        consumer_id,
        announcement_type,
        title,
        announcement_date,
        message,
        created_at,
        updated_at
    ) VALUES (
        NEW.consumer_id,
        'Billing Alert',
        'New Consumption Record Posted',
        CURRENT_DATE,
        format('Hello %s, a new meter reading has been logged for %s. Previous: %s, Present: %s. Total Consumption: %s units. Estimated Bill: ₱%s.', 
            consumer_name, 
            NEW.reading_date, 
            NEW.previous_reading, 
            NEW.present_reading, 
            NEW.consumption,
            calculated_bill
        ),
        NOW(),
        NOW()
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. TRIGGER BINDING
DROP TRIGGER IF EXISTS trg_after_consumption_insert ON consumption;

CREATE TRIGGER trg_after_consumption_insert
AFTER INSERT ON consumption
FOR EACH ROW
EXECUTE FUNCTION generate_billing_announcement();

-- 10. GENERATED REPORTS TABLE
CREATE TABLE IF NOT EXISTS generated_reports (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    pdf_file BYTEA NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT generated_reports_date_range CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS generated_reports_created_at_idx
ON generated_reports (created_at DESC);
