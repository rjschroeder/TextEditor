import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("put to db");
  let textEditorDb = await openDB("jate", 1);
  let tx = textEditorDb.transaction("jate", "readwrite");
  let store = tx.objectStore("jate");
  let request = store.add({text:content});
  let result = await request;
  console.log("Data saved to db", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from db");
  let textEditorDb = await openDB("jate", 1);
  let tx = textEditorDb.transaction("jate", "readonly");
  let store = tx.objectStore("jate");
  let request = store.getAll();
  let result = await request;
  console.log("Result: ", result);
  return result;
};

initdb();
