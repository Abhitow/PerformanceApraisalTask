import {
    Button,
    Card,
    Col,
    Form,
    Layout,
    message,
    Row,
    Select,
    Space,
  } from "antd";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import Profile from "../components/Profile";
  import download from "../download.png";
  
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
  
  const ManagerHome = (props) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [userMail , setUserMail] = useState([]);
    const [fetched , setFetched] = useState();
    const [selectMail , setSelectMail] =useState();
    localStorage.setItem("selectMail",selectMail);


  useEffect(() =>{
    axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userList")
        .then(response => setUserMail(response.data.data) )
        .catch(e => console.log(e,"error message"));
  },[]);
    
// useEffect(()=>{},[empMail]);
  
  
  useEffect( () =>{
    if(localStorage.getItem("email") !== undefined && localStorage.getItem("role_id") === "1"){
      console.log("working gggg");
      navigate("/managerhome");
    }else{
     console.log('');
    }
  },[navigate]);

const sel = localStorage.getItem("selectMail",selectMail);
const naviGate = () => {
   navigate("/employeedetails");
}
    const handleSubmit = () => {
//  navigate("/employeedetails");
      
      if(selectMail !== undefined && selectMail === sel){
        navigate("/employeedetails");
        console.log("workingggggg");
    }else{
      navigate("/managerhome");
    }
        axios
        .get("https://demo.emeetify.com:81/appraisel/users/userNames?email="+selectMail)
        .then((response) => {
          setFetched(response.data.data)
          
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
 
      const handleSelect = (e) =>{
            setSelectMail(e)
      }

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
                        placeholder="Select Employee Email"
                        
                                style={{
                                  width: 280,
                                  marginLeft: "20px",
                                }}
                               onChange={handleSelect}
                                options={userMail!== undefined && userMail.map((selectData) => ({
                                  label: selectData.email,
                                  value: selectData.email,
                                }))}
                              />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item style={{marginLeft:'20px'}}>
                            <Button style={{opacity:1 ,transition: "opacity 1s"}} htmlType="submit" onClick={handleSubmit} >Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
             </Form>
                </Card>
            
            </Content>
          </Layout>
        </Space>
    </div>
  )
}

export default ManagerHome