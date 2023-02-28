import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const JoiningDatepicker = () => (
  <Space direction="vertical" size={12}>
    <DatePicker picker="year"   style={{width:'250px',marginLeft:'30px'}}/>
  </Space>
);
export default JoiningDatepicker; 