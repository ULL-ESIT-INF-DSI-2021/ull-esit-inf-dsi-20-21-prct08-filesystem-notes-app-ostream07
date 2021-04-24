/**
 * @interface IndexEntry, entries of the index
 */
export interface IndexEntry {
  title: string;
  fileName: string;
}

/**
 * @interface NoteIndex, index with all the entries
 */
export interface NoteIndex {
  index: IndexEntry[];
}
