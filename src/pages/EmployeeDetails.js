import {
  Col,
  Divider,
  Layout,
  Row,
  Space,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ValidationRules from "../pages/ValidationRules";
import Profile from "../components/Profile";
import download from "../download.png";
import {
  Button,
  Card,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import { isObject, isString } from "lodash";
import dayjs from "dayjs";

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
};
const EmployeeDetails = (props) => {
  const navigate = useNavigate();
  /* performance apraisal form  */
  const [date, setDate] = useState();
  const [windowsOptions, setWindowsOptions] = useState("");
  // const [windowsClose, setWindowsClose] = useState(false)

  /* performance apraisal form ends here */

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

  const [editForm, setEditForm] = useState(initialState);
  const [self_aspirations, setself_aspirations] = useState("");
  const [error_self_aspirations, seterror_self_aspirations] = useState(false);
  const [avg, setAvg] = useState(0);
  const [Mangeravg, setMangerAvg] = useState(0);
  const [managerCmt, setmanagerCmt] = useState("");
  const [errorManagerCmt, setErrorManagerCmt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, messages) => {
    api[type]({
      message: `${messages}`,
      className:"notification-type-success"
    });
  };
  // vlidation rules

  const selectedMail = localStorage.getItem("selectMail");

  
  console.log(selectedMail, "??????");
  const rules = {
    username: [ValidationRules.required],
    manager_name: [ValidationRules.required],
    role_id: [ValidationRules.required],
    designation: [ValidationRules.required],
    department: [ValidationRules.required],
    joining_date: [ValidationRules.required],
    review_period: "2022-23",
  };

  const validate = (name, data) => {
    data = data || {};
    const result = {};

    for (const field in rules) {
      for (const rule of rules[field]) {
        if (typeof rule === "function") {
          const val = rule(data[field], data);
          if (typeof val === "string" || isObject(val)) {
            result[field] = val;
            break;
          }
        }
      }
      // }
    }
    return result;
  };

  /*   new Home page  with validation*/

  const option = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/");
  }

  let dd = users[0]?.joining_date;

  let textt = formatDate(dd);

  const role_id = localStorage.getItem("role_id");
  useEffect(() => {
    if (!localStorage.getItem("token") && role_id !== "1" || localStorage.getItem("selectMail") === undefined) {
      navigate("/");
    }
  }, []);

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
      .get(
        "https://demo.emeetify.com:81/appraisel/users/userComments?email=" +
          selectedMail
      )
      .then((res) => {
        setself_aspirations(res?.data?.data[0]?.self_aspirations);
        setAvg(parseFloat(res?.data?.data[0]?.employee_self_rating).toFixed(2));
        setmanagerCmt(res?.data?.data[0]?.manager_feedback);
        setMangerAvg(parseFloat(res?.data?.data[0]?.manager_consolidated_rating).toFixed(2));
        console.log(res?.data?.data[0]?.manager_consolidated_rating,">>>>>>>=========");
      })
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
  useEffect(() => {}, [avg]);
  useEffect(() => {}, [Mangeravg]);

  const handleChange = (event) => {
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
  const handleFormChanges = (e) => {
    let { name, value } = e.target;
    if (name === "managerCmt") {
      setmanagerCmt(value);
      if (!value && value === "") {
        setErrorManagerCmt(true);
      } else {
        setErrorManagerCmt(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = {};
    const formValues = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const field3Value = formData[`field3${question.t_id}`];
      const field4Value = formData[`field4${question.t_id}`];

      // Validate field 1
      if (!field3Value) {
        errors[`field3${question.t_id}`] = "Manager rating is required";
      }

      // Validate field 2
      if (!field4Value) {
        errors[`field4${question.t_id}`] = "Manager comment is required";
      }

      if (field3Value && field4Value) {
        formValues.push({
          t_id: question.t_id,
          manager_rating: field3Value,
          manager_comment: field4Value,
        });
      }
    }

    setFormErrors(errors);
    if (managerCmt === "" || managerCmt === undefined) {
      if (!managerCmt && managerCmt === "") {
        return setErrorManagerCmt(true);
      } else {
        setErrorManagerCmt(false);
      }
    }
    if (Object.keys(errors).length === 0) {
      console.log(JSON.stringify(formValues));

      axios
        .post(
          `https://demo.emeetify.com:81/appraisel/users/AddComment?email=${selectedMail}&&type=manager`,
          formValues
        )
        .then((response) => {
          console.log(response.data.message);
          openNotification('success',"Form submitted Successfully")

        })
        .catch((e) => {
          console.log("e", e);
        });

      // manager cmt
      axios
        .put(
          `https://demo.emeetify.com:81/appraisel/users/userFeedback?email=${selectedMail}&&type=manager`,
          {
            manager_feedback: managerCmt,
          }
        )
        .then((response) => {
          console.log(response);
          // openNotification(response.data.message);
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  };

  useEffect(() => {
    let total = 0;
    let Average;
    for (const property in formData) {
      if (typeof formData[property] === "number") {
        total = total + parseInt(formData[property]);
        // count++;
        let getAvg = total / questions?.length;
        Average = getAvg.toFixed(2);
        console.log(typeof(Average),"LLLLLLL");
      }
    }
    setMangerAvg(Average);
    console.log(typeof(Mangeravg) ,"======>");
  }, [formData]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://demo.emeetify.com:81/appraisel/users/userNames?email=" +
          selectedMail
      )
      .then((response) => {
        let a = [];
        let userDetails = response.data.data;
        setEditForm({
          username: response.data.data[0]?.username,
          manager_name: response.data.data[0]?.manager_name,
          role_id: response.data.data[0]?.role_id,
          designation: response.data.data[0]?.designation,
          department: response.data.data[0]?.department,
        });
        let newSetDate = formatDate(response.data.data[0]?.joining_date);
        console.log("???", newSetDate);
        setDate(dayjs(newSetDate));
        const formValues = [];

        for (let i = 0; i < userDetails?.length; i++) {
          // console.log("---->>");
          let comments = userDetails[i].comments;
          for (let j = 0; j < comments?.length; j++) {
            const element = comments[j];
            for (let i = 0; i < questions?.length; i++) {
              const question = questions[i];
              if (question?.t_id === element?.t_id) {
                formData[`field1${question.t_id}`] = element?.self_rating;
                formData[`field2${question.t_id}`] = element?.self_comment;
                formData[`field3${question.t_id}`] = element?.manager_rating;
                formData[`field4${question.t_id}`] = element?.manager_comment;
                setFormData(formData);
              }
            }
          }
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((e) => {
        console.log(e, "error message");
      });
  }, [selectedMail, questions]);
 
  // console.log("=====>>>",date)
  return (
    <>
      {isLoading ? (
        <Spin tip="Loading" size="large" style={{ marginTop: "50vh" }}>
          <div className="content" />
        </Spin>
      ) : (
        <>
        <RadiusUpleftOutlined  style={{ top:'0px !important',marginRight:'100px' ,position:'fixed'  }} />
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
                <Content style={contentStyle} className="homeContent">
                  <Card
                    style={{ height: "auto", width: "1100px", margin: "auto" }}
                  >
                    <Card style={{ marginTop: "40px" }}>
                      <div style={{ marginBottom: "40px" }}>
                        <h1>Employee Details</h1>
                      </div>
                      <Divider />

                      <Row>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "60px" }}
                            >
                              <FormLabel style={{ marginTop: "20px" }}>
                                Name of Employee
                              </FormLabel>
                              <InputLabel sx={{ marginTop: 2, color: "red" }}>
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <TextField
                                size="small"
                                style={{
                                  marginLeft: "20px",
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                                variant="outlined"
                                name="username"
                                value={editForm.username}
                                disabled
                              />
                            </Stack>
                          </Stack>
                        </Col>

                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack direction={"row"}>
                              <FormLabel style={{ marginTop: "20px" }}>
                                Manager Name
                              </FormLabel>
                              <InputLabel sx={{ marginTop: 2, color: "red" }}>
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <Select
                                style={{
                                  marginLeft: "20px",
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                                size="small"
                                name="manager_name"
                                value={editForm.manager_name}
                                disabled
                              >
                                <MenuItem value="Rajamanickam R">
                                  Rajamanickam R
                                </MenuItem>
                                <MenuItem value="Ramesh Babu E">
                                  Ramesh Babu E
                                </MenuItem>
                                <MenuItem value="Santhana Gopal S">
                                  Santhana Gopal S
                                </MenuItem>
                              </Select>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "50px" }}>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "15px", marginTop: "20px" }}
                            >
                              <FormLabel sx={{ marginLeft: 6 }}>Role</FormLabel>
                              <InputLabel
                                sx={{ marginTop: -0.2, color: "red" }}
                              >
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <Select
                                style={{
                                  marginLeft: "123px",
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                                size="small"
                                name="role_id"
                                value={2}
                                disabled
                              >
                                <MenuItem value={2}>Employee</MenuItem>
                              </Select>
                            </Stack>
                          </Stack>
                        </Col>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "15px", marginTop: "20px" }}
                            >
                              <FormLabel style={{ marginLeft: "-13px" }}>
                                Designation
                              </FormLabel>
                              <InputLabel
                                sx={{ marginTop: -0.2, color: "red" }}
                              >
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <Select
                                style={{
                                  marginLeft: "47px",
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                                size="small"
                                name="designation"
                                value={editForm.designation}
                                disabled
                              >
                                <MenuItem value="Associate Trainee">
                                  Associate Trainee
                                </MenuItem>
                                <MenuItem value="Software Engineer">
                                  Software Engineer
                                </MenuItem>
                                <MenuItem value="Software Test Engineer">
                                  Software Test Engineer
                                </MenuItem>
                              </Select>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "50px" }}>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "15px", marginTop: "20px" }}
                            >
                              <FormLabel style={{ marginLeft: "50px" }}>
                                Department
                              </FormLabel>
                              <InputLabel
                                sx={{ marginTop: -0.2, color: "red" }}
                              >
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <Select
                                style={{
                                  marginLeft: "70px",
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                                size="small"
                                name="department"
                                value={editForm.department}
                                disabled
                              >
                                <MenuItem value="Development">
                                  Development
                                </MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Testing">Testing</MenuItem>
                                <MenuItem value="UI/UX Design">
                                  UI/UX Design
                                </MenuItem>
                              </Select>
                            </Stack>
                          </Stack>
                        </Col>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "3px", marginTop: "20px" }}
                            >
                              <FormLabel>Joining Date</FormLabel>
                              <InputLabel
                                sx={{ marginTop: -0.2, color: "red" }}
                              >
                                *
                              </InputLabel>
                            </Stack>
                            <Stack style={{ marginLeft: "45px",marginTop:'10px' }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                 
                                  style={{
                                    marginLeft: "123px",
                                    width: "250px",
                                    marginTop:'20px'
                                  }}
                                  name="joining_date"
                                  value={date}
                                  disabled
                                />
                              </LocalizationProvider>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <Col span={12}>
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              style={{ marginLeft: "65px", marginTop: "10px" }}
                            >
                              <FormLabel>Review Period</FormLabel>
                            </Stack>
                            <Stack>
                              <TextField
                                style={{
                                  marginLeft: "60px",
                                  width: "250px",
                                  marginTop: "5px",
                                }}
                                size="small"
                                variant="outlined"
                                name="review_period"
                                value={editForm.review_period}
                                defaultValue="2022-23"
                                disabled
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>
                    </Card>

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
                                <Stack style={{ marginLeft: "50px" }}>
                                  <h2
                                    style={{
                                      float: "left",
                                      marginTop: "-40px",
                                    }}
                                  >
                                    KRA:{question.kra}
                                  </h2>
                                </Stack>
                              </Col>
                            </Row>

                            <Row style={{ marginTop: "0px" }}>
                              <Col>
                                <Typography
                                  style={{
                                    border: "1px solid blue",
                                    fontSize: "18px",
                                    textAlign: "left",
                                    paddingTop: "10px",
                                    paddingLeft: "15px",
                                    color: "black",
                                    borderRadius: "10px",
                                    height: "80px",
                                    marginLeft: "50px",
                                    width: "1000px",
                                  }}
                                >
                                  {question.measures}
                                </Typography>
                              </Col>
                            </Row>

                            <Row
                              style={{
                                marginBottom: "50px",
                                marginTop: "20px",
                              }}
                            >
                              <Col span={12}>
                                <Stack
                                  direction="row"
                                  style={{
                                    marginLeft: "200px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <InputLabel
                                    style={{
                                      color: "black",
                                      fontSize: "18px",
                                      wordSpacing: "2px",
                                    }}
                                  >
                                    Self Rating
                                  </InputLabel>
                                  <InputLabel style={{ color: "red" }}>
                                    *
                                  </InputLabel>
                                </Stack>
                                <Select
                                  size="small"
                                  style={{ width: "150px", marginTop: "10px" }}
                                  value={
                                    formData[`field1${question.t_id}`] || ""
                                  }
                                  name={`field1${question.t_id}`}
                                  onChange={handleChange}
                                  disabled
                                  error={
                                    formErrors[`field1${question.t_id}`]
                                      ? true
                                      : false
                                  }
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                    style={{
                                      width: "50px",
                                      textAlign: "center",
                                    }}
                                  >
                                    Select Rating
                                  </MenuItem>
                                  <Divider
                                    style={{
                                      marginTop: "5px",
                                      marginBottom: "-1px",
                                    }}
                                  />
                                  {Array.isArray(option)
                                    ? option.map((item) => (
                                        <MenuItem
                                          value={item?.value}
                                          style={{
                                            textAlign: "center",
                                            paddingLeft: "60px",
                                          }}
                                        >
                                          {item?.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </Col>
                              <Col span={12}>
                                <Stack
                                  direction="row"
                                  style={{
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <InputLabel
                                    style={{
                                      color: "black",
                                      fontSize: "18px",
                                      wordSpacing: "2px",
                                    }}
                                  >
                                    Employee's Comment
                                  </InputLabel>
                                  <InputLabel style={{ color: "red" }}>
                                    *
                                  </InputLabel>
                                </Stack>
                                <TextField
                                  multiline
                                  rows={4}
                                  style={{
                                    width: 400,
                                    marginLeft: "-125px",
                                    borderRadius: "5px",
                                    fontSize: "15px",
                                    paddingTop: "10px",
                                    paddingLeft: "10px",
                                  }}
                                  name={`field2${question.t_id}`}
                                  value={
                                    formData[`field2${question.t_id}`] || ""
                                  }
                                  disabled
                                />
                              </Col>
                            </Row>
                            <Row
                              style={{
                                marginBottom: "150px",
                                marginTop: "-5px",
                              }}
                            >
                              <Col span={12}>
                                <Stack
                                  direction="row"
                                  style={{
                                    marginLeft: "200px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <InputLabel
                                    style={{
                                      color: "black",
                                      fontSize: "18px",
                                      wordSpacing: "2px",
                                    }}
                                  >
                                    Manager Rating
                                  </InputLabel>
                                  <InputLabel style={{ color: "red" }}>
                                    *
                                  </InputLabel>
                                </Stack>
                                <Select
                                  size="small"
                                  style={{ width: "150px", marginTop: "10px" }}
                                  value={
                                    formData[`field3${question.t_id}`] || ""
                                  }
                                  name={`field3${question.t_id}`}
                                  onChange={handleChange}
                                  error={
                                    formErrors[`field3${question.t_id}`]
                                      ? true
                                      : false
                                  }
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                    style={{
                                      width: "50px",
                                      textAlign: "center",
                                    }}
                                  >
                                    Select Rating
                                  </MenuItem>
                                  <Divider
                                    style={{
                                      marginTop: "5px",
                                      marginBottom: "-1px",
                                    }}
                                  />
                                  {Array.isArray(option)
                                    ? option.map((item) => (
                                        <MenuItem
                                          value={item?.value}
                                          style={{
                                            textAlign: "center",
                                            paddingLeft: "60px",
                                          }}
                                        >
                                          {item?.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                                <FormHelperText
                                  style={{
                                    color: "#d32f2f",
                                    marginLeft: "210px",
                                  }}
                                >
                                  {formErrors[`field3${question.t_id}`]}
                                </FormHelperText>
                              </Col>
                              <Col span={12}>
                                <Stack
                                  direction="row"
                                  style={{
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <InputLabel
                                    style={{
                                      color: "black",
                                      fontSize: "18px",
                                      wordSpacing: "2px",
                                    }}
                                  >
                                    Manager Comment
                                  </InputLabel>
                                  <InputLabel style={{ color: "red" }}>
                                    *
                                  </InputLabel>
                                </Stack>
                                <TextField
                                  multiline
                                  rows={4}
                                  style={{
                                    width: 400,
                                    marginLeft: "-125px",
                                    borderRadius: "5px",
                                    fontSize: "15px",
                                    paddingTop: "10px",
                                    paddingLeft: "10px",
                                    minHeight: "50px",
                                  }}
                                  name={`field4${question.t_id}`}
                                  value={
                                    formData[`field4${question.t_id}`] || ""
                                  }
                                  onChange={handleChange}
                                  error={
                                    formErrors[`field4${question.t_id}`]
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    formErrors[`field4${question.t_id}`] || ""
                                  }
                                />
                              </Col>
                            </Row>
                          </div>
                        ))}
                      <div>
                        <Divider
                          style={{
                            marginTop: "-80px",
                            backgroundColor: "pink",
                            height: "2px",
                          }}
                        />
                        <Row>
                          <Col span={12}>
                            <Stack
                              style={{ marginTop: "30px", marginLeft: "40px" }}
                            >
                              <FormLabel
                                sx={{ color: "black", fontSize: "18px" }}
                              >
                                Employee Average Rating
                              </FormLabel>
                            </Stack>
                            <Stack style={{ marginTop: "20px" }}>
                              <TextField
                              disabled
                                style={{ width: 100, marginLeft: "200px" }}
                                size={"small"}
                                variant="outlined"
                                name="employee_average"
                                value={avg}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Stack>
                          </Col>
                          <Col span={12}>
                            <Stack
                              direction="row"
                              style={{ marginTop: "30px", marginLeft: "25px" }}
                            >
                              <FormLabel
                                sx={{ color: "black", fontSize: "18px" }}
                              >
                                Self Aspiration
                              </FormLabel>
                              <InputLabel style={{ color: "red" }}>
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <TextField
                              disabled
                                multiline
                                rows={4}
                                style={{
                                  marginLeft: "25px",
                                  marginTop: "15px",
                                  width: "400px",
                                }}
                                variant="outlined"
                                name="self_aspirations"
                                value={self_aspirations}
                                // InputProps={{
                                //   style: {
                                //     height: 50,
                                //   },
                                // }}
                              />
                            </Stack>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Stack
                              style={{ marginTop: "30px", marginLeft: "80px" }}
                            >
                              <FormLabel
                                sx={{ color: "black", fontSize: "18px" }}
                              >
                                Manager's consolidated Rating
                              </FormLabel>
                            </Stack>
                            <Stack style={{ marginTop: "20px" }}>
                              <TextField
                                style={{ width: 100, marginLeft: "200px" }}
                                size={"small"}
                                variant="outlined"
                                name="manager_consolidated_rating"
                                value={Mangeravg === "NaN" || Mangeravg === NaN ? 0 : Mangeravg}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Stack>
                          </Col>
                          <Col span={12}>
                            <Stack
                              direction="row"
                              style={{ marginTop: "30px", marginLeft: "25px" }}
                            >
                              <FormLabel
                                sx={{ color: "black", fontSize: "18px" }}
                              >
                                Manager's Comment
                              </FormLabel>
                              <InputLabel style={{ color: "red" }}>
                                *
                              </InputLabel>
                            </Stack>
                            <Stack>
                              <TextField
                                multiline
                                rows={4}
                                style={{
                                  marginLeft: "25px",
                                  marginTop: "15px",
                                  width: "400px",
                                }}
                                variant="outlined"
                                name="managerCmt"
                                error={errorManagerCmt ? true : false}
                                helperText={errorManagerCmt ? "Required" : ""}
                                value={managerCmt}
                                onChange={handleFormChanges}
                              />
                            </Stack>
                          </Col>
                        </Row>
                      </div>
                      <Divider
                        style={{ backgroundColor: "lightblue", height: "3px" }}
                      />
                      <Button
                        style={{ marginBottom: "40px", marginTop: "10px" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Card>
                </Content>
            </Layout>
          </Space>
        </>
      )}
    </>
  );
};

export default EmployeeDetails;
