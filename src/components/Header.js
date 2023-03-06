import { Row , Col } from 'antd'
import React from 'react' 
import Profile from './Profile'
import download from '../download.png'


const HomeHeader =() =>{
    return(
        <div>
            <Row>
                <img src={download} className="skein-logo" alt="skeinlogo" />
                <h1 style={{textAlign:'center',marginRight:'370px',marginTop:'0px',wordSpacing:'4px'}}>Performance Appraisal Form</h1>
                <Col>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader