import readline from "readline/promises"
import { handleCommand } from "./src/commandHandler.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


async function main() {
    while (true) {
        info()
        const command = await rl.question("> ")
        console.clear()
        if (command === "exit") {
            break;
        }
        handleCommand(command)
    }
    rl.close()
}

function info(){
    console.log(`Список команд: 
    \radd [Title] [Description] [status] [priority?] - добавить новую задачу. 
    \rshow [id] - показать задачу по ее id
    \redit [id] [title=New Title] [status=in-progress] - изменить задачу. 
    \rdelete [id] - удалить задачу.
    \rstats - показать статистику.    
    \rexit - выход
    `)
}



main()
