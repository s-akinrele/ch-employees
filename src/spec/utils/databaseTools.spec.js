import {expect} from 'chai';
import {validateEmail, validateParams} from '../../utils/databaseTools';

describe('DatabaseTools()', () => {
  context('#validateEmail', () =>  {
    it('should return false', () =>  {
      expect(validateEmail("randomemail")).to.be.false
    })

    it('should return true', () =>  {
      expect(validateEmail("test@gmail.com")).to.be.true
    })
  })

  context('#validateParams', () =>  {
    it('should return the correct values', () =>  {
      const validParams =   {
        "email": "simi@gmail.com",
        "firstName": "Ade",
        "lastName": "Msns",
        "department": "Engineering",
        "salary": 90000,
        "status": "active"
      }
      const validate = validateParams(validParams);

      expect(validate.missingParams).to.be.empty;
      expect(validate.isValid).to.be.true;
    })

    it('should return falsey values', () =>  {
      const inValidParams =   {
        "email": "simi@gmail.com",
        "firstName": "Ade",
        "lastName": "Msns",
        "department": "Engineering",
        "salary": ""
      }
      const validate = validateParams(inValidParams);

      expect(validate.missingParams).to.include.members(["salary", "status"]);
      expect(validate.isValid).to.be.false;
    })
  })
})