export const INITIAL_STATE = {
    clients: [],
    client:{
        name: "",
        phone: "",
        email: "",
        passwd: "",
        photo: "",
        dateBirth: "",
        sex:"m",
        status:"a",
        document:{
            type:"cpf",
            number:""
        },
        address: {
            street: "",
            number: "",
            district: "",
            zipCode: "",
            city: "",
            state: "sp",
            country: "br"
        },
        geo:{
            type: "Point",
            coordinates: []
        },
        customerId:""
    },
    form:{
        filtering: false,
        disabled: true,
        saving: false
    },
    behavior: "create",
    components:{
        drawer: false,
        modal: false,
        confirmDelete: false
    }
}