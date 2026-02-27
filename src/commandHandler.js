import TaskService from "./TaskService.js";

const taskService = new TaskService()

export function handleCommand(command) {
    try {
        if (command.startsWith("add ")) {
            addTask(command.slice(4))
        } else if (command.startsWith("show ")) {
            showTask(command.slice("5"))
        } else if (command.startsWith("edit ")) {
            updateTask(command.slice("5"))
        } else if (command.startsWith("delete ")) {
            deleteTask(command.slice("7"))
        } else if (command.startsWith("stats")) {
            console.log(taskService.getStatistics())
        } else {
            throw new Error("Неверная команда!")
        }
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

function showTask(data) {
    data = parsingString(data)
    if (data.length != 1) {
        throw new Error("Неверное количество данных при отображении задачи")
    }
    const task = taskService.getTaskById(+data[0])
    if (!task) throw new Error("Такой задачи не существует!")
    console.log(task.toString())
}

function updateTask(data) {
    const [id, ...updated] = parsingString(data)
    const updatedData = updated.reduce((object, update) => {
        const [key, value] = update.split("=")
        return { ...object, [key]: value }
    }, {})
    taskService.updateTask(+id, updatedData)
}

function deleteTask(data) {
    data = parsingString(data)
    if (data.length != 1) {
        throw new Error("Неверное количество данных при отображении задачи")
    }
    taskService.deleteTask(+data[0])
}


function parsingString(data) {
    return data.match(/\[(.*?)\]/g).map(item => item.slice(1, -1))
}


