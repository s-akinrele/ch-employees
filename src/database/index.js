import { v4 as uuidv4 } from 'uuid';
class Database {
  constructor() {
    this.dataStore = {};
  }

  createTable(tableName, data=[], uniqueIdentifier) {
    const newTable = {[tableName]: {records: data, uniqueIdentifier}}
    this.dataStore = Object.assign(this.dataStore, newTable)
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
        const newData = Object.assign({[table.uniqueIdentifier]: uuidv4()}, data, {createdAt: (new Date()).toISOString()});
        table.records.push(newData);
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
}

export default Database;
