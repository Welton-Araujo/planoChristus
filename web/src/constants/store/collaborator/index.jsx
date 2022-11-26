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
        bankAccount: {
            owner: "",
            cpfCnpj: "",
            bank: "",
            type: "conta_corrente",
            agency: "",
            number: "",
            dv: "",
        },
        recipientId: "",
        services: [],
        salonCollaborator:{}
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