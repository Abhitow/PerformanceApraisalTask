import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import axios from 'axios'
import React,{useState} from 'react'
import DepartmentDropdown from './DepartmentDropdown'
import SelectDropdown from './Dropdown'
import JoiningDatepicker from './JoiningDatepicker'
import ManagerDropdown from './ManagerDropdown'
const { Title } = Typography;





function PerformanceApraisalForm() {
    const [form] = Form.useForm();
    const [name , setName] = useState();
    const[manager , setManager]= useState();
    const[designation , setDesignation] = useState();
    const[department , setDepartment] = useState();
    const[date , setDate] = useState();
    const[review_date , setReviewDate] = useState();
    const[postData , setPostData] =useState();




    const handleSubmit = (e) =>{
        // e.preventDefault();
    
        // fetch("https://demo.emeetify.com:81/appraisel/users/FormDetails?email=sameenabegum.s@skeintech.com",{
        //     method:'PUT',
        //     body:JSON.stringify({
        //         "username": name ,
        //         "Manager_name":manager,
        //         "Designation":designation,
        //         "Department":department,
        //         "Joining_date":date,
        //         "Review_period":review_date
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //       },
        // })
        // .then((response)=> response.json())
        // .then((data) =>{ setPostData(data)})
        // .catch((err) =>{console.log(err.message)});
    }
    const payload ={
        "username": name ,
        "Manager_name":manager,
        "Designation":designation,
        "Department":department,
        "Joining_date":date,
        "Review_period":review_date
    };

    const onFinish = (values) => {
        console.log(values);
        axios.post("https://demo.emeetify.com:81/appraisel/users/FormDetails?email=sameenabegum.s@skeintech.com" ,payload)
        .then((response)=>{console.log(response)})
        .catch(e =>{console.log("e" ,e)})
      };

      console.log(payload);
      const onFinishFailed=(errorInfo)=>{
        console.log('Failed',errorInfo);
    }

  return (
    <div>
        <Card className='form-card' title={<Title style={{fontSize:'20px'}}>Performance Appraisal Form</Title>}>
        
            
        <Form form={form}  onFinishFailed={onFinishFailed} onFinish={onFinish}   labelCol={{span:8}} wrapperCol={{span:14}} colon={false}>
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
                    <SelectDropdown className='selectDropdown' value={designation} />
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
                    <JoiningDatepicker className='performance-date' onChange={(e) =>{setReviewDate(e.target.value)}}/>
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