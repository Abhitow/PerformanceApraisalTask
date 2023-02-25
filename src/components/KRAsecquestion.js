import { Col, Divider, Row } from 'antd'
import React from 'react'
import KRAmanagerComment from './KRAmanagerComment'
import KRAmanagerRating from './KRAmanagerRating'
import KRArating from './KRArating'
import KRAselfrating from './KRAselfrating'
import KRAtextfield from './KRAtextarea'
import KRAtextfield2 from './KRAtextfield2'

function KRAsecquestion() {
  return (
    <div>
        <div>
            <Row style={{marginTop:'20px'}}>
                <Col>
                    <h3 style={{float:'left',fontSize:'20px'}}>
                        KRA 2: Problem Solving Skills and Technological Understanding
                    </h3>
                </Col>
            </Row>
           <Row>
            <Col span={24}>
                <KRAtextfield2 />
            </Col>
           </Row>
            <Row>
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
                        Select Rating<span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Justify Your Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRArating /></Col>
                <Col span={12}><KRAselfrating /></Col>
            </Row>
            <Row>
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Comments
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRAmanagerRating /></Col>
                <Col span={12}><KRAmanagerComment /></Col>
            </Row>
            
        </div>

        
       
    </div>
  )
}

export default KRAsecquestion