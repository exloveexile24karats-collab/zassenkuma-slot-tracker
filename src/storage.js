import { db } from "./firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

// This mirrors the shape of Claude's built-in artifact `window.storage` API
// (get/set/delete returning {key, value, ...}), so the app logic ported
// from the Claude artifact barely had to change. Everything is stored in a
// single "kv" collection in Firestore, one document per key.
const COLLECTION = "kv";

export const storage = {
  async get(key) {
    const ref = doc(db, COLLECTION, key);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { key, value: snap.data().value };
  },
  async set(key, value) {
    const ref = doc(db, COLLECTION, key);
    await setDoc(ref, { value, updatedAt: Date.now() });
    return { key, value };
  },
  async delete(key) {
    const ref = doc(db, COLLECTION, key);
    await deleteDoc(ref);
    return { key, deleted: true };
  },
};
