import { MessageLog } from "./components/message-log";
import { Colors } from "./components/colors";

import { spawnPlayer } from "./entities";
import { Engine } from "./engine";

declare global {
  interface Window {
    engine: Engine;
    messageLog: MessageLog;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.messageLog = new MessageLog();
  window.engine = new Engine(spawnPlayer(Engine.WIDTH / 2, Engine.HEIGHT / 2));
  window.messageLog.addMessage(
    "Hello and welcome to this Typescript Roguelike!",
    Colors.WelcomeText
  );
  window.engine.render();
});
