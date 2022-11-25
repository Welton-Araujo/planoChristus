export const INITIAL_STATE = {
    all: [],
    current: {
        name: "",
        phone: "",
        email: "",
        passwd: "",
        photo: "",
        dateBirth: "",
        sex: "m",
        status: "a",
        services: [],
        bankAccount: {
            agency: "",
            bank: "",
            number: "",
            dv: "",
            type: "conta_corrente",
            cpfCnpj: "",
            owner: ""
        },
        recipientId: ""
    },
    services: [],
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