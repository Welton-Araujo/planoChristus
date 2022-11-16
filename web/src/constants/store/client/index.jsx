export const INITIAL_STATE = {
    clients: [],
    client:{
        name: "",
        phone: "",
        email: "",
        passwd: "",
        photo: "",
        dateBirth: "",
        sex:"",
        status:"",
        document:{
            type:"",
            number:""
        },
        address: {
            street: "",
            number: "",
            district: "",
            zipCode: "",
            city: "",
            state: "",
            country: ""
        },
        geo:{
            type: "",
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