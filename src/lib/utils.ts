import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A "smart" shuffle function that ensures all items in a list are seen before any are repeated.
 * It stores a shuffled version of the list in localStorage and works its way through it.
 * Once all items have been returned, it reshuffles and starts over.
 * @param key A unique key to store the shuffled list in localStorage.
 * @param items The array of items to shuffle through.
 * @returns The next item in the shuffled list.
 */
export function smartShuffle<T>(key: string, items: T[]): T {
  if (typeof window === 'undefined' || !items || items.length === 0) {
    // Fallback for server-side rendering or empty arrays
    return items[Math.floor(Math.random() * items.length)];
  }

  try {
    const storedStateJSON = localStorage.getItem(key);
    let shuffledIndices: number[] = [];

    if (storedStateJSON) {
      shuffledIndices = JSON.parse(storedStateJSON);
    }

    if (shuffledIndices.length === 0) {
      // Fisher-Yates shuffle algorithm to create a new shuffled list of indices
      const indices = Array.from({ length: items.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      shuffledIndices = indices;
    }

    const nextIndex = shuffledIndices.pop(); // Get the next item from the end
    localStorage.setItem(key, JSON.stringify(shuffledIndices));

    if (nextIndex === undefined) {
      // This should ideally not happen if we reshuffle when empty, but as a fallback:
      return items[Math.floor(Math.random() * items.length)];
    }

    return items[nextIndex];

  } catch (error) {
    console.error("Smart shuffle failed, falling back to random:", error);
    // Fallback in case of localStorage errors (e.g., private browsing)
    return items[Math.floor(Math.random() * items.length)];
  }
}