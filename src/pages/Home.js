import { Button, Card, Divider, Form, Layout, Space } from 'antd';
import HomeHeader from '../components/Header';
import KRAdetails from '../components/KRAdetails';
import PerformanceApraisalForm from '../components/PerformanceApraisalForm';
import ScoringTable from '../components/ScoringTable';
import KRAsoftskills from '../components/KRAsoftskills'
import Feedback from './Feedback';
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
  minHeight: '1170%',
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
const Home = () => (
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

          <Divider style={{marginTop:'40px' , backgroundColor:'green' , height:'5px'}}/>

          <Form>
          <KRAdetails />

          <Divider style={{marginTop:'40px' , backgroundColor:'blue' , height:'5px'}}/>

          <KRAsoftskills />

          <Divider style={{marginTop:'40px' , backgroundColor:'blue' , height:'5px'}}/>

          <Feedback />

          <Divider style={{marginTop:'40px' , backgroundColor:'lightBlue' , height:'3px'}}/>

          <Button htmlType="submit" type="primary" 
          style={{backgroundColor:'green',height:'40px',width:'100px'}}
          onClick={handleSubmit}
          >Submit</Button>
          </Form>
          
        </Card>

      </Content>
      {/* <Footer style={footerStyle}>
        <h6 style={{margin:'auto' , float:'right'}}>
          @Terms and Conditions
        </h6>
      </Footer> */}
    </Layout>  
  </Space>
);
export default Home;