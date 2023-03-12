import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import ScoringTable from "../components/ScoringTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import TextArea from "antd/es/input/TextArea";
import { ContactsOutlined } from "@ant-design/icons";
import Profile from "../components/Profile";
import download from '../download.png'
import SearchDetails from "../components/SearchDetails";
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


const error = {
  self_rating: {
    self_rating_error:true ,
    valid: "please select ratings"
  },
  justify_comment: {
    justify_comment_error:true,
    valid: "please select ratings"
  },
}

const Home = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [detail, setDetail] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [rank, setRank] = useState();
  const [selfAspiration, setSelfAspiration] = useState();
  const [leadFeedback, setLeadFeedback] = useState();
  const [empSelfRating, setEmpSelfRating] = useState();
  const [managerAvg, setManagerAvg] = useState();
  /* performance apraisal form  */
  const [name, setName] = useState();
  const [manager, setManager] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState();
  const [review_date, setReviewDate] = useState();
  const [responseData, setResponseData] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [avg, setAvg] = useState(0);
  const [formData, setFormData] = useState();
  const [roles, setRoles] = useState();
  const [toggle, setToggle] = useState(false);

  const [btnTogle, setBtnTogle] = useState(false);
  const [windowsOptions, setWindowsOptions] = useState("")
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

  const [errorData , setErrorData] =useState();
  const [indexValue, setIndexValue] = useState(0);

  const [avgTotal , setAvgTotal] = useState();

  /* Home header starts here */
  const [search , setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchData , setSearchData] = useState();
  const { Search } = Input;
  const onSearch = (search) => setSearchData(search);
  const mailId = localStorage.getItem("email");

  /* Home header starts here */
