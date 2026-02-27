import Task from "./Task.js"

export default class TaskService {
    constructor() {
        this.tasks = []
    }
    addTask(title, description, status, priority) {
        this.tasks.push(new Task(title, description, status, priority))
    }
    getTaskById(id) {
        return this.tasks.find(task => task.id === id)
    }
    updateTask(id, updatedData) {
        const task = this.getTaskById(id)
        if (task) {
            if (updatedData.hasOwnProperty("title")) task.updateTitle(updatedData.title);
            if (updatedData.hasOwnProperty("description")) task.updateDescription(updatedData.description)
            if (updatedData.hasOwnProperty("status")) {
                switch (updatedData.status) {
                    case "todo": task.reset(); break;
                    case "in-progress": task.start(); break;
                    case "done": task.complete(); break;
                    default: break;
                }
            }
            if (updatedData.hasOwnProperty("priority")) task.updatePriority(updatedData.priority)
        }


    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id)
    }


    #getCountByStatus() {
        const countByStatus = {}
        this.tasks.forEach(t => {
            if (!countByStatus.hasOwnProperty(t.status)) {
                countByStatus[t.status] = 0
            }
            countByStatus[t.status]++
        })
        return countByStatus
    }
    #getAveragePriority() {
        const sum = this.tasks.reduce((sum, task) => sum + task.priority, 0)
        return (sum / this.tasks.length).toFixed(1)
    }
    #getCompletionPercentage() {
        const countDoneTasks = this.tasks.filter(t => t.status == "done")
        return Math.floor(countDoneTasks.length / this.tasks.length * 100) + "%"
    }


    getStatistics() {
        return {
            count: this.tasks.length,
            countByStatus: this.#getCountByStatus(),
            averagePriority: this.#getAveragePriority(),
            completionPercentage: this.#getCompletionPercentage()
        }
    }
}


