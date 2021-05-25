export default class DataBase {
  private dbRequest: IDBOpenDBRequest = indexedDB.open('neiloxx');

  private database: IDBDatabase | undefined;

  private store: IDBObjectStore | undefined;

  constructor() {
    this.dbRequest.onupgradeneeded = () => {
      this.database = this.dbRequest.result;
      const usersStore = this.database.createObjectStore('users', {
        keyPath: 'id',
        autoIncrement: true,
      });
      usersStore.createIndex('firstName', 'firstName');
      usersStore.createIndex('lastName', 'lastName');
      usersStore.createIndex('score', 'score');
      usersStore.createIndex('email', 'email');
      const settingsStore = this.database.createObjectStore('settings', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
    this.dbRequest.onsuccess = () => {
      console.log('connection successful');
    };
    this.dbRequest.onerror = () => {
      console.log('error opening database');
    };
  }

  upsert(
    collectionName: string,
    data: { [p: string]: string | number | null },
  ) {
    return new Promise((resolve, reject) => {
      let result: IDBValidKey | null = null;
      this.database = this.dbRequest.result;
      const transaction = this.database.transaction(
        collectionName,
        'readwrite',
      );
      const store = transaction.objectStore(collectionName);
      const request = store.put(data);
      if (transaction && request) {
        transaction.oncomplete = () => resolve(result);
        transaction.onerror = event => reject(event);
        request.onsuccess = () => {
          result = request.result;
        };
      }
    });
  }

  getAll(
    collectionName: string,
  ): Promise<Array<{ [key: string]: string | number | null }> | null> {
    return new Promise((resolve, reject) => {
      let result: Array<{ [key: string]: string | null }> | null = null;
      this.database = this.dbRequest.result;
      const transaction = this.database.transaction(collectionName, 'readonly');
      const store = transaction.objectStore(collectionName);
      const request = store.getAll();
      if (transaction && request) {
        transaction.oncomplete = () => resolve(result);
        transaction.onerror = event => reject(event);
        request.onsuccess = () => {
          result = request.result;
        };
      }
    });
  }
}
