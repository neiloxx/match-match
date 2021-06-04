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
      usersStore.createIndex('avatar', 'avatar');
    };
    this.dbRequest.onerror = () => {
      throw new Error('error opening database');
    };
  }

  upsert(
    collectionName: string,
    data: { [p: string]: string | number },
  ): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      let result: IDBValidKey;
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
  ): Promise<Array<{ [key: string]: string | number }>> {
    return new Promise((resolve, reject) => {
      let result: Array<{ [key: string]: string }>;
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
