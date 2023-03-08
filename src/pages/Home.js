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
import HomeHeader from "../components/Header";
import PerformanceApraisalForm from "../components/PerformanceApraisalForm";
import ScoringTable from "../components/ScoringTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/skeleton/Title";
import { ConsoleSqlOutlined } from "@ant-design/icons";

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
  minHeight: "950%",
};

const Home = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [detail, setDetail] = useState();
  const [skill, setSkill] = useState();
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
  const [consolidateRating, setConsolidateRating] = useState();
  const [selectValue, setSelectValue] = useState("");
  const [avg , setAvg] =useState(0);
  const [formData , setFormData] = useState();
  /* performance apraisal form ends here */

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

  const payload = {
    username: name,
    manager_name: manager,
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

  const localEmail = localStorage.getItem("email");
  const consolidatedData = [
    {
      self_aspirations: selfAspiration,
      teamlead_feedback: leadFeedback,
      employee_self_rating: empSelfRating,
      manager_consolidated_rating: managerAvg,
    },
  ];
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
  ];

  const [userData, setUserData] = useState(initialData);

  const RankingData = ["Select Rating", "1", "2", "3", "4", "5"];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);


  useEffect(() =>
  {
    console.log("PPP")
  },[userData])

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => setDetail(response.data.data))
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const empDetails = () => {
    axios
      .put(
        "https://demo.emeetify.com:81/appraisel/users/FormDetails?email="+
          localEmail,
        payload
      )
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  const onFinish = (values) => {
    // axios
    //   .post(
    //     "https://demo.emeetify.com:81/appraisel/users/AddComment?email="+
    //       localEmail,
    //     initialData
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((e) => {
    //     console.log("e", e);
    //   });
    if(responseData.status === false){
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
        "https://demo.emeetify.com:81/appraisel/users/AddComment?email=" +
          localEmail,
        initialData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
 
  

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Details Submitted Successfully",
    });
  };
  const onFinishFailed = (errorInfo) => {};

  const userName = localStorage.getItem("displayName");

  console.log(selectValue,"??????????????????");
  function calAvg() {
    var total = 0;
    var count = 0;

    userData.forEach(function (item, index) {
      total=parseInt(total)+parseInt(item?.self_rating)
      setAvg(total);
      console.log('???',total);
      count++;
      console.log("count",count);
      console.log("check",typeof(item.self_rating));
      console.log("total",typeof(total));

    });
    let d =total / count ;
    let average = d.toFixed(2); 
    setAvg(average);
    console.log(average);
  }
  // console.log(calAvg(arry));

  // console.log("????", userData);


    
  
  return (
    <>
      {contextHolder}
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <HomeHeader />
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
                              message: "please enter name of employee",
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
                              message: "please select the manager",
                            },
                          ]}
                        >
                          <Select
                            className="performance-input-manager"
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
                            {
                              required: true,
                              message: "please enter Your designation",
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
                      <Col span={12}>
                        <Form.Item
                          className="label4"
                          label="Department"
                          name={"department"}
                          rules={[
                            {
                              required: true,
                              message: "please enter your department",
                            },
                          ]}
                        >
                          <Select
                            className="performance-input-department"
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
                            {
                              required: true,
                              message: "please enter your joining date",
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
                  {/* {console.log("+++++", detail)} */}
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
                                        initialData[index].self_comment =e.target.value;
                                      }}
                                      rows={4}
                                      style={{ width: "400px", marginTop: "" }}
                                    />
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
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
                                      // rules={[
                                      //   {
                                      //     required: true,
                                      //     message: "please give ratings",
                                      //   },
                                      // ]}
                                      // hasFeedback
                                      className="performance-input"
                                      defaultValue={RankingData[0]}
                                      style={{
                                        width: 150,
                                        marginLeft: "20px",
                                      }}
                                      value={rank}
                                      // onChange={(e) => {
                                      //   initialData[index].self_rating = e;
                                      // }}
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
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "please give comments",
                                  //   },
                                  // ]}
                                  // hasFeedback
                                  // required
                                >
                                  <div
                                    className="manager-comment-input"
                                    // key={d.t_id}
                                  >
                                    <TextArea
                                      // onChange={(e) => {
                                      //   initialData[index].t_id = d.t_id;
                                      //   initialData[index].self_comment =
                                      //     e.target.value;
                                      // }}
                                      rows={4}
                                      style={{ width: "400px" }}
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
                    <Form.Item readOnly
                      label={
                        <label style={{ fontSize: "18px", marginLeft: "30px" }}>
                          Employee Self Rating
                        </label>
                      }
                    >
                      <Card style={{height:'50px',width:'100px', marginTop: "50px",
                          marginLeft: "-130px"}}>
                        <Typography style={{textAlign:'center',margin:'auto',
                      marginTop:'-20px',fontSize:'24px'}}>{avg}</Typography>
                      </Card>
                      {/* <Input
                        // onChange={(e)=>{setConsolidateRating(e.target.value)}}
                        // onChange={avg}
                        value={avg}
                        rows={4}
                      /> */}
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
                          Manager Feedback
                        </label>
                      }
                      name="managerFeedback"
                    >
                      <div>
                        <TextArea
                          style={{
                            marginTop: "40px",
                            marginLeft: "-330px",
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
        </Layout>
      </Space>
    </>
  );
};

export default Home;
