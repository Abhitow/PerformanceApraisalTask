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
import download from "../download.png";
import SearchDetails from "../components/SearchDetails";

/*<-----Search details components */

const { Search } = Input;

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
  const [selfAspiration, setSelfAspiration] = useState("");
  const [leadFeedback, setLeadFeedback] = useState();

  const [empSelfRating, setEmpSelfRating] = useState();
  const [mngComment, setMngComment] = useState();

  const [managerFeedback, setManagerFeedback] = useState("");
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
  const [windowsOptions, setWindowsOptions] = useState("");
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

  const [errorData, setErrorData] = useState();
  const [indexValue, setIndexValue] = useState(0);

  const [avgTotal, setAvgTotal] = useState();
  // const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mailId = localStorage.getItem("email");
  const [commentData, setCommentData] = useState();

  /*<----Search Details starts here */
  const [users, setUsers] = useState([]);
  const [text, setText] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState();
  const [searchDetails, setSearchDetails] = useState();
  const [answer, setAnswer] = useState();
  const [email, setEmail] = useState();
  const [comment, setComment] = useState();
  const [empData, setEmpData] = useState();


  /*<----Search Details starts here */

  /*<------Search deatils function starts here  */
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((users) => {
        const regex = new RegExp(`${text}`, "gi");
        return users.email.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
    setSearch(matches);
  };
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onSearch = () => {
    if (search.length === 1 && text != null) {
      console.log(search[0].email, "searched -------->");

      if (text === search[0].email) {
        console.log(search[0].comments);
        setEmpData(search[0].comments);
      } else {
        console.log("not matched");
      }

      setSearchDetails(search);
    } else {
      console.log("please enter name");
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userNames"
      );
      setUsers(response.data.data);
      let userDetails = response.data.data;

      for (let i = 0; i < userDetails.length; i++) {
        let comments = userDetails[i].comments;
        for (let j = 0; j < comments.length; j++) {
          const element = comments[j];
          // console.log(element,"------>");
          setComment(element);
        }
      }
    };
    loadUsers();
  }, []);
  /*<------Search deatils function Ends here  */

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
      roles: "Manager",
    },
    {
      roleId: 2,
      roles: "Employee",
    },
  ];

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
    setRoles(e);
  };
  const localEmail = localStorage.getItem("email");
