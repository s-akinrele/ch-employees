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
}

export default Database;
