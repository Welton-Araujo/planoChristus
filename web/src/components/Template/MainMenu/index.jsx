import { Link } from 'react-router-dom'

const mainMenu = (props) =>{
    const { menu, onClose } = props
    console.log('MainMenu', menu)

    return(
        <>{
            menu.map((item,i)=>(
                <Link key={`item-${i}`} to={item.src} onClick={onClose}>
                    <span className={item.icon}>{ item.description}</span>
                </Link>
            ))
        }</>
    )
}

export default mainMenu