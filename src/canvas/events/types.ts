export class EventTypes {
    welcome = "Welcome"
}

class Event {
    type = null
    created_by = new Date()
    message = null

    create(type: string, message: string) {
        // @ts-ignore
        this.type = type
        // @ts-ignore
        this.message = message
    }

    commit() {
        console.log(`Created event type=${this.type} message=${this.message}`)
    }
}

export default Event
