import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Layout,
  message,
  Rate,
  Row,
  Space,
} from "antd";
import HomeHeader from "../components/Header";
import PerformanceApraisalForm from "../components/PerformanceApraisalForm";
import ScoringTable from "../components/ScoringTable";
import Feedback from "./Feedback";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import TextArea from "antd/es/input/TextArea";

const { Header, Footer, Content } = Layout;
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
  minHeight: "990%",
};

const footerStyle = {
  textAlign: "center",
  color: "black",
  height: "40px",
  backgroundColor: "#e6f4ff",
  position: "fixed",
  bottom: "0px",
  width: "100vw",
};

const Home = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [detail, setDetail] = useState();
  const [skill, setSkill] = useState();
  const [messageApi , contextHolder] = message.useMessage();

  const localEmail = localStorage.getItem("email");

  const initialData = [{
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         },
                         {
                          "t_id": "",
                          "email": localEmail,
                          "self_rating": "",
                          "self_comment": "",
                         }
                        ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => setDetail(response.data.data))
      .catch((e) => {
        console.log("e", e);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getSoft")
      .then((response) => setSkill(response.data.data))
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const onFinish = () => {
    axios
      .post(
        "https://demo.emeetify.com:81/appraisel/users/AddComment?email="+
          localEmail, initialData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const handleSubmit = () => {
    console.log("button working");
    
  };

 
  const success = () =>{
    messageApi.open({
      type:'success',
      content:'Details Submitted Successfully'
    });
  }
  const onFinishFailed=(errorInfo) =>{

  }

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
            <PerformanceApraisalForm />
            <ScoringTable />

            <Divider
              style={{
                marginTop: "60px",
                backgroundColor: "green",
                height: "5px",
              }}
            />

            <Form form={form} onFinishFailed={onFinishFailed} onFinish={onFinish} scrollToFirstError={true} autoComplete="off">
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

              {/* technical aspects starts here  */}
             
              <div>
                {detail !== undefined &&
                  detail.map((d,index) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "10px",
                            marginTop: "30px",
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
                          <Row style={{marginTop:'20px'}}>
                            <Col span={12}>
                              <Form.Item name='selfRating'  rules={[{required:true , message:'please give rating'}]} hasFeedback required>
                                <label className="self-rating">Self Rating</label>
                                <div className="self-rating-input">
                                <Rate 
                                onChange={(e) =>{
                                  initialData[index].self_rating = e
                                }
                                }
                                defaultValue={1}
                                character={({ index }) => index + 1}
                                style={{
                                  fontSize: "25px",
                                 
                                }}
                              /> 
                                </div>
                                
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item name="selfComment" rules={[{required:true , message:'please give comments'}]} hasFeedback required>
                                <label className="self-comment">Justify Your Comment</label>
                                <div className="self-comment-input"  key={d.t_id}>
                                <TextArea
                                  onChange={(e) =>{
                                    initialData[index].t_id = d.t_id
                                    initialData[index].self_comment = e.target.value
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
                              <Form.Item>
                                <label className="manager-rating">Manager Rating</label>
                                <div>
                                <Rate 
                               className="manager-rating-input"
                                defaultValue={1}
                                character={({ index }) => index + 1}
                              /> 
                                </div>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item>
                                <label className="manager-comment">Manager Comments</label>
                                <div className="manager-comment-input"
                                key={d.t_id}
                              >
                                <TextArea
                                  rows={4}
                                  style={{ width: "400px", marginTop: "" }}
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
            

            {/*soft skill starts here */}
              <Typography
                style={{
                  marginTop: "80px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                KRA-Softskills
              </Typography>
              <div>
                {skill !== undefined &&
                  skill.map((d,index) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "10px",
                            marginTop: "30px",
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
                          <Row style={{marginTop:'20px'}}>
                            <Col span={12}>
                              <Form.Item name="selfRating"  rules={[{required:true , message:'please give rating'}]} hasFeedback>
                                <label className="self-rating">Self Rating</label>
                                <div className="self-rating-input">
                                <Rate 
                                onChange={(e) =>{
                                  initialData[index].self_rating = e
                                }
                                }
                                defaultValue={1}
                                character={({ index }) => index + 1}
                                style={{
                                  fontSize: "25px",
                                 
                                }}
                              /> 
                                </div>
                                
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item name="selfComment" rules={[{required:true , message:'please input your comments'}]} hasFeedback>
                                <label className="self-comment">Justify Your Comment</label>
                                <div className="self-comment-input"  key={d.t_id}>
                                <TextArea
                                  onChange={(e) =>{
                                    initialData[index].t_id = d.t_id
                                    initialData[index].self_comment = e.target.value
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
                              <Form.Item>
                                <label className="manager-rating">Manager Rating</label>
                                <div>
                                <Rate 
                               className="manager-rating-input"
                                defaultValue={1}
                                character={({ index }) => index + 1}
                              /> 
                                </div>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item>
                                <label className="manager-comment">Manager Comments</label>
                                <div className="manager-comment-input"
                                key={d.t_id}
                              >
                                <TextArea
                                  rows={4}
                                  style={{ width: "400px", marginTop: "" }}
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



              <Divider
                style={{
                  marginTop: "40px",
                  backgroundColor: "blue",
                  height: "5px",
                }}
              />

              <Feedback />

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
                onClick={success}
              >
                Submit
              </Button>
            </Form>
          </Card>
        </Content>
        {/* <Footer style={footerStyle}>
  //       <h6 style={{margin:'auto' , float:'right'}}>
  //         @Terms and Conditions
  //       </h6>
  //       </Footer>*/}
      </Layout>
    </Space>
    </>
  );
};

export default Home;
