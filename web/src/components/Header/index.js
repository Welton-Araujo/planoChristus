import './Header.module.css'

const Header = ()=>{
    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-itens-center">
                <div className="">
                    <span className="d-block m-0 p-0 text-white">Barbaria Tal</span>
                    <small>Plano Gold</small>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png"/>
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    )
}

export default Header