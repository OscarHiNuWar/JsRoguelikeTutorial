import { Display } from "rot-js";
import { Colors } from "./colors";

export class Message {
  count: number;

  constructor(public plainText: string, public fg: Colors) {
    this.count = 1;
  }

  get fullText(): string {
    if (this.count > 1) {
      return `${this.plainText} (x${this.count})`;
    }
    return this.plainText;
  }
}

export class MessageLog {
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  addMessage(text: string, fg: Colors = Colors.White, stack: boolean = true) {
    if (
      stack &&
      this.messages.length > 0 &&
      this.messages[this.messages.length - 1].plainText === text
    ) {
      this.messages[this.messages.length - 1].count++;
    } else {
      this.messages.push(new Message(text, fg));
    }
  }

  renderMessages(
    display: Display,
    x: number,
    y: number,
    width: number,
    height: number,
    messages: Message[]
  ) {
    let yOffset = height - 1;

    const reserved = messages.slice().reverse();
    for (let mgs of reserved) {
      let lines = [mgs.fullText];
      if (mgs.fullText.length > width) {
        const words = mgs.fullText.split(" ");
        let currentLine = "";
        lines = [];

        while (words.length > 0) {
          if ((currentLine + " " + words[0]).length > width) {
            lines.push(currentLine);
            currentLine = "";
          } else {
            currentLine += " " + words.shift();
          }
        }

        lines.push(currentLine);
        lines.reverse();
      }

      for (let line of lines) {
        const text = `%c{${mgs.fg}}${line}`;
        display.drawText(x, y + yOffset, text, width);
        yOffset -= 1;
        if (yOffset < 0) return;
      }
    }
  }

  render(
    display: Display,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.renderMessages(display, x, y, width, height, this.messages);
  }
}
