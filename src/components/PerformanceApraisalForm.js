import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import React,{useState} from 'react'
import DepartmentDropdown from './DepartmentDropdown'
import SelectDropdown from './Dropdown'
import JoiningDatepicker from './JoiningDatepicker'
import ManagerDropdown from './ManagerDropdown'
const { Title } = Typography;


const handleSubmit = (e) =>{
    e.preventDefault();
}
const onFinishFailed=(errorInfo)=>{
    console.log('Failed',errorInfo);
}
function PerformanceApraisalForm() {
    const [form] = Form.useForm();
    const [name , setName] = useState();
    const[manager , setManager]= useState();
    const[designation , setDesignation] = useState();
    const[department , setDepartment] = useState();
    const[date , setDate] = useState();
  return (
    <div>
        <Card className='form-card' title={<Title style={{fontSize:'20px'}}>Performance Appraisal Form</Title>}>
        
            
        <Form form={form}  onFinishFailed={onFinishFailed} labelCol={{span:8}} wrapperCol={{span:14}} colon={false}>
        <Row className='performance-form-row-one'>
            <Col span={12} >

                <Form.Item label='Name of Employee' name={"name"}
                 rules={[{required:true,message:'please enter Your name'}]}>
                    <Input className='performance-input' value={name} onChange={(e) =>{setName(e.target.value)}}/>
                </Form.Item>

            </Col>
            <Col span={12} >
            <Form.Item label='Manager Name' name={"manager"} rules={[{required:true,message:'please enter Your name'},]}>
                    <ManagerDropdown className='performance-input' value={manager} onChange={(e)=>{setManager(e.target.value)}}/>
                </Form.Item>
            </Col>
        </Row>
        <Row className='performance-form-row-two'>
            <Col span={12} >
                <Form.Item label='Designation' name={"designation"} rules={[{required:true,message:'please enter Your name'}]}>
                    <SelectDropdown className='selectDropdown' value={designation} onChange={(e)=>{setDesignation(e.target.value)}}/>
                </Form.Item>
            </Col>
            <Col span={12} >
            <Form.Item label='Department' name={"department"} rules={[{required:true,message:'please enter Your name'}]}>
                    <DepartmentDropdown className='performance-input' value={department} onChange={(e)=>{setDepartment(e.target.value)}}/>
                </Form.Item>
            </Col>
        </Row>
        <Row className='performance-form-row-three'>
            <Col span={12} >
                <Form.Item label='Joining Date' name={"date"} rules={[{required:true,message:'please enter Your name'}]}>
                   <DatePicker className='performance-input' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                </Form.Item>
            </Col>
            <Col span={12} >
                <Form.Item label='Review Period'>
                    <JoiningDatepicker className='performance-input'/>
                </Form.Item>
            </Col>
        </Row>
      
            <Button htmlType='submit' type='primary' className='performance-btn' onClick={handleSubmit}
            >Submit</Button>
            <Button htmlType='cancel'  style={{float:'right',marginTop:'30px'}}>Cancel</Button> 
       </Form>
       
        </Card>
       
    </div>
  )
}

export default PerformanceApraisalForm