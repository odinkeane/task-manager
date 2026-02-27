export default class Task {
    static #lastId = 0
    static #priority = {
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
        5: "Critical"
    }
    static #status = {
        "todo": "To Do",
        "in-progress": "In Progress",
        "done": "Done"
    }


    constructor(title, description, status = "todo", priority = 3) {
        this.id = ++Task.#lastId
        this.title = title
        this.description = description
        this.status = status
        this.priority = priority
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.completedAt = (status == "done") ? new Date() : null
    }


    getPriorityLabel() {
        return Task.#priority[this.priority]
    }


    getStatusLabel() {
        return Task.#status[this.status]
    }


    isCompleted() {
        return this.completedAt != null
    }


    start() {
        this.status = "in-progress"
    }


    complete() {
        this.status = "done"
        this.completedAt = new Date()
    }


    reset() {
        this.status = "todo"
        this.completedAt = null
    }




    updatePriority(newPriority) {
        if (newPriority < 1 || newPriority > 5) {
            return
        }
        this.priority = newPriority
    }


    updateTitle(newTitle) {
        this.title = newTitle
    }


    updateDescription(newDescription) {
        this.description = newDescription
    }


    toString() {
        return `[${this.id}] ${this.title} - ${this.getStatusLabel()} (${this.getPriorityLabel()})`;
    }
}
