import _ from 'lodash';

export const sortRecords = (records, sortKeys) => {
  const sorted = _.sortBy(records, sortKeys)
  return sorted;
}

export const validateParams = (params) => {
  const validKeys = ['email', 'firstName', 'lastName', 'department', 'salary', 'status'];
  let nullKeys = [];

  const isValidParams = validKeys.every(item => params.hasOwnProperty(item));
  const paramsKeys = Object.keys(params);

  paramsKeys.forEach(key => {
    if (validKeys.includes(key) && [null, '', undefined].includes(params[key])) {
      nullKeys.push(key);
    }
  })

  if (!isValidParams) {
    nullKeys.push(_.difference(validKeys, paramsKeys))
  }

  return {
    missingParams: _.flatten(nullKeys),
    isValid: nullKeys.length === 0
  };
}

export const validateEmail = email => {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  const isValidEmail = emailRegex.test(email);

  return isValidEmail;
}
