import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
const { Title } = Typography;

function PerformanceApraisalForm() {
  const [form] = Form.useForm();
  const [name, setName] = useState();
  const [manager, setManager] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState();
  const [review_date, setReviewDate] = useState();
const [responseData , setResponseData] = useState("");

  const[messageApi , contextHolder] = message.useMessage();

  const localEmail = localStorage.getItem('email');
  console.log(localEmail,"4444444444444444444444");

  const managerData = [
    "Select Manager",
    "Arun Karthikeyan",
    "Arun P",
    "Raj Manikam",
  ];
  const designationData = [
    "Select Designation",
    "Associate Trainee",
    "Software Engineer",
    "Software Test Engineer",
  ];
  const departmentData = [
    "Select Department",
    "Development",
    "Marketing",
    "Testing",
    "UI/UX Desgin",
  ];

  const handleSubmit = (e) => {
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
  };
  const payload = {
    username: name,
    Manager_name: manager,
    Designation: designation,
    Department: department,
    Joining_date: date,
    Review_period: review_date,
  };

  const onFinish = (values) => {
    console.log(values);
    axios
      .put(
        "https://demo.emeetify.com:81/appraisel/users/FormDetails?email="+localEmail,
        payload
      )
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });  
  };
  console.log(responseData.status,"+++++++++++++++++++++++++++++++++++++++");

//   console.log(payload);
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed", errorInfo);
  };

  const handleChange = (e) => {
    setManager(e);
  };
  const handleDesignation = (e) => {
    setDesignation(e);
  };
  const handleDepartment = (e) => {
    setDepartment(e);
  };
  const handleJoiningDate=(e)=>{
    // console.log("++++++++++++++++",e.$d)
    setDate(e);
  }
const success =() =>{
    if(responseData.status === true ){
        messageApi.open({
            type:'success',
            content:'Form Submitted Successfully'
        }) 
        }else{
            messageApi.open({
                type:'error',
                content:'Please Enter All the Details'
            })
      }
}

  return (
    <div>
      <Card
        className="form-card"
        title={
          <Title style={{ fontSize: "20px" }}>Performance Appraisal Form</Title>
        }
      >
        {contextHolder}
        <Form
          form={form}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          colon={false}
        >
          <Row className="performance-form-row-one">
            <Col span={12}>
              <Form.Item
                label="Name of Employee"
                name={"name"}
                className="label1"
                rules={[{ required: true, message: "please enter Your name" }]}
                hasFeedback
              >
                <Input
                  className="performance-input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="label2"
                label="Manager Name"
                name={"manager"}
                rules={[
                  { required: true, message: "please select the manager" },
                ]}
              >
                <Select  className="performance-input"
                  defaultValue={managerData[0]}
                  style={{
                    width: 250,
                    marginLeft: "20px",
                  }}
                  value={manager}
                  onChange={handleChange}
                  options={managerData.map((selectData) => ({
                    label: selectData,
                    value: selectData,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="performance-form-row-two">
            <Col span={12}>
              <Form.Item 
                className="label3"
                label="Designation"
                name={"designation"}
                rules={[
                  { required: true, message: "please enter Your designation" },
                ]}
              >
                <Select  className="performance-input"
                  defaultValue={designationData[0]}
                  style={{
                    width: 250,
                    marginLeft: 65,
                  }}
                  value={designation}
                  onChange={handleDesignation}
                  options={designationData.map((selectData) => ({
                    label: selectData,
                    value: selectData,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="label4"
                label="Department"
                name={"department"}
                rules={[
                  { required: true, message: "please enter your department" },
                ]}
              >
               <Select
                  defaultValue={departmentData[0]}
                  style={{
                    width: 250,
                    marginLeft: 43,
                  }}
                  value={department}
                  onChange={handleDepartment}
                  options={departmentData.map((selectData) => ({
                    label: selectData,
                    value: selectData,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="performance-form-row-three">
            <Col span={12}>
              <Form.Item
                className="joiningdate-label"
                label="Joining Date"
                name={"date"}
                rules={[
                  { required: true, message: "please enter your joining date" },
                ]}
                hasFeedback
              >
                <DatePicker
                  className="performance-joiningdate"
                  value={date}
                  onChange={handleJoiningDate}
                />

              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Review Period" className="review-period">
                {/* <JoiningDatepicker
                  className="performance-date"
                  onChange={(e) => {
                    setReviewDate(e.target.value);
                  }}
                /> */}
                <Input defaultValue={"2022-2023"} onChange={(e,defaultValue)=>{setReviewDate(defaultValue("2022-2023"))}} className="performance-date"/>
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item>
             <Button htmlType="submit" type='primary' className='performance-btn' onClick={handleSubmit}
            >Submit</Button>
            </Form.Item> */}

          <Button
            type="primary"
            htmlType="submit"
            className="performance-btn"
            onClick={success}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default PerformanceApraisalForm;
