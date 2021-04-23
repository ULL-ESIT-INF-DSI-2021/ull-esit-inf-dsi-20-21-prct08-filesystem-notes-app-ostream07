import {Note} from './note';
import * as fs from 'fs';
import { join } from "path"; 

/**
 * @function loadNotes
 * @param user 
 */
export function loadNotes(user: string) {
  const dirPath = join('.', user);
  const notes: Note[] = [];

  if (fs.existsSync(dirPath)) {
    // Nombres de los ficheros bajo ese directorio
    const fileNames = fs.readdirSync(dirPath);
    for (const filename of fileNames) {
      let fileContent: Buffer = fs.readFileSync(join(dirPath, filename));
      // String en formato JSON y lo convierte en un objeto
      let contentObject = JSON.parse(fileContent.toString());
      //Actua como un diccionario, leemos cada atributo y la información que tiene y la extraemos
      notes.push(new Note(contentObject.title, contentObject.color, contentObject.text));
    }
  }
  return notes;
}

export function saveNotes(notes: Note[], user: string) {
  const dirPath = join('.', user);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
    
  for (const note of notes) {
    let fileName = note.getTitle().replace(/\s+/g, "_") + '.json';
    fileName = join(dirPath, fileName);
    //Coge un objeto y la convierte a formato JSON
    fs.writeFileSync(fileName, JSON.stringify(note));
  }
}