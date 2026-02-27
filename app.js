import { handleCommand } from "./src/commandHandler.js";

handleCommand("add [Задача1] [Описание1] [todo] [2]")
handleCommand("add [Задача2] [Описание2] [in-progress]")
handleCommand("show [1]")
handleCommand("edit [1] [title=New Title] [status=in-progress]")
handleCommand("show [1]")