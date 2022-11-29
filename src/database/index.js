import { v4 as uuidv4 } from 'uuid';
class Database {
  constructor() {
    this.dataStore = {};
  }

  createTable(tableName, data=[]) {
    const newTable = {[tableName]: data};
    this.dataStore = Object.assign(this.dataStore, newTable)
    return this;
  }

  all(tableName) {
    return new Promise((resolve, reject) => {
      if (tableName in this.dataStore) {
        resolve(this.dataStore[tableName])
      } else {
        reject(new Error('ReferenceError', {cause: `${tableName} does not exist`}))
      }
    })
  }

  insert(tableName, data={}, uniqueIdentifier) {
    return new Promise((resolve, reject) => {
      if (tableName in this.dataStore) {
        let table = this.dataStore[tableName];
        const newData = Object.assign({[uniqueIdentifier]: uuidv4()}, data, {createdAt: (new Date()).toISOString()})
        table.push(newData)
        resolve(newData);
      } else {
        reject(new Error('StandardError', {cause: `something went wrong`}))
      }
    })
  }
}

export default Database;
