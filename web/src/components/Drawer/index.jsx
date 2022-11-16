import { Drawer,Button } from "rsuite"

import styles from './Drawer.module.css'


const MyDrawer = (props)=>{
    const { title='Cadastro', components={}, setComponent, children=undefined, style={} } = props
    // console.log('MyDrawer ... ', style)

    return(
        <div className={styles.clientDrawer}>
            <Drawer open={components.drawer} onClose={()=>setComponent('drawer', false)} style={style}>
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={()=>setComponent('drawer', false)} appearance="primary" >
                            Fechar
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    {children}                    
                </Drawer.Body>
            </Drawer>
        </div>
    )
}


export default MyDrawer