import { Col, Divider, Layout, message, Row, Space } from "antd";
import ScoringTable from "../components/ScoringTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Profile from "../components/Profile";
import download from "../download.png";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const { Header, Content } = Layout;
const layoutStyle = {
  height: "100vh",
};
const headerStyle = {
  textAlign: "left",
  color: "black",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
  position: "fixed",
  top: "0px",
  width: "100vw",
  zIndex: 1,
};

const contentStyle = {
  textAlign: "center",
  marginTop: "50px",
  backgroundColor: "#f5f5f5",
  minHeight: "auto",
};
const initialState = {
    username: "",
    manager_name: "",
    role_id: "",
    designation: "",
    department: "",
    review_period: "2022-23",
}
const HomeNew = (props) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  /* performance apraisal form  */
  const [name, setName] = useState();
  const [manager, setManager] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState();
  const [review_date, setReviewDate] = useState();
  const [roles, setRoles] = useState();
  const [windowsOptions, setWindowsOptions] = useState("");
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

  const [avgValue, setAvgValue] = useState();
  // const [search, setSearch] = useState();

  /*<----Search Details starts here */
  const [users, setUsers] = useState([]);
  const [empData, setEmpData] = useState();

  /*<------Search deatils function Ends here  */
  /*<------Employee deatils fetching Ends here  */

  /*   new Home page  with validation*/
  const [questions, setQuestions] = useState();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

const [editForm , setEditForm] = useState(initialState);

  /*   new Home page  with validation*/

  const option = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];



  const roleIdData = [
    {
      roleId: 1,
      roles: "Manager",
    },
    {
      roleId: 2,
      roles: "Employee",
    },
  ];

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  let dd = users[0]?.joining_date;

  let textt = formatDate(dd);

//   const payload = {
//     username: name || users[0]?.username,
//     manager_name: manager || users[0]?.manager_name,
//     role_id: 2,
//     designation: designation || users[0]?.designation,
//     department: department || users[0]?.department,
//     joining_date: date,
//     review_period: "2022-23",
//   };
  const handleManager = (e) => {
    setManager(e);
  };

  const handleDesignation = (e) => {
    setDesignation(e);
  };
  const handleDepartment = (e) => {
    setDepartment(e);
  };
  const handleJoiningDate = (e, date) => {
    // console.log((typeof(date)) ,"lllllll")

    // console.log(typeof(e),"lllllll")
    setDate(e);
  };

  const handleRoleChange = (e) => {
    setRoles(e);
  };
  const localEmail = localStorage.getItem("email");

  const role_id = localStorage.getItem("role_id");
  useEffect(() => {
    if (!localStorage.getItem("token") && role_id !== "1") {
      navigate("/");
    }
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const userName = localStorage.getItem("displayName");
  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/appraisalWindow")
      .then((response) => setWindowsOptions(response.data.data))
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => {
        console.log(response, "??????");
        setQuestions(response?.data?.data);
      })
      .catch((e) => {
        console.log(e, "errorMessage");
      });
  }, []);

  const handleChange = (event) => {
    console.log("-----------");
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const errors = { ...formErrors };

    if (!fieldValue) {
      errors[fieldName] = "This field is required.";
    } else {
      errors[fieldName] = null;
    }

    setFormData({ ...formData, [fieldName]: fieldValue });
    setFormErrors(errors);
  };
  const handleFormChanges =(e) =>{
    let {name, value} = e.target;
    if(name === "username"){
        if(!value && value === ""){
            formErrors.username = "Required"
        }
        else{
            formErrors.username = ""
        }
    }
    else if(name === "manager_name"){
        if(!value && value === ""){
            formErrors.manager_name = "Required"
        }
        else{
            formErrors.manager_name = ""
        }
    }
    else if(name === "role_id"){
        if(!value && value === ""){
            formErrors.role_id= "Required"
        }
        else{
            formErrors.role_id = ""
        }
    }
    else if(name === "department"){
        if(!value && value === ""){
            formErrors.department = "Required"
        }
        else{
            formErrors.department = ""
        }
    }
    else if(name === "joining_date"){
        if(!value && value === ""){
            formErrors.joining_date = "Required"
        }
        else{
            formErrors.joining_date = ""
        }
    }
    const updateValue = {...editForm}
    updateValue[name]=value;
    setEditForm(updateValue);
  }

