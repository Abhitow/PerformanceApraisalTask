import { Select, Space } from 'antd';
import { Option } from 'antd/es/mentions';
import { useState } from 'react';
// const designationData = ['Select Designation','Associate Trainee', 'Software Engineer' , 'Software Test Engineer'];
const designation = [
  {
    key:'1',
    label:"Associate Trainee"
  },
  {
    key:'2',
    label:"Associate Trainee"
  },
  {
    key:'3',
    label:"Associate Trainee"
  },
  {
    key:'4',
    label:"Associate Trainee"
  },
];
const SelectDropdown = () => {
    const [designation , setDesignation] = useState();
    const handleChange = (value ,e) => {
      console.log(`selected ${value}`);
      setDesignation(value)
    };
  return (
    <Space wrap>
      {/* <Select menu={{designation ,}}
        style={{
          width: 250,marginLeft:'65px'
        }}
        value={designation}
        onChange={handleProvinceChange}
      ></Select> */}

<Select
      defaultValue="lucy"
      style={{
        width: 240,marginLeft:'65px'
      }}
      value={designation}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}

      
    />

{/* <Select style={{ 
          width: 250,marginLeft:'65px'
        }} 
        value={designation}
        onChange={(e)=>{setDesignation(e.target.value)}} defaultValue="select Designation">
  <Option value="associateTraineee">Associate Trainee</Option>
  <Option value="software Engineer">Software Engineer</Option>
  <Option value="test engineeer">Software Test Engineer</Option>
  <Option value="ui/ux designer">UI /UX Designer</Option>
</Select> */}
      
    </Space>
  );
};
export default SelectDropdown;