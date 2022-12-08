import { Link } from 'react-router-dom'

const MainMenu = (props) =>{
    const {
        className="mainMenu", 
        menu=[], 
        onClose=undefined, 
        style={}
    } = props
    // console.log('MainMenu', onClose)

    return(
        <div className={className} style={style}>
        {
            menu.map((item,i)=>(
                <Link key={`item-${i}`} to={item.src} onClick={onClose}>
                    <span className={item.icon}> {item.description}</span>
                </Link>
            ))
        }
        </div>
    )
}

export default MainMenu