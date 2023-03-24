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
  
  const ManagerHome = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [detail, setDetail] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [rank, setRank] = useState();
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
    const [avg, setAvg] = useState(0);
    const [formData, setFormData] = useState();
    const [roles, setRoles] = useState();
    const [windowsOptions, setWindowsOptions] = useState("");
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
    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState();
    const [searchDetails, setSearchDetails] = useState();
    const [comment, setComment] = useState();
    const [empData, setEmpData] = useState();
  
    /*<----Search Details starts here */
  
    /*<------Search deatils function starts here  */
  


    const [userMail , setUserMail] = useState([]);
    const [empMail , setEmpMail] = useState([]);

    const [fetched , setFetched] = useState();
    const [selectMail , setSelectMail] =useState();


    // console.log(role, "----->>>>>");
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
    

  useEffect(() =>{
    axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userList")
        .then(response => setUserMail(response.data.data) )
        .catch(e => console.log(e,"error message"));

        let a=[];
        for (let i = 0; i < userMail?.length; i++) {
            a.push(userMail[i].email);
          }
          setEmpMail(a);
       
  },[empMail]);
    
useEffect(()=>{},[empMail]);
 
    const onFinish = (formData) => {
      if (responseData.status === true && commentData.status === true) {
        messageApi.open({
          type: "success",
          content: "Thank you",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "please enter all the details",
        });
      }
    };
  
   
    const handleSubmit = () => {
        axios
        .get("https://demo.emeetify.com:81/appraisel/users/userNames?email="+selectMail)
        .then((response) => setFetched(response.data.data))
        .catch((e) => {
          console.log("e", e);
        });
        // navigate("/mngemployeedetails");
        navigate("/employeedetails");
    }
    localStorage.setItem("selectMail",selectMail);

    useEffect(() => {
      axios
        .get("https://demo.emeetify.com:81/appraisel/users/appraisalWindow")
        .then((response) => setWindowsOptions(response.data.data))
        .catch((e) => {
          console.log("e", e);
        });
    }, []);
      const handleSelect = (e) =>{
            setSelectMail(e)
      }

      
    //   console.log(selectMail,"kkkkkkkk");

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
                    <img
                      src={download}
                      className="skein-logo"
                      alt="skeinlogo"
                    />
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
                <Card style={{margin:'auto' , height:'100px', width:'500px',marginTop:'50px'}}>
                <Form className="manager-home-form">
                <Row>
                    <Col>
                        <Form.Item>
                        <Select
                        
                                style={{
                                  width: 280,
                                  marginLeft: "20px",
                                }}
                               onChange={handleSelect}
                                options={empMail.map((selectData) => ({
                                  label: selectData,
                                  value: selectData,
                                }))}
                              />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item style={{marginLeft:'20px'}}>
                            <Button htmlType="submit" onClick={handleSubmit} >Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
             </Form>
                </Card>
            
            </Content>
             {/* (
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
            ) */}
          </Layout>
        </Space>
    </div>
  )
}

export default ManagerHome