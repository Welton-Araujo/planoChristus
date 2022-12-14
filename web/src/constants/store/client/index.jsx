export const INITIAL_STATE = {
    all: [],
    current:{
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
        customerId:"",
        salonClient:{
            salonClientId: "",
            status: "",
            dateRegistration: ""
        }
    },
    form:{
        filtering: false,
        disabled: true,
        saving: false
    },
    behavior: "create",
    components:{
        drawer: { id:0, open:false },
        modal: { id:0, open:false },
        // confirmDelete: false
    }
}