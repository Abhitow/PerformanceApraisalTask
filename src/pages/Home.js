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
  Row,
  Select,
  Space,
} from "antd";
import ScoringTable from "../components/ScoringTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import TextArea from "antd/es/input/TextArea";
import Profile from "../components/Profile";
import download from "../download.png";

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
    self_rating_error: true,
    valid: "please select ratings",
  },
  justify_comment: {
    justify_comment_error: true,
    valid: "please select ratings",
  },
};

const Home = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [detail, setDetail] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [rank, setRank] = useState();
  const [empSelfRating, setEmpSelfRating] = useState();
  /* performance apraisal form  */
  const [name, setName] = useState();
  const [manager, setManager] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState();
  const [review_date, setReviewDate] = useState();
  const [responseData, setResponseData] = useState("");
  const [avg, setAvg] = useState(0);
  const [formData, setFormData] = useState();
  const [roles, setRoles] = useState();
  const [windowsOptions, setWindowsOptions] = useState("");
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

  const [errorData, setErrorData] = useState();
  const [indexValue, setIndexValue] = useState(0);
  const [avgValue, setAvgValue] = useState();
  // const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mailId = localStorage.getItem("email");
  const role = localStorage.getItem("role_id");
  const [commentData, setCommentData] = useState();


  /*<----Search Details starts here */
  const [users, setUsers] = useState([]);
  const [text, setText] = useState();
  const [comment, setComment] = useState([]);
  const [empData, setEmpData] = useState();
  const selectMail = localStorage.getItem("selectMail");

  /*<------Search deatils function Ends here  */

