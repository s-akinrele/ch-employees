import _ from 'lodash';

export const sortRecords = (records, sortKeys) => {
  const sorted = _.sortBy(records, sortKeys)
  return sorted;
}

