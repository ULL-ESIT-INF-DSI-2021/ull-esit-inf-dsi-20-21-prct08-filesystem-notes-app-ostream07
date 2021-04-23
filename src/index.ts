import * as yargs from 'yargs';
import {Note} from './note';
import { loadNotes, saveNotes} from './fileIO';
import { getNoteByTitle, getColorByString } from "./utils";

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' && 
          typeof argv.body === 'string' && typeof argv.color === 'string') {

      let userNotes = loadNotes(argv.user);
      if (!getNoteByTitle(argv.title, userNotes)) {
        let color = getColorByString(argv.color);
        if (color) {
          userNotes.push(new Note(argv.title, color, argv.body));
          saveNotes(userNotes, argv.user);
        } else {
          console.log('Invalid color');
          console.log('Admited colors: Red, Blue, Green, Yellow, Black');
        }
      } else {
        console.log('Error! Already exist a note with this title');
      }
    }
  },
});

yargs.command({
  command: 'modify',
  describe: 'Modify an existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      // Required logic to add a new note
      console.log(argv.title + ' ' + argv.user + ' ' + argv.body + ' ' + argv.color);
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove an existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      // Required logic to add a new note
      console.log(argv.title + ' ' + argv.user);
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List all notes for an user',
  builder: {
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      let userNotes = loadNotes(argv.user);
      console.log('Listing notes for user ' + argv.user + '...\n');
      for (const note of userNotes) {
        console.log(note.getTitle() + ' ' + note.getColor());
      }
    } else {
      console.log('Error');
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read an existing note of an user',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      let userNotes = loadNotes(argv.user);
      let note = getNoteByTitle(argv.title, userNotes);
      if (note) {
        console.log(note.getTitle());
        console.log(note.getText());
      } else {
        console.log('Error');
      }
    }
  },
});

yargs.parse();