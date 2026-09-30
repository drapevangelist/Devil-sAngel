const DB_NAME = 'romantic_letter_audio_db';
const STORE_NAME = 'audio_files';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'trackId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export interface StoredAudioRecord {
  trackId: string;
  blob: Blob;
  fileName: string;
  fileSize: number;
  mimeType: string;
  updatedAt: number;
}

export async function saveAudioTrackBlob(
  trackId: string,
  fileOrBlob: File | Blob,
  fileName?: string
): Promise<void> {
  try {
    const db = await openDB();
    const record: StoredAudioRecord = {
      trackId,
      blob: fileOrBlob,
      fileName: fileName || (fileOrBlob instanceof File ? fileOrBlob.name : `${trackId}.mp3`),
      fileSize: fileOrBlob.size,
      mimeType: fileOrBlob.type || 'audio/mpeg',
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('Failed to save audio to IndexedDB:', err);
  }
}

export async function getStoredAudioTrack(trackId: string): Promise<StoredAudioRecord | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(trackId);

      req.onsuccess = () => {
        resolve(req.result || null);
      };
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('Failed to retrieve audio from IndexedDB:', err);
    return null;
  }
}

export async function removeStoredAudioTrack(trackId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(trackId);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('Failed to delete audio from IndexedDB:', err);
  }
}
