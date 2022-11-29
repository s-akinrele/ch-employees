import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import {sortRecords} from '../utils/databaseTools';
class Database {
  constructor() {
    this.dataStore = {};
  }

  createTable(tableName, data=[], uniqueIdentifier) {
    const newTable = {[tableName]: {records: [], uniqueIdentifier, indices: {}}}
    this.dataStore = Object.assign(this.dataStore, newTable)

    if (data.length) {
      this.insert(tableName, data[0])
    }

    return this;
  }

  all(tableName) {
    return new Promise((resolve, reject) => {
      if (tableName in this.dataStore) {
        resolve(this.dataStore[tableName].records)
      } else {
        reject(new Error('ReferenceError', {cause: `${tableName} does not exist`}));
      }
    })
  }

  insert(tableName, data={}) {
    return new Promise((resolve, reject) => {
      if (tableName in this.dataStore) {
        let table = this.dataStore[tableName];
        const recordValues = Object.values(data);
        const newData = Object.assign({[table.uniqueIdentifier]: uuidv4()}, data, {createdAt: (new Date()).toISOString()});
        table.records.push(newData);
        table.indices[recordValues.join()] = newData;
        resolve(newData);
      } else {
        reject(new Error('StandardError', {cause: `something went wrong`}))
      }
    })
  }

  findOne(tableName, id) {
    return new Promise((resolve, reject) => {
      if (tableName in this.dataStore) {
        const table = this.dataStore[tableName];
        const record = table.records.find((record) => record[table.uniqueIdentifier] === id);
        if (record) {
          resolve(record)
        } else {
          reject(new Error('NotFoundError', {cause: `record with ${id} does not exist`}))
        }
      }
    })
  }

  where(tableName, options={}) {
    const {search = {}, sortBy = []} = options
    const searchKeys = Object.keys(search);
    const table = this.dataStore[tableName];

    return new Promise((resolve, reject) => {
      if (table) {
        let result = [];
        const tableIndices = Object.keys(table.indices);
        let existingIndices = {};

        searchKeys.forEach(key => {
          const currentIndices = tableIndices.filter(index => index.includes(search[key]));
          existingIndices[currentIndices.join()] = currentIndices;
        })

        const indicesValue = _.flatten(Object.values(existingIndices));
        indicesValue.forEach(index => {
          if (table.indices[index])
            result.push(table.indices[index])
        });

        if(result.length || searchKeys.length) {
          resolve(sortRecords(result, sortBy))
        } else {
          resolve(sortRecords(table.records, sortBy))
        }

      } else {
        reject(new Error('ReferenceError', {cause: `${tableName} does not exist`}));
      }
    })
  }
}

export default Database;
