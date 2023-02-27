import { Col, Input, Row, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function Feedback() {
  return (
    <>
    <div >
    <Row>
        <Col span={12} >
            <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
                Self Aspirations<span style={{color:'red'}}>*</span>
            </p>
        </Col>
        <Col span={12} >
            <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
                Teamlead Feedback<span style={{color:'red'}}>*</span>
            </p>
        </Col>
    </Row>
    <Row>
        <Col span={12}>
            <TextArea rows={4} style={{width:'400px',marginRight:'55px'}}/>
        </Col>
        <Col span={12}>
            <TextArea rows={4} style={{width:'400px',marginRight:'55px'}}/>
        </Col>
    </Row>
    <Row style={{marginTop:'30px'}}>
        <Col span={12} >
            <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
            Employee Self Rating<span style={{color:'red'}}>*</span>
            </p>
        </Col>
        <Col span={12} >
            <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
            Manager's Consolidated Rating<span style={{color:'red'}}>*</span>
            </p>
        </Col>
    </Row>
    <Row>
        <Col span={12}>
            <Input rows={4} style={{width:'400px',marginRight:'55px'}}/>
        </Col>
        <Col span={12}>
            <Input rows={4} style={{width:'400px',marginRight:'55px'}}/>
        </Col>
    </Row>


    </div>
   
        {/* <div style={{float:'right',marginRight:'100px'}}>
            <TextArea rows={4} style={{width:'400px',marginTop:''}}/>
        </div> */}
    </>
   
  )
}

export default Feedback