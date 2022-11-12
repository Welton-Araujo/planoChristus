import './Footer.css'
import FooterMain from './FooterMain'
import FooterButton from './FooterButton'


const Footer = (props) => {
    const { style } = props
    // console.log('Footer props', style)

    return(
        <footer style={{}}>
            <FooterMain style={style}/>
            <FooterButton style={style}/>
        </footer>
    )
}

export default Footer