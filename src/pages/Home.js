import { Card, Divider, Layout, Space } from 'antd';
import HomeHeader from '../components/Header';
import KRAdetails from '../components/KRAdetails';
import PerformanceApraisalForm from '../components/PerformanceApraisalForm';
import ScoringPopover from '../components/ScoringPopover';
import ScoringTable from '../components/ScoringTable';
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
  backgroundColor: '#531dab',
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

          <KRAdetails />
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