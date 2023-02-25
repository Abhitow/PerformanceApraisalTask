import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import DepartmentDropdown from './DepartmentDropdown'
import SelectDropdown from './Dropdown'
import DropdownInput from './Dropdown'
import JoiningDatepicker from './JoiningDatepicker'
import ManagerDropdown from './ManagerDropdown'
const { Title } = Typography;
function PerformanceApraisalForm() {
  return (
    <div>
        <Card className='form-card' title={<Title style={{fontSize:'18px'}}>Performance Appraisal Form</Title>}>
            
        <Form labelCol={{span:8}} wrapperCol={{span:14}} colon={false}>
        <Row className='performance-form-row-one'>
            <Col span={12} >
                <FormItem label='Name of Employee' rules={[{required:true}]}>
                <span style={{color:'red',marginLeft:'-15px'}}>*</span>
                    <Input className='performance-input'/>
                </FormItem>
            </Col>
            <Col span={12} >
            <FormItem label='Manager Name'>
            <span style={{color:'red',marginLeft:'-15px'}}>*</span>
                    <ManagerDropdown className='performance-input'/>
                </FormItem>
            </Col>
        </Row>
        <Row className='performance-form-row-two'>
            <Col span={12} >
                <FormItem label='Designation'>
                <span style={{color:'red',marginLeft:'-15px'}}>*</span>
                    <SelectDropdown className='selectDropdown'/>
                </FormItem>
            </Col>
            <Col span={12} >
            <FormItem label='Department' >
            <span style={{color:'red',marginLeft:'-15px'}}>*</span>
                    <DepartmentDropdown className='performance-input'/>
                </FormItem>
            </Col>
        </Row>
        <Row className='performance-form-row-three'>
            <Col span={12} >
                <FormItem label='Joining Date'>
                <span style={{color:'red',marginLeft:'-15px'}}>*</span>
                   <DatePicker className='performance-input'/>
                </FormItem>
            </Col>
            <Col span={12} >
                <FormItem label='Review Period' >
                    <JoiningDatepicker className='performance-input'/>
                </FormItem>
            </Col>
        </Row>
            <Button htmlType='submit' type='primary'  style={{float:'right',marginTop:'30px',marginLeft:'8px',marginRight:'50px'}}>Submit</Button>
            <Button htmlType='cancel'  style={{float:'right',marginTop:'30px'}}>Cancel</Button> 
       </Form>
        </Card>
       
    </div>
  )
}

export default PerformanceApraisalForm