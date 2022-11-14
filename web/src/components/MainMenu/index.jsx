import { Link } from 'react-router-dom'

const mainMenu = (props) =>{
    const { listMenu } = props
    // console.log('mainMenu', listMenu)

    return(
        <>
            <Link to="/"><span className="mdi mdi-calendar-check"> Agendamentos</span></Link>
            <Link to="/clientes"><span className="mdi mdi-account-multiple"> Clientes</span></Link>
        </>
    )
}

export default mainMenu