import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('DDL Schema File Constraints Verification', () => {
  it('must compile the consumption-optimized DDL script without syntax structural failures', () => {
    const migrationPath = path.resolve(__dirname, '../../db/migration.sql');
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS profiles');
    expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS meter_readings');
    expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS invoices');
    expect(sqlContent).toContain('ENABLE ROW LEVEL SECURITY');
  });
});