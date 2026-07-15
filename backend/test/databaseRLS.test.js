import { describe, it, expect } from 'vitest';
import { consumerModel } from '../models/consumerModel.js';

describe('Database-Level Consumer Protection Constraints', () => {
  it('must block unauthorized cross-account read attempts across mismatched parameters', async () => {
    await expect(
      consumerModel.findReadings('owner-uuid-101', 'intruder-uuid')
    ).rejects.toThrow('SQL permission violation');
  });

  it('POST, PUT, or DELETE data requests against consumer tables must throw an SQL permission violation exception', async () => {
    await expect(consumerModel.executeWrite('consumer')).rejects.toThrow('SQL permission violation');
  });
});