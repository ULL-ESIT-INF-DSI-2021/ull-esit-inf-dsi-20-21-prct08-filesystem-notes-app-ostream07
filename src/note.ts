
export enum Color { BLUE = 'blue', RED = 'red', YELLOW = 'yellow', BLACK = 'black', GREEN = 'green' };

export class Note {
  constructor(private title: string, private color: Color, private text: string) {
  }

  getTitle(): string {
    return this.title;
  }

  getColor(): Color {
    return this.color;
  }

  getText(): string {
    return this.text;
  }
} 