import { openDB } from 'idb';

const initdb = async () =>
  openDB('EditAnywhere', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('EditAnywhere')) {
        console.log('EditAnywhere database already exists');
        return;
      }
      // We only have one "row", which is all of the edited text
      db.createObjectStore('EditAnywhere');
      console.log('EditAnywhere database created');
    },
  });

// Accepts content and add it to the database

// Not using a incremented key becasue we only have one "row"
export const putDb = async (editedText) => {
  console.log('Update the database');
  // Create a connection to the database database and version we want to use.
  const EditAnywhereDb = await openDB('EditAnywhere', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = EditAnywhereDb.transaction('EditAnywhere', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('EditAnywhere');

  // Use the .put() method to update the store and pass in the content.
  const request = store.put(editedText, "editedText");

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);

}

// Get all the content from the database
// The edited text is all of the content
export const getDb = async () => {
  console.log('GET from the database');

    // Create a connection to the database and version we want to use.
    const EditAnywhereDb = await openDB('EditAnywhere', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = EditAnywhereDb.transaction('EditAnywhere', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('EditAnywhere');
  
    // Use the .get() method to get all data in the database,
    // which is just one "row".
    const request = store.get("editedText");
  
    // Get confirmation of the request.
    const result = await request;
    return result;
}

// Start the database.
initdb();
