import TaskService from "./TaskService.js";

const taskService = new TaskService()

export function handleCommand(command) {
    try {
        if (command.startsWith("add ")) {
            addTask(command.slice(4))
            return
        }
        throw new Error("Неверная команда!")
    } catch (error) {
        console.log(error.message)
    }
}

function addTask(data) {
    data = parsingString(data)
    if (data.length != 3 && data.length != 4) {
        throw new Error("Неверное количество данных при добавлении")
    }
    taskService.addTask(...data)
}

function parsingString(data) {
    return data.match(/\[(.*?)\]/g).map(item => item.slice(1, -1))
}


