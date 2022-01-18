import { openDB } from 'idb';

const initdb = async () =>
  openDB('EditAnywhere', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('EditAnywhere')) {
        console.log('EditAnywhere database already exists');
        return;
      }
      // db.createObjectStore('EditAnywhere', { keyPath: 'EditedText', autoIncrement: false });
      db.createObjectStore('EditAnywhere');
      console.log('EditAnywhere database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// let request = objectStore.put(item);
// let request = objectStore.put(item, key);

// Parameters
// item
// The item you wish to update or insert.

// key Optional
// The primary key of the record you want to update
//  (e.g. from IDBCursor.primaryKey). This is only needed for
//  object stores that have an autoIncrement primary key,
//  therefore the key is not in a field on the record object.
//  In such cases, calling put(item) will always insert a new
//  record, because it doesn't know what existing record you
//  might want to modify.
export const putDb = async (editedText) => {
  console.log('Update the database');
  // Create a connection to the database database and version we want to use.
  const EditAnywhereDb = await openDB('EditAnywhere', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = EditAnywhereDb.transaction('EditAnywhere', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('EditAnywhere');

  // Use the .put() method on the store and pass in the content.
  // const request = store.put({ content: editedText });
  const request = store.put(editedText, "editedText");

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

    // Create a connection to the database and version we want to use.
    const EditAnywhereDb = await openDB('EditAnywhere', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = EditAnywhereDb.transaction('EditAnywhere', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('EditAnywhere');
  
    // Use the .getAll() method to get all data in the database.
    const request = store.get("editedText");
  
    // Get confirmation of the request.
    const result = await request;
    // console.log('result.value', result);
    return result;
}

// Start the database.
initdb();
