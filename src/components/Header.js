import { Row , Col } from 'antd'
import React from 'react' 
import Profile from './Profile'


const HomeHeader =() =>{
    return(
        <div>
            <Row>
                <h1 style={{margin:'auto',marginLeft:'0px',color:'white'}}>Skein Technologies</h1>
                <Col>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader