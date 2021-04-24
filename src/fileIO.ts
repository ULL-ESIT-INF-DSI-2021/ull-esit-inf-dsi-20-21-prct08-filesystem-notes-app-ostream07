import {Note} from './note';
import * as fs from 'fs';
import { join } from "path"; 
import { IndexEntry, NoteIndex } from "./interfaces";
import { searchEntryIndex } from './utils';

function loadIndex(dirPath: string): NoteIndex {
  const indexPath = join(dirPath, 'index.json');
  const indexContent = fs.readFileSync(indexPath);
  let index = JSON.parse(indexContent.toString());
  return index;
}

/**
 * @function loadNotes
 * @param user 
 */
export function loadNotes(user: string) {
  const dirPath = join('.', user);
  const notes: Note[] = [];

  if (fs.existsSync(dirPath)) {
    let index = loadIndex(dirPath);
    for (const entry of index.index) {
      let fileContent: Buffer = fs.readFileSync(join(dirPath, entry.fileName));
      // String en formato JSON y lo convierte en un objeto
      let contentObject = JSON.parse(fileContent.toString());
      //Actua como un diccionario, leemos cada atributo y la información que tiene y la extraemos
      notes.push(new Note(contentObject.title, contentObject.color, contentObject.text));
    }
  }
  return notes;
}

/**
 * 
 * @param user 
 * @param index Tipo NoteIndex, internamente es un vector de entries
 * @param note 
 */
export function saveNote(user: string, note: Note) {
  const dirPath = join('.', user);
  let index: NoteIndex;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    index = {index: []};
  } else {
    index = loadIndex(dirPath);
  }  

  let indexEntry: IndexEntry | false = searchEntryIndex(note.getTitle(), index);
  let fileName: string;
  if (indexEntry) {
    fileName = indexEntry.fileName;
  } else {
    fileName = note.getTitle().replace(/\s/g, "_") + '.json';
    index.index.push({title: note.getTitle(), fileName: fileName});
    let indexPath = join(dirPath, 'index.json');
    //Coge un objeto y la convierte a formato JSON
    fs.writeFileSync(indexPath, JSON.stringify(index));
  }
  // Escribe la nota
  fileName = join(dirPath, fileName);
  fs.writeFileSync(fileName, JSON.stringify(note));
}

export function removeNote(user: string, title: string) {
  const dirPath = join('.', user);
  if (fs.existsSync(dirPath)) {
    let index = loadIndex(dirPath);
    for(let i = 0; i < index.index.length; i++) {
      let entry = index.index[i];
      if (entry.title === title) {
        fs.unlinkSync(join(dirPath, entry.fileName));
        index.index.splice(i, 1);
        fs.writeFileSync(join(dirPath, 'index.json'), JSON.stringify(index));
        return true;
      }
    }
  } 
  return false;
}