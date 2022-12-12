import moment from 'moment'

export const INITIAL_STATE = {
    all: [],
    current: {
        "salonId": "",
        "services": [],
        "collaborators": [],
        "day": [],
        "start": moment(),
        "end": moment(),
        "dateRegistration": new Date(),
    },
    services:[],
    collaborators:[],
    form: {
        filtering: false,
        disabled: false,
        saving: false
    },
    behavior: "create",
    components: {
        drawer: { id: 0, open: false },
        modal: { id: 0, open: false },
        calendar: {view:"week"},
        // confirmDelete: false
    }
}
		
