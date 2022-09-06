class EventTypes {
    welcome = "WELCOME"
    updateLayout = "LAYOUT_UPDATE"


}

class Event {
    type = null
    message = null
    state= null
    created_at = null

    constructor(type: string, message: string, state: any) {
        // @ts-ignore
        this.created_at = new Date();
        // @ts-ignore
        this.type = type;
        // @ts-ignore
        this.message = message;
        this.state = state
    }

    commit(){
        console.debug(`event created type="${this.type}" message="${this.message}"`)
        return this;
    }

}
export default Event;
export const EVENT_TYPES = new EventTypes()
