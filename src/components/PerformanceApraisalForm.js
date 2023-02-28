import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import React,{useState} from 'react'
import DepartmentDropdown from './DepartmentDropdown'
import SelectDropdown from './Dropdown'
import JoiningDatepicker from './JoiningDatepicker'
import ManagerDropdown from './ManagerDropdown'
const { Title } = Typography;


const handleSubmit = (e) =>{
    // e.preventDefault();
}
const onFinishFailed=(errorInfo)=>{
    console.log('Failed',errorInfo);
}
const onFinish = (values) => {
    console.log(values);
  };
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
        
            
        <Form form={form}  onFinishFailed={onFinishFailed}   labelCol={{span:8}} wrapperCol={{span:14}} colon={false}>
        <Row className='performance-form-row-one'>
            <Col span={12} >

                <Form.Item label='Name of Employee' name={"name"} className="label1"
                 rules={[{required:true,message:'please enter Your name'}]} hasFeedback>
                    <Input className='performance-input' value={name} onChange={(e) =>{setName(e.target.value)}}/>
                </Form.Item>

            </Col>
            <Col span={12} >
            <Form.Item className="label2" label='Manager Name' name={"manager"} rules={[{required:true,message:'please select the manager'},]}>
                    <ManagerDropdown className='performance-input' value={manager} onChange={(e)=>{setManager(e.target.value)}}/>
                </Form.Item>
            </Col>
        </Row>
        <Row className='performance-form-row-two'>
            <Col span={12} >
                <Form.Item className="label3"  label='Designation' name={"designation"} rules={[{required:true,message:'please enter Your designation'}]} >
                    <SelectDropdown className='selectDropdown' value={designation} onChange={(e)=>{setDesignation(e.target.value)}}/>
                </Form.Item>
            </Col>
            <Col span={12} >
            <Form.Item className='label4' label='Department' name={"department"} rules={[{required:true,message:'please enter your department'}]} >
                    <DepartmentDropdown className='performance-input' value={department} onChange={(e)=>{setDepartment(e.target.value)}}/>
                </Form.Item>
            </Col>
        </Row>
        <Row className='performance-form-row-three'>
            <Col span={12} >
                <Form.Item className='joiningdate-label' label='Joining Date' name={"date"} rules={[{required:true,message:'please enter your joining date'}]} hasFeedback>
                   <DatePicker className='performance-joiningdate' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                </Form.Item>
            </Col>
            <Col span={12} >
                <Form.Item label='Review Period' className='review-period'>
                    <JoiningDatepicker className='performance-date'/>
                </Form.Item>
            </Col>
        </Row>
      
           
            {/* <Form.Item>
             <Button htmlType="submit" type='primary' className='performance-btn' onClick={handleSubmit}
            >Submit</Button>
            </Form.Item> */}

            <Button type="primary" htmlType="submit" className='performance-btn' onClick={handleSubmit}>
                     Submit
             </Button>
            
       </Form>
       
        </Card>
       
    </div>
  )
}

export default PerformanceApraisalForm