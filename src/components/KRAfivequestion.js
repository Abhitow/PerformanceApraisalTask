import { Col, Divider, Row } from 'antd'
import React from 'react'
import KRAmanagerComment from './KRAmanagerComment'
import KRAmanagerRating from './KRAmanagerRating'
import KRArating from './KRArating'
import KRAselfrating from './KRAselfrating'
import KRAtextfield from './KRAtextarea'
import KRAtextfield4 from './KRAtextfield4'
import KRAtextfield5 from './KRAtextfield5'

function KRAfivequestion() {
  return (
    <div>
        <div>
            <Row>
                <Col>
                    <h3 style={{float:'left',fontSize:'20px'}}>KRA 5: Self-Learning / Adopting to new technologies</h3>
                </Col>
            </Row>
           <Row>
            <Col span={24}>
                <KRAtextfield5 />
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

export default KRAfivequestion