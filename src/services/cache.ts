import { openDB, type IDBPDatabase } from 'idb';
import type { SlideData } from '../types';

const DB_NAME = 'dfu-presentation-db';
const DB_VERSION = 1;
const SLIDES_STORE = 'slides';
const META_STORE = 'meta';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(SLIDES_STORE)) {
          db.createObjectStore(SLIDES_STORE, { keyPath: 'slide_id' });
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE);
        }
      },
    });
  }
  return dbPromise;
}

/** Save all slides to IndexedDB (preserving order) */
export async function cacheSlides(slides: SlideData[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(SLIDES_STORE, 'readwrite');
  // Clear old entries first
  await tx.store.clear();
  for (const slide of slides) {
    await tx.store.put({ ...slide, last_updated: new Date().toISOString() });
  }
  await tx.done;
  // Save timestamp + ordered slide IDs
  const metaTx = db.transaction(META_STORE, 'readwrite');
  await metaTx.store.put(new Date().toISOString(), 'lastUpdated');
  await metaTx.store.put(slides.map(s => s.slide_id), 'slideOrder');
  await metaTx.done;
}

/** Retrieve all cached slides in correct order */
export async function getCachedSlides(): Promise<SlideData[]> {
  const db = await getDB();
  const order: string[] | undefined = await db.get(META_STORE, 'slideOrder');
  const all = await db.getAll(SLIDES_STORE);
  if (!order || order.length !== all.length) return [];
  const map = new Map(all.map(s => [s.slide_id, s]));
  const ordered: SlideData[] = [];
  for (const id of order) {
    const slide = map.get(id);
    if (slide) ordered.push(slide);
  }
  return ordered.length === order.length ? ordered : [];
}

/** Get last-updated timestamp */
export async function getLastUpdated(): Promise<string | null> {
  const db = await getDB();
  return db.get(META_STORE, 'lastUpdated') ?? null;
}

/** Cache a single updated slide */
export async function cacheSingleSlide(slide: SlideData): Promise<void> {
  const db = await getDB();
  await db.put(SLIDES_STORE, { ...slide, last_updated: new Date().toISOString() });
}

/** Clear all cached data */
export async function clearCache(): Promise<void> {
  const db = await getDB();
  const tx1 = db.transaction(SLIDES_STORE, 'readwrite');
  await tx1.store.clear();
  await tx1.done;
  const tx2 = db.transaction(META_STORE, 'readwrite');
  await tx2.store.clear();
  await tx2.done;
}
