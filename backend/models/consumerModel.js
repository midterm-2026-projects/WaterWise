let temporaryReadings = [
  { id: 'read-101', profile_id: 'owner-uuid-101', reading_date: '2026-06-01', previous_reading: '100.00', present_reading: '115.50' },
  { id: 'read-102', profile_id: 'owner-uuid-101', reading_date: '2026-07-01', previous_reading: '115.50', present_reading: '138.20' }
];

let temporaryInvoices = [
  { id: 'inv-201', profile_id: 'owner-uuid-101', amount_due: '450.00', status: 'Unpaid', billing_month: 'June 2026' }
];

export const consumerModel = {
  findReadings: async (profileId, sessionUserId) => {
    if (profileId !== sessionUserId) {
      throw new Error('SQL permission violation: Cross-account dataset reading blocked.');
    }
    return temporaryReadings.filter(r => r.profile_id === profileId);
  },

  findInvoices: async (profileId, sessionUserId) => {
    if (profileId !== sessionUserId) {
      throw new Error('SQL permission violation: Cross-account dataset reading blocked.');
    }
    return temporaryInvoices.filter(i => i.profile_id === profileId);
  },

  executeWrite: async (sessionRole) => {
    if (sessionRole === 'consumer') {
      throw new Error('SQL permission violation: Table security configuration rejects all write attempts.');
    }
    return { success: true };
  }
};