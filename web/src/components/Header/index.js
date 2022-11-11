import './index.css'

const Header = (props)=>{
    const { style } = props
    console.log('Header',style)
    return (
        <header className="d-flex container-fluid justify-content-end" >
            <div className="secondaryMenu align-itens-center" style={style}>
                <div className="">
                    <span className="d-block m-0 p-0 text-white">Barbaria Tal</span>
                    <small className="subtitle">Plano Gold</small>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt='avatar'/>
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    )
}

export default Header