// console.log(managerFeedback,">,<<<<<<<<<<<<<<<<<<<<<<");
  const initialData = {
    questions : 
    [
      {
        t_id: 1,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 2,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 3,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 4,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 5,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 6,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 7,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 8,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 9,
        email: localEmail,
        self_rating: 0,
        self_comment: "",
        manager_rating: 0,
        manager_comment: "",
       
      },
    ],

    self_aspirations: "",
    manager_feedback: "",
  }
   
  const [userData, setUserData] = useState(initialData);



  const RankingData = ["Select Rating", "1", "2", "3", "4", "5"];
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
  }, [userData]);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => {
        setDetail(response.data.data);
        var getData = [];
        for (let i = 0; i < response.data.data.length; i++) {
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
          getData.push(error);
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
        "https://demo.emeetify.com:81/appraisel/users/FormDetails?email=" +
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

useEffect( () =>{
  axios.get("https://demo.emeetify.com:81/appraisel/users/Consolidate?email="+text)
  .then((response) =>{setAvgTotal(response.data.data)})
  .catch(e => console.log(e , "error Message"));
},[localEmail]);
  const onFinish = (formData) => {
    if (responseData.status === true && commentData.status === true) {
      messageApi.open({
        type: "error",
        content: "please enter all the details",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Thank you",
      });
    }
  };
  const handleSubmit = () => {
    empDetails();
    axios
      .post(
        "https://demo.emeetify.com:81/appraisel/users/AddComment?email=" +
          text,
        userData
      )
      .then((response) => {
        console.log(response.data);
        setCommentData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      }
      );

      


    // if(payload.username !== undefined && commentData.data.self_rating !== 0 && commentData === true){
    //     success();
    // }else{
    //   messageApi.open({
    //     type: "error",
    //     content: "Please fill all the details",
    //   });
    // }

    // if(commentData.data.self_rating === 0 && commentData.status === true){
    //   messageApi.open({
    //     type: "error",
    //     content: "please give ratings and comments",
    //   });
    // }else{
    //   messageApi.open({
    //     type: "success",
    //     content: "Employee comments submitted successfully",
    //   });

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

  // const handleManagerButton = () =>{
  //   console.log("manager button working");
  //   setIs_appraisal_open_for_employee(current => !current);
  //   setIs_appraisal_window_open(current => !current);

  // }

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
  function calManagerAverage() {
    var total = 0;
    var count = 0;
    userData.questions.map((i) => {
      if (i.manager_rating !== undefined) {
        total = total + parseInt(i.manager_rating);
        count++;
      }
      let getManagerAvg = total / count;
      let managerAverage = getManagerAvg.toFixed(2);
      setManagerAvg(managerAverage);
    });
  }
  // console.log(avg,"avggggggg");
  useEffect(() => {}, [errorData]);

  useEffect(() => {}, [indexValue]);

  // useEffect(() => {
  //   axios
  //     .get("https://demo.emeetify.com:81/appraisel/users/userNames")
  //     .then((response) => {
  //       setSearch(response.data.data, "111111111");
  //     })
  //     .catch((e) => {
  //       console.log(e, "error message");
  //     });
  // }, []);
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
      {mailId !== "admin@gmail.com" ? (
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
                    {mailId === "admin@gmail.com" ? (
                      <>
                        <div style={{ marginLeft: "30px" }}>
                          <Button type="primary" onClick={showModal} style={{}}>
                            Employee Details
                          </Button>
                        </div>
                        <Modal
                          title="Employee Details"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <SearchDetails />
                          {/* <Search autoComplete style={{ width: '200px'}} placeholder="Employee Name" onSearch={onSearch} enterButton />  */}
                        </Modal>
                      </>
                    ) : (
                      console.log("")
                    )}
                  </Col>

                  <Col span={14}>
                    <h1
                      style={{
                        textAlign: "center",
                        marginTop: "0px",
                        marginLeft: "-30px",
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
                                          className="performance-input-rating"
                                          defaultValue={RankingData[0]}
                                          style={{
                                            width: 150,
                                            marginLeft: "20px",
                                          }}

                                          onChange={(e) => {
                                            console.log("heloooooo")
                                            initialData.questions[index].self_rating = e;
                                            userData.questions[index]["self_rating"] = e;
                                           
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
                                            initialData.questions[index].self_comment =
                                              e.target.value;
                                            userData.questions[index]["self_comment"] =
                                              e.target.value;
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
                                // console.log(e.target.value);
                                // setSelfAspiration(e.target.value);
                                userData.self_aspirations =
                                e.target.value;
                                setUserData(userData);
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
            ) :
            
            
            (
              /*<-----Admin Code Starts Here ---> */
              <div>
                <Card
                  style={{
                    marginTop: "80px",
                    width: "1000px",
                    margin: "auto",
                    height: "80vh",
                    position: "fixed",
                    marginLeft: "260px",
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: "30vh",
                      fontSize: "24px",
                      color: "grey",
                    }}
                  >
                    Appraisal window currently Closed
                  </Typography>
                </Card>
              </div>
            )}
          </Layout>
        </Space>
      ) : (
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
                    <div style={{ marginLeft: "30px" }}>
                      <Button type="primary" onClick={showModal}>
                        Employee Details
                      </Button>
                    </div>
                    <Modal
                      title="Employee Details"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <SearchDetails />
                      {/* <Search autoComplete style={{ width: '200px'}} placeholder="Employee Name" onSearch={onSearch} enterButton />  */}
                    </Modal>
                  </Col>

                  <Col span={14}>
                    <h1
                      style={{
                        textAlign: "center",
                        marginTop: "0px",
                        marginLeft: "-30px",
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
                      <Search
                        type="text"
                        className="performance-input"
                        placeholder="Employee Email"
                        onChange={(e) => onChangeHandler(e.target.value)}
                        onSearch={onSearch}
                        value={text}
                        style={{float:'left',marginBottom:'20px',marginLeft:'5px',marginTop:'-65px'}}
                      />
                      {suggestions &&
                        suggestions.map((suggestion, i) => (
                          <div
                            style={{
                              display:'flex',
                              padding:'5px',
                              cursor:'pointer'
                            }}
                            key={i}
                            className="suggestion"
                            onClick={() => onSuggestHandler(suggestion.email)}
                          >
                            {suggestion.email}
                          </div>
                        ))}
                      {searchDetails?.length === 1 ? (
                        <div style={{ marginTop: "10px", marginLeft: "100px"}}>
                          {/* <Typography style={{fontSize:'20px',marginLeft:'250px'}}>{searchDetails[0].username}</Typography> */}
                          <Row className="performance-form-row-one">
                            <Col span={12} >
                              <Form.Item
                                label="Name of Employee"
                                name={"name"}
                                className="adminLabel1"
                              >
                                <Input
                                  className="admin-performance-input"
                                  defaultValue={searchDetails[0].username}
                                  readOnly
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-label2"
                                label="Manager Name"
                                name={"manager"}
                              >
                                <Input
                                  className="admin-performance-input-manager"
                                  style={{
                                    width: 250,
                                    // marginLeft: "20px",
                                  }}
                                  defaultValue={searchDetails[0].manager_name}
                                  readOnly
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row className="performance-form-row-two">
                            <Col span={12}>
                              <Form.Item
                                name={"roleId"}
                                className="admin-label5"
                                label="Role Id"
                              >
                                <Input
                                  className="admin-performance-input-roleId"
                                  style={{
                                    width: 250,
                                    marginLeft: "10px",
                                  }}
                                  defaultValue={searchDetails[0].role_id}
                                  readOnly
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-label3"
                                label="Designation"
                                name={"designation"}
                              >
                                <Input
                                  className="admin-performance-input-designation"
                                  style={{
                                    width: 250,
                                    marginLeft: 65,
                                  }}
                                  defaultValue={searchDetails[0].designation}
                                  readOnly
                                />
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
                                <Input
                                  className="admin-performance-input-department"
                                  defaultValue={searchDetails[0].department}
                                  readOnly
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                className="admin-joiningdate-label"
                                label="Joining Date"
                                name={"date"}
                              >
                                <Input
                                  className="admin-performance-joiningdate"
                                  defaultValue={searchDetails[0].joining_date}
                                  readOnly
                                />
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
                      ) : (
                        <div>{console.log("")}</div>
                      )}
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
                              {empData !== undefined &&
                                empData.map((item, index) => {
                                  if (d.t_id === item.t_id) {
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
                                                  key={item.t_id}
                                                >
                                                  <Typography
                                                    style={{
                                                      fontSize: "20px",
                                                      marginTop: "-25px",
                                                      marginLeft: "-5px",
                                                      fontWeight: "light",
                                                    }}
                                                  >
                                                    {item.self_rating}
                                                  </Typography>
                                                </Card>
                                              </div>
                                            </Form.Item>
                                          </Col>
                                          <Col span={12}>
                                            <Form.Item style={{marginLeft:'20px'}}
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
                                                  key={item.t_id}
                                                >
                                                  <Typography
                                                    style={{
                                                      marginTop: "-15px",
                                                      marginLeft: "-5px",
                                                      fontSize: "16px",
                                                    }}
                                                  >
                                                    {item.self_comment}
                                                  </Typography>
                                                </Card>
                                              </div>
                                            </Form.Item>
                                          </Col>
                                        </Row>
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
                                            className="performance-input"
                                            defaultValue={RankingData[0]}
                                            style={{
                                              width: 150,
                                              marginLeft: "20px",
                                            }}
                                            value={rank}
                                            onChange={(e) => {
                                              initialData.questions[index].manager_rating = e;
                                              userData.questions[index]["manager_rating"] = e;
                                              setUserData(userData);
                                              calManagerAverage();
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
                                              initialData.questions[index].manager_comment =e.target.value;
                                              userData.questions[index]["manager_comment"] = e.target.value;
                                              setUserData(userData);
                                            }}
                                            rows={4}
                                            style={{ width: "400px" }}
                                          />
                                        </div>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                      </>
                                    );
                                  }
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
                              marginTop: "-20px",
                              fontSize: "24px",
                            }}
                          > {avgTotal?.self_rating}</Typography>
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
                          <Card style={{marginTop:'40px',marginLeft:'-125px',width:'400px',height:'100px'}}>
                              <Typography
                                style={{ marginTop: "40px", marginLeft: "-250px" }}
                                className="self-aspiration-input"
                                rows={4} 
                               >
                                {empData?.self_aspiration}
                              </Typography>
                          </Card>
                          
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "30px" }}>
                    <Col span={12}>
                      <Form.Item
                        readOnly
                        label={
                          <label
                            style={{ fontSize: "18px", marginLeft: "100px" }}
                          >
                            Manager's Consolidated Rating
                          </label>
                        }
                      >
                        <Card
                          style={{
                            height: "40px",
                            width: "120px",
                            marginTop: "50px",
                            marginLeft: "-260px",
                          }}
                        >
                          <Typography
                            style={{
                              textAlign: "center",
                              margin: "auto",
                              marginTop: "-20px",
                              fontSize: "24px",
                            }}
                          >
                            {managerAvg}
                          </Typography>
                        </Card>
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
                              width: "450px",
                              height:'100px'
                            }}
                            onChange={(e) => {
                             
                              userData.manager_feedback =
                                e.target.value;
                                setUserData(userData);

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
            : (
            <div>
              <Card
                style={{
                  marginTop: "80px",
                  width: "1000px",
                  margin: "auto",
                  height: "80vh",
                  position: "fixed",
                  marginLeft: "260px",
                }}
              >
                <Typography
                  style={{
                    textAlign: "center",
                    marginTop: "30vh",
                    fontSize: "24px",
                    color: "grey",
                  }}
                >
                  Appraisal window currently Closed
                </Typography>
              </Card>
            </div>
            )
          </Layout>
        </Space>
      )}
    </>
  );
};

export default Home;