// console.log(searchData);

  const managerData = [
    "Select Manager",
    "Rajamanickam R",
    "Ramesh Babu E",
    "Santhana Gopal S",
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

  const roleIdData = [
    {
      roleId: 1,
      roles: 'Manager'
    },
    {
      roleId: 2,
      roles: 'Employee'
    },

  ]

  const payload = {
    username: name,
    manager_name: manager,
    role_id: roles,
    designation: designation,
    department: department,
    joining_date: date,
    review_period: "2022-23",
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
  const handleJoiningDate = (e) => {
    setDate(e);
  };
  const handleRoleChange = (e) => {
    setRoles(e)
  }

  const localEmail = localStorage.getItem("email");
  const consolidatedData = 
    {
      self_aspirations: selfAspiration,
      manager_feedback: leadFeedback,
      employee_self_rating: empSelfRating,
      manager_consolidated_rating: managerAvg,
    };
  const initialData = [
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      t_id: "",
      email: localEmail,
      self_rating: 0,
      self_comment: "",
    },
    {
      consolidatedData
    }
    

  ];

  const [userData, setUserData] = useState(initialData);

  const RankingData = ["Select Rating", "1", "2", "3", "4", "5"];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);


  useEffect(() => {

  }, [userData])

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => 
      {
        setDetail(response.data.data);
        var getData =[]
        for(let i=0;i<response.data.data.length;i++){
          // response.data.data[i].error = {
          //   self_rating: {
          //     self_rating_error:false ,
          //     valid: "please select ratings"
          //   },
          //   justify_comment: {
          //     justify_comment_error:false ,
          //     valid: "please select ratings"
          //   },
          // };
          //   console.log("for loop working ");
          getData.push(error)
        }
        setErrorData(getData);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const empDetails = () => {
    // console.log("payload", payload)
    axios
      .put(
        "https://demo.emeetify.com:81/appraisel/users/FormDetails?email="+
        localEmail,
        payload
      )
      .then((response) => {
        setFormData(response.data);
        // console.log(response.data,"111111");
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  
  const onFinish = (formData) => {
    if (responseData.status !== true) {
      messageApi.open({
        type: "error",
        content: "please enter all the details",
      });
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Details Submitted Successfully",
    });
  };

  const handleSubmit = () => {
    empDetails();
    axios
      .post(
        "https://demo.emeetify.com:81/appraisel/users/AddComment?email="+
        localEmail,
        initialData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
      if(formData.status !== false){
          success();
      }else{
        console.log("erorrrrrrr");
      }
  }
  
  const onFinishFailed = (errorInfo) => { };

  const userName = localStorage.getItem("displayName");
  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/appraisalWindow")
      .then((response) =>
        setWindowsOptions(response.data.data),
        
      )
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  // const handleManagerButton = () =>{
  //   console.log("manager button working");
  //   setIs_appraisal_open_for_employee(current => !current);
  //   setIs_appraisal_window_open(current => !current);

  // }

  function calAvg() {
    var total = 0;
    var count = 0;
    userData.forEach(function (item, index) {
      
      var a = parseInt(total);
      var b = parseInt(item?.self_rating);

      console.log(a,"total check");
      console.log(b,"self Rating check");

      total=parseInt(a)+parseInt(b);
      setAvg(total);
      count++;
    });
    let d = parseInt(total) / count ;
    // let average = d.toFixed(2); 
    setAvg(d);
  }
  // console.log(avg,"avggggggg");
 useEffect(()=>{
    },[errorData])

  useEffect(()=>{
  },[indexValue])
 
  useEffect( () => {
    axios.get("https://demo.emeetify.com:81/appraisel/users/userNames").
    then((response) => {setSearch(response.data.data ,"111111111")}).
    catch((e)=>{console.log(e ,"error message")})
},[]);
// console.log(search.data[0].user_id,"11111111");

const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
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
               <Col span={3}>
                {
                    mailId ==="admin@gmail.com" ?
                      <>
                      <div style={{marginLeft:'30px'}}>
                      <Button type="primary" onClick={showModal} style={{}}> 
                         Employee Details
                       </Button>
                      </div>
                       <Modal title="Employee Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                        <SearchDetails />
                       {/* <Search autoComplete style={{ width: '200px'}} placeholder="Employee Name" onSearch={onSearch} enterButton />  */}
                       </Modal>
                      </>
                   
                    :
                    console.log("")
                }
               </Col>
                
               <Col span={14}>
                    <h1 style={{ textAlign: 'center', marginTop: '0px',marginLeft:'-30px'  }}>Performance Appraisal Form</h1>
               </Col>

                <Col span={4}>< Profile /></Col>
            </Row>
        </div>
          </Header>

          { 
            windowsOptions.is_appraisal_window_open === true && windowsOptions.is_appraisal_open_for_employee === true ?
            <Content style={contentStyle} className="homeContent">
             <Card style={{ height: "auto", width: "1100px", margin: "auto" }}>
              <Form
                form={form}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                scrollToFirstError={true}
                autoComplete="off"
              >
                <div>
                  <Card className="form-card" title="Employee Details">
                    {contextHolder}
                    <Row className="performance-form-row-one">
                      <Col span={12}>
                        <Form.Item
                          label="Name of Employee"
                          name={"name"}
                          className="label1"
                          rules={[
                            {
                              required: true,
                              message: "Please enter name of employee",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input
                            defaultValue={userName}
                            className="performance-input"
                            value={name}
                            onChange={(e, defaultValue) => {
                              setName(e.target.value || defaultValue);
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
                        >
                          <Select
                            className="performance-input-manager"
                            defaultValue={managerData[0]}
                            style={{
                              width: 250,
                              // marginLeft: "20px",
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
                          name={"roleId"}
                          className="label5"
                          label="Role Id"
                          rules={[
                            {
                              required: true,
                              message: "Please select the role Id",
                            },
                          ]}
                        >
                          <Select
                            className="performance-input-roleId"
                            defaultValue={roleIdData[0].roles}
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
                        >
                          <Select
                            className="performance-input-designation"
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
                        >
                          <Select
                            className="performance-input-department"
                            defaultValue={departmentData[0]}
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
                            className="performance-joiningdate"
                            value={date}
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
                <ScoringTable />
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
                  {detail !== undefined &&
                    detail.map((d, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "10px",
                            }}
                          >
                            <Row>
                              <Col style={{ float: "left", fontSize: "16px" }}>
                                <h1 key={d.t_id}>{d.kra_id} : </h1>
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                style={{
                                  float: "left",
                                  fontSize: "14px",
                                  marginTop: "6px",
                                  marginLeft: "4px",
                                  fontWeight: "none",
                                }}
                              >
                                <h1 key={d.t_id}> {d.kra}</h1>
                              </Col>
                            </Row>
                          </div>
                          <div>
                            <Card
                              style={{
                                height: "75px",
                                borderColor: "blue",
                                textAlign: "left",
                                marginTop: "0px",
                                marginLeft: "10px",
                                marginRight: "20px",
                              }}
                            >
                              <p
                                style={{ fontSize: "17px", marginTop: "-10px" }}
                                key={d.t_id}
                              >
                                {d.measures}
                              </p>
                            </Card>
                          </div>
                          <div>
                            <Row style={{ marginTop: "20px" }}>
                              <Col span={12}>
                                <Form.Item
                                  style={{ marginLeft: "100px" }}
                                  name="selfRating"
                                  rules={[
                                    {
                                      required: true,
                                      message: "please give ratings",
                                    },
                                  ]}
                                  label={
                                    <label className="self-rating">
                                      Self Rating
                                    </label>
                                  }
                                >
                                  <div
                                    className="self-rating-input"
                                    key={d.t_id}
                                  >
                                    <Select
                                      className="performance-input-rating"
                                      defaultValue={RankingData[0]}
                                      style={{
                                        width: 150,
                                        marginLeft: "20px",
                                      }}
                                      
                                      onChange={(e) => {
                                        userData[index].self_rating = e
                                        console.log("changed",userData);
                                        setUserData(userData);
                                        calAvg();
                                      }}
                                      options={RankingData.map(
                                        (selectData) => ({
                                          label: selectData,
                                          value: selectData,
                                        })
                                      )}
                                    />
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label={
                                    <label className="self-comment">
                                      Justify Your Comment
                                    </label>
                                  }
                                  name="selfComment"
                                  rules={[
                                    {
                                      required: true,
                                      message: "please give comments",
                                    },
                                  ]}
                                  hasFeedback
                                >
                                  <div
                                    className="self-comment-input"
                                    key={d.t_id}
                                  >
                                    <TextArea
                                      onChange={(e) => {
                                        initialData[index].t_id = d.t_id;
                                        initialData[index].self_comment = e.target.value;
                                      }}
                                      rows={4}
                                      style={{ width: "400px", marginTop: "" }}
                                    />
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                          {
                            mailId === "admin@gmail.com" ?
                            
                            <Row id="manager_id">
                            <Col span={12}>
                              <Form.Item 
                                style={{ marginLeft: "110px" }}
                                label={
                                  <label className="manager-rating">
                                    Manager Rating
                                  </label>
                                }
                                name="managerRating"
                                rules={[
                                  {
                                    required: true,
                                    message: "please give comments",
                                  },
                                ]}
                                hasFeedback
                                required
                              >
                                <div className="manager-rating-input">
                                  <Select
                                    rules={[
                                      {
                                        required: true,
                                        message: "please give ratings",
                                      },
                                    ]}
                                    hasFeedback
                                    className="performance-input"
                                    defaultValue={RankingData[0]}
                                    style={{
                                      width: 150,
                                      marginLeft: "20px",
                                    }}
                                    value={rank}
                                    onChange={(e) => {
                                      initialData[index].manager_rating = e;
                                    }}
                                    options={RankingData.map(
                                      (selectData) => ({
                                        label: selectData,
                                        value: selectData,
                                      })
                                    )}
                                  />
                                </div>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label={
                                  <label className="manager-comment">
                                    Manager Comment
                                  </label>
                                }
                                name="managerComment"
                              rules={[
                                {
                                  required: true,
                                  message: "please give comments",
                                },
                              ]}
                              hasFeedback
                              required
                              >
                                <div
                                  className="manager-comment-input"
                                key={d.t_id}
                                >
                                  <TextArea
                                    onChange={(e) => {
                                      initialData[index].t_id = d.t_id;
                                      initialData[index].manager_comment =
                                        e.target.value;
                                    }}
                                    rows={4}
                                    style={{ width: "400px" }}
                                  />
                                </div>
                              </Form.Item>
                            </Col>
                          </Row> : console.log("")
                          }
                            
                          </div>
                        </>
                      );
                    })}
                    </div>

                {/* technical aspects ends here */}

                <Divider
                  style={{
                    marginTop: "60px",
                    backgroundColor: "violet",
                    height: "5px",
                  }}
                />
                <Row>
                  <Col span={12}>
                    <Form.Item readOnly
                      label={
                        <label style={{ fontSize: "18px", marginLeft: "30px" }}>
                          Employee Self Rating
                        </label>
                      }
                    >
                      <Card style={{
                        height: '50px', width: '100px', marginTop: "50px",
                        marginLeft: "-130px"
                      }}>
                        <Typography style={{
                          textAlign: 'center', margin: 'auto',
                          marginTop: '-20px', fontSize: '24px'
                        }}>{avg}</Typography>
                      </Card>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginLeft: "15px" }}
                      label={
                        <label className="self-aspiration">
                          Self Aspiration
                        </label>
                      }
                      name="selfAspiration"
                      rules={[
                        {
                          required: true,
                          message: "please give comments",
                        },
                      ]}
                      hasFeedback
                      required
                    >
                      <div>
                        <TextArea
                          style={{ marginTop: "40px", marginLeft: "-250px" }}
                          className="self-aspiration-input"
                          onChange={(e) => {
                            setSelfAspiration(e.target.value);
                          }}
                          rows={4}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                {
                  mailId === "admin@gmail.com" ?

                  <Row style={{ marginTop: "30px" }}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <label style={{ fontSize: "18px", marginLeft: "35px" }}>
                          Manager's Consolidated Rating
                        </label>
                      }
                    >
                      <Input
                        rows={4}
                        style={{
                          width: "300px",
                          marginTop: "50px",
                          marginLeft: "-450px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <label className="teamlead-feedback">
                          Manager's Feedback
                        </label>
                      }
                      name="managerFeedback"
                    >
                      <div>
                        <TextArea
                          style={{
                            marginTop: "40px",
                            marginLeft: "-350px",
                            width: "400px",
                          }}
                          onChange={(e) => {
                            setLeadFeedback(e.target.value);
                          }}
                          rows={4}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                  : console.log("")
                }
               

                <Divider
                  style={{
                    marginTop: "40px",
                    backgroundColor: "lightBlue",
                    height: "3px",
                  }}
                />

                <Button
                  htmlType="submit"
                  type="primary"
                  style={{
                    backgroundColor: "green",
                    height: "40px",
                    width: "100px",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Card>
          </Content>
            :
            <div>
              <Card style={{marginTop:"80px",width:'1000px',margin:'auto',height:'80vh',position:'fixed',marginLeft:'260px'}}>
               <Typography style={{textAlign:'center',marginTop:'30vh',fontSize:'24px',color:'grey'}}>Appraisal window currently Closed</Typography>
              </Card>
            </div>
          }
          
        </Layout> 
        
        


      </Space>
    </>
  );
};

export default Home;