import chalk from 'chalk';
import { NoteIndex } from './interfaces';
import {Note, Color} from './note';

export function getNoteByTitle(title: string, notes: Note[]) {
  for (const note of notes) {
    if(note.getTitle() === title) {
      return note;
    }
  }
  return false;
}

export function searchEntryIndex(title: string, index: NoteIndex) {
  for (const entry of index.index) {
    if(entry.title === title) {
      return entry;
    }
  }
  return false;
}

export function getColorByString(color: string) {
  switch(color.toLowerCase()) {
    case 'red':
      return Color.RED;
    
    case 'blue':
      return Color.BLUE;

    case 'green':
      return Color.GREEN;

    case 'yellow':
      return Color.YELLOW;

    case 'black':
      return Color.BLACK;

    default:
      return false;
  }
}

export function getColorizer(note: Note) {
  switch(note.getColor()) {
    case Color.RED:
      return chalk.red;
    
    case Color.BLUE:
      return chalk.blue;

    case Color.GREEN:
      return chalk.green;

    case Color.YELLOW:
      return chalk.yellow;

    case Color.BLACK:
      return chalk.black;

    default:
      return chalk.white;
  }
}