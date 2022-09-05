export class EventTypes {
    welcome = "WELCOME"

}

class Event {
    type = null
    message = null
    created_by = null

    constructor() {
        // @ts-ignore
        this.created_by = new Date()
    }

    create(type: string, message: string) {
        console.log("=======created--type", type)
        // @ts-ignore
        this.type = type
        // @ts-ignore
        this.message = message
        this.commit();
    }

    commit() {
        console.log(`Created event type=${this.type} message=${this.message} at ${this.created_by}`)
    }
}

export default Event
