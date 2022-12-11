import moment from 'moment'

export const INITIAL_STATE = {
    all: [],
    current: {
        "salonId": "",
        "title": "",
        "price": "",
        "duration": moment('00:30', 'HH:mm').format(),
        "commission": "",
        "recurrence": "",
        "description": "",
        "status": "a",
        "dateRegistration": "",
        "files":[]//[{ name:"", fileKey:0, url:""}]
    },
    form: {
        filtering: false,
        disabled: true,
        saving: false
    },
    behavior: "create",
    components: {
        drawer: { id: 0, open: false },
        modal: { id: 0, open: false },
        // confirmDelete: false
    }
}