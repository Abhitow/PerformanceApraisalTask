import { Button, Card, Col, Divider, Form, Layout, Row, Space } from 'antd';
import HomeHeader from '../components/Header';
import PerformanceApraisalForm from '../components/PerformanceApraisalForm';
import ScoringTable from '../components/ScoringTable';
import Feedback from './Feedback';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Typography from 'antd/es/typography/Typography';
import KRArating from '../components/KRArating';
import KRAselfrating from '../components/KRAselfrating';
import KRAmanagerRating from '../components/KRAmanagerRating';
import KRAmanagerComment from '../components/KRAmanagerComment';
const { Header, Footer, Content } = Layout;
const layoutStyle={
    height:'100vh'
}
const headerStyle = {
  textAlign: 'left',
  color: 'black',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
  position:'fixed',
  top:'0px',
  width:'100vw',
  zIndex: 1,
  
};
const contentStyle = {
  textAlign: 'center',
  marginTop:'50px',
  backgroundColor:'#f5f5f5',
  minHeight: '1000%',
};

const footerStyle = {
  textAlign: 'center',
  color: 'black',
  height:'40px',
  backgroundColor:'#e6f4ff',
  position:'fixed',
  bottom:'0px',
  width:'100vw'
};
const handleSubmit=()=>{
  console.log("button working");
}
const Home = () => {
const navigate = useNavigate();
  const [detail , setDetail] =useState();
  const [skill , setSkill] = useState();

useEffect( ()=>{
  console.log("12345");
  axios.get("https://demo.emeetify.com:81/appraisel/users/getDetails")
    .then(response => setDetail(response.data.data))
    .catch(e =>{console.log("e" ,e)}) 
 },[])
 useEffect( ()=>{
  axios.get("https://demo.emeetify.com:81/appraisel/users/getSoft")
    .then(response => setSkill(response.data.data))
    .catch(e =>{console.log("e" ,e)}) 
 },[])
//  useEffect(()=>{
//   if(!localStorage.getItem('email') ){
//     navigate('/');
//   }
// },[]);

// console.log(detail);
  return(
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
  >
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
       <HomeHeader />
      </Header>
      <Content style={contentStyle} className='homeContent'>
        <Card style={{height:'auto' , width:'1100px',margin:'auto'}}>
          <PerformanceApraisalForm />
          <ScoringTable />

          <Divider style={{marginTop:'60px' , backgroundColor:'green' , height:'5px'}}/>

<Form>
<Typography style={{marginTop:'80px',fontSize:'24px',fontWeight:'bold',textDecorationLine:'underline'}}>KRA-Technical Aspects</Typography>
        <div>
            {detail!==undefined && detail.map( (d)=>{
        return(
          <>
        <div style={{display:'flex' ,flexDirection:'row',marginLeft:'10px',marginTop:'30px'}}>
          <Row>
            <Col style={{float:'left',fontSize:'16px'}}><h1 key={d.id}>{d.Kra_id} : </h1></Col>
          </Row>
          <Row>
            <Col style={{float:'left',fontSize:'14px' , marginTop:'6px' ,marginLeft:'4px',fontWeight:'none'}}>
            <h1 key={d.id}> {d.Kra}</h1>
            </Col>
          </Row>
        </div>
        <div>
          <Card style={{height:'75px',borderColor:'blue' , textAlign:'left',marginTop:'0px',marginLeft:'10px',marginRight:'20px'}}>
          <p style={{fontSize:'17px',marginTop:'-10px'}} key={d.id}>{d.Measures}</p>
          </Card>
        </div>
        <div>
        <Row >
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
                        Select Rating<span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Justify Your Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRArating /></Col>
                <Col span={12}><KRAselfrating /></Col>
            </Row>
            <Row>
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Comments
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRAmanagerRating /></Col>
                <Col span={12}><KRAmanagerComment /></Col>
            </Row>
        </div>
          </>
         
        )
      })}
  </div>

  <Divider style={{marginTop:'60px' , backgroundColor:'violet' , height:'5px'}}/>

  <Typography style={{marginTop:'80px',fontSize:'24px',fontWeight:'bold',textDecorationLine:'underline'}}>KRA-Softskills</Typography>


  <div>
            {skill!==undefined && skill.map( (d)=>{
        return(
          <>
        <div style={{display:'flex' ,flexDirection:'row',marginLeft:'10px',marginTop:'30px'}}>
          <Row>
            <Col style={{float:'left',fontSize:'16px'}}><h1 key={d.id}>{d.Kra_id} : </h1></Col>
          </Row>
          <Row>
            <Col style={{float:'left',fontSize:'14px' , marginTop:'6px' ,marginLeft:'4px',fontWeight:'none'}}>
            <h1 key={d.id}> {d.Kra}</h1>
            </Col>
          </Row>
        </div>
        <div>
          <Card style={{height:'75px',borderColor:'blue' , textAlign:'left',marginTop:'0px',marginLeft:'10px',marginRight:'20px'}}>
          <p style={{fontSize:'17px',marginTop:'-10px'}} key={d.id}>{d.Measures}</p>
          </Card>
        </div>
        <div>
        <Row >
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}} >
                        Select Rating<span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Justify Your Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRArating /></Col>
                <Col span={12}><KRAselfrating /></Col>
            </Row>
            <Row>
                <Col span={12} >
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Rating
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
                <Col span={12}>
                    <p style={{float:'left',marginLeft:'30px',fontSize:'18px'}}>
                        Manager Comments
                        <span style={{color:'red'}}>*</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={12}><KRAmanagerRating /></Col>
                <Col span={12}><KRAmanagerComment /></Col>
            </Row>
        </div>
          </>
         
        )
      })}
  </div>
         <Divider style={{marginTop:'40px' , backgroundColor:'blue' , height:'5px'}}/>

         <Feedback />

        <Divider style={{marginTop:'40px' , backgroundColor:'lightBlue' , height:'3px'}}/>

        <Button htmlType="submit" type="primary" 
          style={{backgroundColor:'green',height:'40px',width:'100px'}}
          onClick={handleSubmit}
            >Submit</Button>


</Form>
       










          {/* <Form> */}
          {/* <KRAdetails />

  //         <Divider style={{marginTop:'40px' , backgroundColor:'blue' , height:'5px'}}/>

  //         <KRAsoftskills />

  //         <Divider style={{marginTop:'40px' , backgroundColor:'blue' , height:'5px'}}/>

  //         <Feedback />

  //         <Divider style={{marginTop:'40px' , backgroundColor:'lightBlue' , height:'3px'}}/>

  //         <Button htmlType="submit" type="primary" 
  //         style={{backgroundColor:'green',height:'40px',width:'100px'}}
  //         onClick={handleSubmit}
  //         >Submit</Button> */}
           {/* </Form>  */}
          
        </Card>

      </Content>
     {/* <Footer style={footerStyle}>
  //       <h6 style={{margin:'auto' , float:'right'}}>
  //         @Terms and Conditions
  //       </h6>
  //       </Footer>*/}
     </Layout>  
   </Space>
  )
    }

export default Home;