const [formattedDate , setFormattedDate] = useState();


  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userNames?email="+localEmail
      );
      let a =[]
      setUsers(response.data.data)
     console.log("$$$--->",response.data.data[0]?.comments)
      let userDetails = response.data.data;
      for (let i = 0; i < userDetails?.length; i++) {
        let comments = userDetails[i].comments;
        for (let j = 0; j < comments.length; j++) {
          const element = comments[j];
          // setComment(element);
          a.push(element)
        }
      }
    //  console.log(a,"///////");
    setComment(a);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://demo.emeetify.com:81/appraisel/users/Consolidate?email=" +selectMail
      )
      .then((response) => {
        setAvgValue(response.data.data);
      })
      .catch((e) => console.log(e, "error Message"));
  }, [selectMail]);

  /*<------Employee deatils fetching Ends here  */

  const managerData = [
    "Rajamanickam R",
    "Ramesh Babu E",
    "Santhana Gopal S",
  ];
  const designationData = [
    "Associate Trainee",
    "Software Engineer",
    "Software Test Engineer",
  ];
  const departmentData = [
    "Development",
    "Marketing",
    "Testing",
    "UI/UX Desgin",
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
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

let dd =  users[0]?.joining_date;

let textt = formatDate(dd);

  const payload = {
    username: name || users[0]?.username,
    manager_name: manager || users[0]?.manager_name,
    role_id: 2,
    designation: designation || users[0]?.designation,
    department: department ||  users[0]?.department,
    joining_date: date ,
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
  const handleJoiningDate = (e,date) => {
    // console.log((typeof(date)) ,"lllllll")
   
    // console.log(typeof(e),"lllllll")
    setDate(e);

  };


  const handleRoleChange = (e) => {
    setRoles(e);
  };
  const localEmail = localStorage.getItem("email");
  const initialData = {
    questions: [
      {
        t_id: 1,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
      {
        t_id: 2,
        email: localEmail,
        self_rating: 0,
        self_comment: "", 
      },
      {
        t_id: 3,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
      {
        t_id: 4,
        email: localEmail,
        self_rating: 0,
        self_comment: "", 
      },
      {
        t_id: 5,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
      {
        t_id: 6,
        email: localEmail,
        self_rating: 0,
        self_comment: "", 
      },
      {
        t_id: 7,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
      {
        t_id: 8,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
      {
        t_id: 9,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
      },
    ],
  };

 
  const [userData, setUserData] = useState(initialData);

  console.log(userData ,"??????");

  const RankingData = [ "1", "2", "3", "4", "5"];

  const role_id = localStorage.getItem("role_id");
  useEffect(() => {
    if (!localStorage.getItem("token") && role_id !== "1") {
      navigate("/");
    }
  }, []);

  useEffect(() => {}, [userData]);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => {
        setDetail(response.data.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, [text]);
  

  const empDetails = () => {
    axios
      .put(
        "https://demo.emeetify.com:81/appraisel/users/FormDetails?email=" +
          localEmail,
        payload
      )
      .then((response) => {
        setFormData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://demo.emeetify.com:81/appraisel/users/Consolidate?email=" + localEmail
      )
      .then((response) => {
        setAvgValue(response.data.data);
      })
      .catch((e) => console.log(e, "error Message"));   
  }, [text]);
// console.log(parseFloat(avgValue?.employee_self_rating).toFixed(2),"bbbbbbbb");

  const onFinish = (formData , index) => {
    // if (responseData.status === true && commentData.status === true) {
    //   messageApi.open({
    //     type: "error",
    //     content: "please enter all the details",
    //   });
    // } else {
    //   messageApi.open({
    //     type: "success",
    //     content: "Thank you Form Submitted Successfully",
    //   });
    // }
    // console.log( userData?.questions[0].self_rating ,"commnetssssss");
      if ( userData?.questions[0].self_rating !== 0 && 
           userData?.questions[0].self_rating !== "Select Rating" &&
           userData?.questions[1].self_rating !== 0 && 
           userData?.questions[1].self_rating !== "Select Rating" &&
           userData?.questions[2].self_rating !== 0 && 
           userData?.questions[2].self_rating !== "Select Rating" &&
           userData?.questions[3].self_rating !== 0 && 
           userData?.questions[3].self_rating !== "Select Rating" && 
           userData?.questions[4].self_rating !== 0 && 
           userData?.questions[4].self_rating !== "Select Rating" &&
           userData?.questions[5].self_rating !== 0 && 
           userData?.questions[5].self_rating !== "Select Rating" &&
           userData?.questions[6].self_rating !== 0 && 
           userData?.questions[6].self_rating !== "Select Rating" &&
           userData?.questions[7].self_rating !== 0 && 
           userData?.questions[7].self_rating !== "Select Rating" && 
           userData?.questions[8].self_rating !== 0 && 
           userData?.questions[8].self_rating !== "Select Rating") {
        messageApi.open({
          type: "success",
          content: "Thank you Form Submitted Successfully",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "please enter all the details",
        });
      
    }
  };

  const handleSubmit = () => {
    empDetails();
     axios
      .post(
        `https://demo.emeetify.com:81/appraisel/users/AddComment?email=${localEmail}&&type=employee`,userData.questions
      )
      .then((response) => {
        console.log(response.data);
        setCommentData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
      // if(formData.data.status === true){
      //   console.log("working guddddd");
      // }else{
      //   console.log("not wokringggggggg");
      // }
  };



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

  function calAvg() {
    var total = 0;
    var count = 0;
    userData.questions.map((i) => {
      if (i.self_rating !== undefined) {
        total = total + parseInt(i.self_rating);
        count++;
      }
      let getAvg = total / count;
      let Average = getAvg.toFixed(2);
      setAvg(Average);
    });
  }

  useEffect(() => {}, [errorData]);

  useEffect(() => {}, [indexValue]);

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
                    <img
                      src={download}
                      className="skein-logo"
                      alt="skeinlogo"
                    />
                  </Col>
                  <Col span={3}>
                   
                  </Col>

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
                <Card
                  style={{ height: "auto", width: "1100px", margin: "auto" }}
                >
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
                              name={"name" || users !== undefined ? users[0]?.username : "" }
                              className="label1"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter name of employee",
                                },
                              ]}
                              hasFeedback
                              initialValue={users !== undefined ? users[0]?.username : userName}
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
                              initialValue= {users !== undefined ?  users[0]?.manager_name : "Select Manager"}
                            >
                              <Select
                                className="performance-input-manager"
                                placeholder="Select Manager"
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
                              name={"roleId" }
                              className="label5"
                              label="Role"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select the role",
                                },
                              ]}
                              initialValue={users !== undefined ? users[0]?.role_id :"Enter Role Id"}
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
                              initialValue={users !== undefined ?  users[0]?.designation :"Select Designation"}
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
                              initialValue={users !== undefined ?  users[0]?.department : "Select Department"}
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
                                  <Col
                                    style={{ float: "left", fontSize: "16px" }}
                                  >
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
                                    style={{
                                      fontSize: "17px",
                                      marginTop: "-10px",
                                    }}
                                    key={d.t_id}
                                  >
                                    {d.measures}
                                  </p>
                                </Card>
                              </div>
                              <div>
                                {
                                  comment !== undefined && 
                                  comment.map( (b , index) => {
                                    if( d.t_id === b.t_id){
                                        return(
                                            <Row style={{ marginTop: "20px" }}>
                                  <Col span={12}>
                                    <Form.Item
                                      style={{ marginLeft: "100px" }}
                                      name="selfRating"
                                      label={
                                        <>
                                          <label
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                              marginTop: "5px",
                                              marginRight: "5px",
                                            }}
                                          >
                                            *
                                          </label>
                                          <label className="self-rating">
                                            Self Rating
                                          </label>
                                        </>
                                      }
                                      
                                    >
                                      <div
                                        className="self-rating-input"
                                        key={d.t_id}
                                        
                                      >
                                        <Select
                                        defaultValue={b?.self_rating}
                                        placeholder="Select Rating"
                                          className="performance-input-rating"
                                          style={{
                                            width: 150,
                                            marginLeft: "20px",
                                          }}
                                          onChange={(e, defaultValue) => {
                                            initialData.questions[
                                              index
                                            ].self_rating = e ;
                                            userData.questions[index][
                                              "self_rating"
                                            ] = e;

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
                                            initialData.questions[
                                              index
                                            ].self_comment = e.target.value;
                                            userData.questions[index][
                                              "self_comment"
                                            ] = e.target.value;
                                            
                                            setUserData(userData);
                                           
                                          }}
                                          rows={4}
                                          style={{
                                            width: "400px",
                                            marginTop: "",
                                          }}
                                        />
                                      </div>
                                    </Form.Item>
                                  </Col>
                                           </Row>
                                        )
                                    }
                                  })
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
                        <Form.Item
                          readOnly
                          label={
                            <label
                              style={{ fontSize: "18px", marginLeft: "100px" }}
                            >
                              Employee Self Rating
                            </label>
                          }
                        >
                          <Card
                            style={{
                              height: "50px",
                              width: "100px",
                              marginTop: "50px",
                              marginLeft: "-185px",
                            }}
                          >
                            <Typography
                              style={{
                                textAlign: "center",
                                margin: "auto",
                                marginTop: "-20px",
                                fontSize: "24px",
                              }}
                              onChange={(e) => {
                                setEmpSelfRating(avg);
                              }}
                            >
                              {avg}
                            </Typography>
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
                              style={{
                                marginTop: "40px",
                                marginLeft: "-250px",
                              }}
                              className="self-aspiration-input"
                              onChange={(e) => {
                                // userData.self_aspirations = e.target.value;
                                // setUserData(userData);
                              }}
                              rows={4}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* <------ here ends your code -----> */}

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
            ) : (
















              
              /*<-----Admin Code Starts Here ---> */
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
                    <Card className="form-card" title="Employee Details ">
                      {contextHolder}
  
                        <div style={{ marginTop: "10px", marginLeft: "100px" }}>
                          {/* <Typography style={{fontSize:'20px',marginLeft:'250px'}}>{searchDetails[0]?.username}</Typography> */}
                          <Row className="performance-form-row-one">
                            <Col span={12}>
                              <Form.Item
                                label="Name of Employee"
                                name={"name"}
                                className="adminLabel1"
                              >
                                <Card style={{height:'35px',width:'250px',marginLeft:'20px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {users !== undefined ? users[0]?.username : ""}

                                  </Typography>
                                </Card>
                               
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-label2"
                                label="Manager Name"
                                name={"manager"}
                              >
                               <Card style={{height:'35px',width:'250px',marginLeft:'20px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {users !== undefined ?  users[0]?.manager_name : ""}
                                  </Typography>
                                </Card>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row className="performance-form-row-two">
                            <Col span={12}>
                              <Form.Item
                                name={"roleId"}
                                className="admin-label5"
                                label="Role"
                              >
                                <Card style={{height:'35px',width:'250px',marginLeft:'95px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {users !== undefined ? users[0]?.role_id :""}
                                  </Typography>
                                </Card>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-label3"
                                label="Designation"
                                name={"designation"}
                              >
                               <Card style={{height:'35px',width:'250px',marginLeft:'35px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {users !== undefined ?  users[0]?.designation :""}
                                  </Typography>
                                </Card>
                              </Form.Item>
                            </Col>
                          </Row>
  
                          <Row className="performance-form-row-two">
                            <Col span={12}>
                              <Form.Item
                                className="admin-label4"
                                label="Department"
                                name={"department"}
                              >
                               <Card style={{height:'35px',width:'250px',marginLeft:'65px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {users !== undefined ?  users[0]?.department : ""}
                                  </Typography>
                                </Card>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-joiningdate-label"
                                label="Joining Date"
                                name={"date"}
                              >
                               <Card style={{height:'35px',width:'250px',marginLeft:'30px'}}>
                                  <Typography style={{float:'left',marginTop:'-18px'}}>
                                    {textt}
                                  </Typography>
                                </Card>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row className="performance-form-row-three">
                            <Col span={12}>
                              <Form.Item
                                label="Review Period"
                                className="admin-review-period"
                              >
                                    <Input 
                                      defaultValue={"2022-23"}
                                      readOnly
                                      className="admin-performance-date"
                                    /> 
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
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
                                  style={{
                                    fontSize: "17px",
                                    marginTop: "-10px",
                                  }}
                                  key={d.t_id}
                                >
                                  {d.measures}
                                </p>
                              </Card>
                            </div>
                            <div>
                              {comment !== undefined &&
                                comment.map((b, index) => {
                                  if( d.t_id === b.t_id) {
                                    return (
                                      <>
                                        <Row style={{ marginTop: "20px" }}>
                                          <Col span={12}>
                                            <Form.Item
                                              style={{ marginLeft: "120px" }}
                                              name="selfRating"
                                              label={
                                                <>
                                                  <label className="self-rating">
                                                    Self Rating
                                                  </label>
                                                </>
                                              }
                                            >
                                              <div>
                                                <Card
                                                  className="fetchedRating"
                                                  key={b.t_id}
                                                >
                                                  <Typography
                                                    style={{
                                                      fontSize: "20px",
                                                      marginTop: "-25px",
                                                      marginLeft: "-5px",
                                                      fontWeight: "light",
                                                    }}
                                                  >
                                                    {b?.self_rating}
                                                  </Typography>
                                                </Card>
                                              </div>
                                            </Form.Item>
                                          </Col>
                                          <Col span={12}>
                                            <Form.Item
                                              style={{ marginLeft: "20px" }}
                                              label={
                                                <label className="admin-self-comment">
                                                  Justify Your Comment
                                                </label>
                                              }
                                              name="selfComment"
                                            >
                                              <div>
                                                <Card
                                                  className="admin-fetchedCard"
                                                  key={b.t_id}
                                                >
                                                  <Typography
                                                    style={{
                                                      marginTop: "-15px",
                                                     float:'left',
                                                      fontSize: "16px",
                                                    }}
                                                  >
                                                    {b?.self_comment}
                                                  </Typography>
                                                </Card>
                                              </div>
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                        
                                      </>
                                    )}
                                  
                                })}
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
                      <Form.Item
                        readOnly
                        label={
                          <label
                            style={{ fontSize: "18px", marginLeft: "100px" }}
                          >
                            Employee Self Rating
                          </label>
                        }
                      >
                        <Card
                          style={{
                            height: "40px",
                            width: "120px",
                            marginTop: "50px",
                            marginLeft: "-185px",
                          }}
                        >
                          <Typography
                            style={{
                              textAlign: "center",
                              margin: "auto",
                              marginTop: "-25px",
                              fontSize: "24px",
                            }}
                          >
                            {parseFloat(avgValue?.employee_self_rating).toFixed(2)}
                          </Typography>
                        </Card>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginLeft: "25px" }}
                        label={
                          <label className="self-aspiration">
                            Self Aspiration
                          </label>
                        }
                        name="selfAspiration"
                      >
                        <div key={empData?.t_id}>
                          <Card
                            style={{
                              marginTop: "40px",
                              marginLeft: "-125px",
                              width: "400px",
                              height: "100px",
                            }}
                          >
                            <Typography
                              style={{
                                float:'left',
                                
                                marginTop: "-20px",
                                fontSize: "16px",
                              }}
                              className="self-aspiration-input"
                              rows={4}
                            >
                              {avgValue?.self_aspirations}
                            </Typography>
                          </Card>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
  
                 
                  {/* <------ here ends your code -----> */}
  
                  <Divider
                    style={{
                      marginTop: "40px",
                      backgroundColor: "lightBlue",
                      height: "3px",
                    }}
                  />
                </Form>
              </Card>
            </Content>
            )}
          </Layout>
        </Space>
       
    </>
  );
};

export default Home;
