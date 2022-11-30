import _ from 'lodash';

export const sortRecords = (records, sortKeys) => {
  const sorted = _.sortBy(records, sortKeys)
  return sorted;
}

export const validateParams = (params) => {
  const validKeys = ['email', 'firstName', 'lastName', 'department', 'salary', 'status'];
  const isValidKeys = Object.keys(params).every(key => validKeys.includes(key));
  const isNotEmptyValues = Object.values(params).every(value => ![null, '', undefined].includes(value));
  return isValidKeys && isNotEmptyValues;
}
