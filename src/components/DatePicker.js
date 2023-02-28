import { DatePicker, Input, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['YYYY'];

DatePicker = () => (
  <Space direction="vertical" size={12}>
    {/* <DatePicker defaultValue={dayjs('2022', dateFormatList[0])} format={dateFormatList} className="datepicker-1" /> */}
   <Input  defaultValue={2022-2023}/>   
  </Space>
);
export default DatePicker;