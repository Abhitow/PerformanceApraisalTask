import { Layout, Space } from 'antd';
import PerformanceApraisalForm from '../components/PerformanceApraisalForm';
import ScoringPopover from '../components/ScoringPopover';
const { Header, Footer, Sider, Content } = Layout;
const layoutStyle={
    height:'100vh'
}
const headerStyle = {
  textAlign: 'left',
  color: 'black',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#e6fffb',
  
};
const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  
};

const footerStyle = {
  textAlign: 'center',
  color: 'black',
  height:'40px',
  backgroundColor:'#e6f4ff',
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
      <Header style={headerStyle}><h2 style={{margin:'auto'}}>Skein Technology</h2></Header>
      <Content style={contentStyle}>
      <ScoringPopover />
        <PerformanceApraisalForm />
      </Content>
      <Footer style={footerStyle}><h6 style={{margin:'auto' , float:'right'}}>@Terms and Conditions</h6></Footer>
    </Layout>  
  </Space>
);
export default Home;