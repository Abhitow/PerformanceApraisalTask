import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import ScoringTable from "../components/ScoringTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "antd/es/typography/Typography";
import TextArea from "antd/es/input/TextArea";
import Profile from "../components/Profile";
import download from "../download.png";
import SearchDetails from "../components/SearchDetails";
import { useNavigate } from "react-router-dom";

/*<-----Search details components */

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

const MngEmployeeDetails = (props) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [detail, setDetail] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [rank, setRank] = useState();
  const [managerAvg, setManagerAvg] = useState();
  /* performance apraisal form  */
  const [responseData, setResponseData] = useState("");
  const [formData, setFormData] = useState();
  const [roles, setRoles] = useState();
  const [windowsOptions, setWindowsOptions] = useState("");
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

  const [avgValue, setAvgValue] = useState();
  // const [search, setSearch] = useState();
  const role = localStorage.getItem("role_id");
  const [commentData, setCommentData] = useState();

  /*<----Search Details starts here */
  const [users, setUsers] = useState([]);
  const [text, setText] = useState();
  const [comment, setComment] = useState([]);
  const [empData, setEmpData] = useState();

  const [managerFeedback , setManagerFeedback] =useState();
  const [mng , setMng] =useState();

  const selectMail = localStorage.getItem("selectMail");

  /*<------Search deatils function Ends here  */


  const localEmail = localStorage.getItem("email");
  const initialData = {
    questions: [
      {
        t_id: 1,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 2,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 3,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 4,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 5,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 6,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 7,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 8,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
      {
        t_id: 9,
        email: selectMail,
        manager_rating: 0,
        manager_comment: "",
      },
    ],
    
  };

  const [userData, setUserData] = useState(initialData);

  const RankingData = [ "Select Rating", "1", "2", "3", "4", "5"];
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

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

  useEffect(() => {
  }, [userData]);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => {
        setDetail(response.data.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
      axios
      .get(
        "https://demo.emeetify.com:81/appraisel/users/userComments?email=" + localEmail
      )
      .then((response) => {
        setMng(response.data.data[0]);
      })
      .catch((e) => console.log(e, "error Message"));  
  }, [localEmail]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userNames?email="+selectMail
      );
      let a =[]
      setUsers(response.data.data)
      // console.log(users[0]?.username);
      // console.log(users);
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
  }, [selectMail]);
  const role_id = localStorage.getItem("role_id");

  useEffect(() => {
    if (!localStorage.getItem("token") && role_id !== "1") {
      navigate("/");
    }
  }, [role_id ,navigate]);


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
  // console.log(parseFloat(avgValue?.employee_self_rating).toFixed(2),"bbbbbbbb");
  // console.log(parseFloat(avgValue?.manager_consolidated_rating).toFixed(2),"bbbbbbbb");
 
  // console.log(commentData ? commentData?.data[0]?.self_rating : "","lllllllll");
  const onFinish = (formData) => {
    if (commentData?.data[0].manager_comment === undefined
      && commentData?.data[8].manager_comment === undefined && commentData.manager_feedback === undefined) {
      messageApi.open({
        type: "error",
        content: "please enter all the details",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Thank You Form submitted successfully",
      });
    }
  };
 
  const handleAdmin = () => {
    axios
    .post(
      `https://demo.emeetify.com:81/appraisel/users/AddComment?email=${selectMail}&&type=manager`,userData.questions
    )
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
      axios
      .put(
        `https://demo.emeetify.com:81/appraisel/users/userFeedback?email=${localEmail}&&type=employee`,{
          manager_feedback: managerFeedback || mng?.manager_feedback
        }
      )
      .then((response) => {
        console.log(response);
        // setCommentData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/appraisalWindow")
      .then((response) => setWindowsOptions(response.data.data))
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

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
  // console.log(users[0].email,"hhhhhhhh");
  return (
    <div>
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
                <Col span={14}>
                  <h1
                    style={{
                      textAlign: "center",
                      marginTop: "0px",
                     marginLeft:'180px'
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

                      <div style={{ marginTop: "10px", marginLeft: "100px" }}>
                        {/* <Typography style={{fontSize:'20px',marginLeft:'250px'}}>{searchDetails[0].username}</Typography> */}
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
                              <Card style={{height:'35px',width:'250px',marginLeft:'110px'}}>
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
                                            style={{ marginLeft: "115px" }}
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
                                                    marginTop: "-25px",
                                                   float:'left',
                                                    fontSize: "16px",
                                                    marginLeft:"-10px"
                                                  }}
                                                >
                                                  {b?.self_comment}
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
                                          >
                                            <div className="manager-rating-input">
                                              <Select
                                                className="performance-input"
                                                defaultValue={b?.manager_rating}
                                                style={{
                                                  width: 150,
                                                  marginLeft: "20px",
                                                  
                                                }}
                                                value={rank}
                                                onChange={(e) => {
                                                  initialData.questions[
                                                    index
                                                  ].manager_rating = e ;
                                                  userData.questions[index][
                                                    "manager_rating"
                                                  ] = e;
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
                                              {/* <Typography>{b?.manager_rating}</Typography> */}
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
                                                defaultValue={b?.manager_comment}
                                                onChange={(e) => {
                                                  initialData.questions[
                                                    index
                                                  ].manager_comment =
                                                    e.target.value;
                                                  userData.questions[index][
                                                    "manager_comment"
                                                  ] = e.target.value;
                                                  setUserData(userData);
                                                }}
                                                rows={4}
                                                style={{ width: "400px",fontSize:'16px' }}
                                              />
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
                      style={{ marginLeft: "15px" }}
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
                        defaultValue={parseFloat(avgValue?.manager_consolidated_rating).toFixed(2)}
                          style={{
                            textAlign: "center",
                            margin: "auto",
                            marginTop: "-25px",
                            fontSize: "24px",
                          }}
                        >
                          {managerAvg} 
                        </Typography>
                      </Card>
                    </Form.Item>
                  </Col>
                  <Col span={12} key={1}>
                    <Form.Item
                      label={
                        <label className="teamlead-feedback" >
                          Manager's Feedback
                        </label>
                      }
                      rules={[
                        {
                          required: true,
                          message: "please give comments",
                        },
                      ]}
                      hasFeedback
                      required
                      name="managerFeedback"
                      initialValue={mng?.manager_feedback}
                    >
                     
                        <TextArea
                          style={{
                            marginTop: "40px",
                            width: "400px",
                            maxWidth: "130%",
                            height: "110px",
                            marginLeft: "-280px",
                          }}
                          onChange={(e) => {
                            setManagerFeedback(e.target.value);
                          }}
                          rows={4}
                        />
                      
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
                  onClick={handleAdmin}
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
    </div>
  );
};

export default MngEmployeeDetails;
