import moment from 'moment'

export const INITIAL_STATE = {
    all: [],
    current: {
        "salonId": "",
        "services": [],
        "collaborators": [],
        "day": [],
        "start": "",
        "end": "",
        "dateRegistration": "",
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
		