// console.log(editForm,"/////////");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(editForm,"/////");
    console.log(date,".....");
    //form validation with api integration
    const data = {
        username: editForm.username,
        manager_name: editForm.manager_name,
        role_id: editForm.role_id,
        designation: editForm.designation,
        department: editForm.department,
        joining_date:date ,
        review_period: "2022-23",
    }
    console.log("????",data.manager_name ==="" ? "empty": "not empty")
    if(data.username ==="" || data.username === undefined){
        console.log("1");
        if(!data.username && data.username === ""){
            console.log("2");
            setFormErrors({...formErrors , username:"Required"});
            return false
        }else{
            console.log("3");
            setFormErrors({...formErrors , username:""});
        }
        }

        
    //questions validation with api integration
    let errors = {};
    const formValues = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const field1Value = formData[`${question.t_id}-field1`];
      const field2Value = formData[`${question.t_id}-field2`];

      // Validate field 1
      if (!field1Value) {
        errors[`${question.t_id}-field1`] = "Rating is required";
      }

      // Validate field 2
      if (!field2Value) {
        errors[`${question.t_id}-field2`] = "Comment is required";
      }

      // Add form value to array
      if (field1Value && field2Value) {
        formValues.push({
          t_id: question.t_id,
          self_rating: field1Value,
          justify_comment: field2Value,
        });
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(JSON.stringify(formValues));
    }
  };
  

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        {contextHolder}
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <div>
              <Row>
                <Col span={3}>
                  <img src={download} className="skein-logo" alt="skeinlogo" />
                </Col>
                <Col span={3}></Col>

                <Col span={14}>
                  <h1
                    style={{
                      textAlign: "center",
                      marginTop: "0px",
                      marginLeft: "-100px",
                    }}
                  >
                    Performance Appraisal Form
                  </h1>
                </Col>

                <Col span={4}>
                  <Profile />
                </Col>
              </Row>
            </div>
          </Header>

          {windowsOptions.is_appraisal_window_open === true &&
          windowsOptions.is_appraisal_open_for_employee === true ? (
            <Content style={contentStyle} className="homeContent">
              <Card style={{ height: "auto", width: "1100px", margin: "auto" }}>
                <Card style={{ marginTop: "40px" }} >
                    <div style={{marginBottom:'40px'}}>
                         <h1>Employee Details</h1>
                    </div>
                    <Divider />
                   
                  <Row>
                    <Col span={12}>
                        <FormLabel sx={{lineHeight:0.1 ,marginLeft:5}} className="name">Name of Employee</FormLabel>
                      <TextField sx={{height:0.7 , minWidth:260,marginLeft: 3}}
                      error={formErrors.username === "Required" ? true : false}
                      helperText= {formErrors.username}
                      variant="outlined" 
                      name="username"
                      value={editForm.username}
                      onChange={handleFormChanges}
                      />
                    </Col>

                    <Col span={12}>
                     <FormLabel sx={{marginLeft:5}}>Manager Name</FormLabel>
                        <Select sx={{height:0.7 , minWidth:280,marginLeft: 3,marginRight:2}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          name="manager_name"
                          value={editForm.manager_name}
                          onChange={handleFormChanges}
                          error={formErrors.manager_name === "Required" ? true : false}

                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.manager_name}</FormHelperText>
                    </Col>
                  </Row>

                  <Row style={{marginTop:'50px'}}>
                    <Col span={12}>
                      <FormLabel sx={{marginLeft:5}}>Role</FormLabel>
                      <Select sx={{height:0.7 , minWidth:290,marginLeft: 16}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="role_id"
                          value={editForm.role_id}
                          onChange={handleFormChanges}
                          error={formErrors.role_id === "Required" ? true : false}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.role_id}</FormHelperText>
                    </Col>
                    <Col span={12}>
                     <FormLabel sx={{marginLeft:5}}>Designation</FormLabel>
                        <Select sx={{height:0.7 , minWidth:280,marginLeft: 6,marginRight:2}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="designation"
                          value={editForm.designation}
                          onChange={handleFormChanges}
                          error={formErrors.designation === "Required" ? true : false}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.designation}</FormHelperText>
                    </Col>
                  </Row>

                  <Row style={{marginTop:'50px'}}>
                    <Col span={12}>
                      <FormLabel sx={{marginLeft:5}}>Department</FormLabel>
                      <Select sx={{height:0.7 , minWidth:280,marginLeft: 3,marginRight:2}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="department"
                          value={editForm.department}
                          onChange={handleFormChanges}
                          error={formErrors.department === "Required" ? true : false}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.department}</FormHelperText>
                    </Col>
                    <Col span={12}>
                     <FormLabel sx={{lineHeight:3.2,marginLeft:5}}>Joining Date</FormLabel>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker  sx={{height:0.7 , minWidth:280,marginLeft: 3,marginRight:2}}
                            name="joining_date"
                            value={date}
                            onChange={ (newValue) =>{
                                setDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    </Col>
                  </Row>

                  <Row style={{marginTop:'50px',marginBottom:'50px'}}>
                    <Col span={12}>
                      <FormLabel sx={{lineHeight:3.2}}>Review Period</FormLabel>
                      <TextField variant="outlined" 
                        name="review_period"
                        value={editForm.review_period}
                      />
                    </Col>

                  </Row>
                </Card>
                {/* <div>
                    <Card className="form-card" title="Employee Details">
                      {contextHolder}
                      <Row className="performance-form-row-one">
                        <Col span={12}>
                          <Form.Item
                            label="Name of Employee"
                            name={
                              "name" || users !== undefined
                                ? users[0]?.username
                                : ""
                            }
                            className="label1"
                            rules={[
                              {
                                required: true,
                                message: "Please enter name of employee",
                              },
                            ]}
                            hasFeedback
                            initialValue={
                              users !== undefined
                                ? users[0]?.username
                                : userName
                            }
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
                              {
                                required: true,
                                message: "Please select the manager",
                              },
                            ]}
                            initialValue={
                              users !== undefined
                                ? users[0]?.manager_name
                                : "Select Manager"
                            }
                          >
                            <Select
                              className="performance-input-manager"
                              placeholder="Select Manager"
                              style={{
                                width: 250,
                                // marginLeft: "20px",
                              }}
                              value={manager}
                              onChange={handleManager}
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
                            name={"roleId"}
                            className="label5"
                            label="Role"
                            rules={[
                              {
                                required: true,
                                message: "Please select the role",
                              },
                            ]}
                            initialValue={
                              users !== undefined
                                ? users[0]?.role_id
                                : "Enter Role Id"
                            }
                          >
                            <Select
                              className="performance-input-roleId"
                              placeholder="Select Role"
                              style={{
                                width: 250,
                                marginLeft: "10px",
                              }}
                              value={roleIdData.roleId}
                              onChange={handleRoleChange}
                              options={roleIdData.map((selectData) => ({
                                label: selectData.roles,
                                value: selectData.roleId,
                              }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            className="label3"
                            label="Designation"
                            name={"designation"}
                            rules={[
                              {
                                required: true,
                                message: "Please enter Your designation",
                              },
                            ]}
                            initialValue={
                              users !== undefined
                                ? users[0]?.designation
                                : "Select Designation"
                            }
                          >
                            <Select
                              className="performance-input-designation"
                              placeholder="Select Designation"
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
                      </Row>

                      <Row className="performance-form-row-two">
                        <Col span={12}>
                          <Form.Item
                            className="label4"
                            label="Department"
                            name={"department"}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your department",
                              },
                            ]}
                            initialValue={
                              users !== undefined
                                ? users[0]?.department
                                : "Select Department"
                            }
                          >
                            <Select
                              className="performance-input-department"
                              placeholder="Select Department"
                              value={department}
                              onChange={handleDepartment}
                              options={departmentData.map((selectData) => ({
                                label: selectData,
                                value: selectData,
                              }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            className="joiningdate-label"
                            label="Joining Date"
                            name={"date"}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your joining date",
                              },
                            ]}
                            hasFeedback
                          >
                            <DatePicker
                              initialValue={textt}
                              className="performance-joiningdate"
                              value={date}
                              format={"DD-MM-YYYY"}
                              onChange={handleJoiningDate}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row className="performance-form-row-three">
                        <Col span={12}>
                          <Form.Item
                            label="Review Period"
                            className="review-period"
                          >
                            <Input
                              defaultValue={"2022-23"}
                              readOnly
                              onChange={(e, defaultValue) => {
                                setReviewDate(defaultValue("2022-23"));
                              }}
                              className="performance-date"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                  <ScoringTable /> */}
                <Divider
                  style={{
                    marginTop: "60px",
                    backgroundColor: "green",
                    height: "5px",
                  }}
                />

                {/* Ratings and comment section Starts here */}

                <Typography
                  style={{
                    marginTop: "80px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  KRA-Technical Aspects
                </Typography>

                <div>
                  {/* <form onSubmit={handleSubmit}> */}
                  {Array.isArray(questions) &&
                    questions?.map((question) => (
                      <div key={question.t_id}>
                        {/* <h2 style={{float:'left'}}>{question.kra}</h2> */}

                        <Row style={{ marginTop: "80px" }}>
                          <Col>
                            <h2 style={{ float: "left", marginTop: "-40px" }}>
                              {question.kra}
                            </h2>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                          <Col>
                            <h3
                              style={{
                                border: "1px solid black",
                                fontSize: "18px",
                                float: "left",
                              }}
                            >
                              {question.measures}
                            </h3>
                          </Col>
                        </Row>

                        <Row
                          style={{ marginBottom: "150px", marginTop: "20px" }}
                        >
                          <Col span={12}>
                            <Select
                              style={{ width: "150px" }}
                              label="SelfRating"
                              value={formData[`${question.t_id}-field1`] || ""}
                              name={`${question.t_id}-field1`}
                              onChange={handleChange}
                              error={
                                formErrors[`${question.t_id}-field1`]
                                  ? true
                                  : false
                              }
                            >
                              <MenuItem value="" disabled>
                                PLease select the option
                              </MenuItem>
                              {Array.isArray(option)
                                ? option.map((item) => (
                                    <MenuItem value={item?.value}>
                                      {item?.value}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>

                            <FormHelperText
                              style={{ color: "#d32f2f", marginLeft: "210px" }}
                            >
                              {formErrors[`${question.t_id}-field1`]}
                            </FormHelperText>
                          </Col>
                          <Col span={12}>
                            <TextField
                              style={{ height: "70px", width: "320px" }}
                              name={`${question.t_id}-field2`}
                              label="Justify Your Comment"
                              value={formData[`${question.t_id}-field2`] || ""}
                              onChange={handleChange}
                              // required={true}
                              error={
                                formErrors[`${question.t_id}-field2`]
                                  ? true
                                  : false
                              }
                              helperText={
                                formErrors[`${question.t_id}-field2`] || ""
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    ))}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  {/* </form> */}
                </div>

                {/* <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      backgroundColor: "green",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    Submit
                  </Button> */}
              </Card>
            </Content>
          ) : (
            ""
          )}
        </Layout>
      </Space>
    </>
  );
};

export default HomeNew;
