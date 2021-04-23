import {Note, Color} from './note';

export function getNoteByTitle(title: string, notes: Note[]) {
  for (const note of notes) {
    if(note.getTitle() === title) {
      return note;
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