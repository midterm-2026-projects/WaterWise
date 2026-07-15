import mockBillingData from "/data/mockBillingData.js";

export function fetchBillingRecords() {
  return mockBillingData;
}

export function fetchBillingRecordById(id) {
  return mockBillingData.find(
    (record) => record.id === Number(id)
  );
}

export function fetchBillingRecordByUserId(userId) {
  return mockBillingData.find(
    (record) =>
      record.user_id === Number(userId)
  );
}

export function insertBillingRecord(billingRecord) {
  const nextId =
    mockBillingData.length > 0
      ? Math.max(
          ...mockBillingData.map(
            (record) => record.id
          )
        ) + 1
      : 1;

  const newRecord = {
    id: nextId,
    ...billingRecord,
  };

  mockBillingData.push(newRecord);

  return newRecord;
}

export function updateBillingRecord(
  id,
  updatedFields
) {
  const billingRecord =
    fetchBillingRecordById(id);

  if (!billingRecord) {
    return null;
  }

  Object.assign(
    billingRecord,
    updatedFields
  );

  return billingRecord;
}

export function removeBillingRecord(id) {
  const index =
    mockBillingData.findIndex(
      (record) =>
        record.id === Number(id)
    );

  if (index === -1) {
    return false;
  }

  mockBillingData.splice(index, 1);

  return true;
}