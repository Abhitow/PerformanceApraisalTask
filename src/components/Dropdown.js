import { Select, Space } from 'antd';
import { Option } from 'antd/es/mentions';
import { useState } from 'react';
const designationData = ['Select Designation','Associate Trainee', 'Software Engineer' , 'Software Test Engineer'];
const SelectDropdown = () => {
    const [designation , setDesignation] = useState();
 const handleProvinceChange=()=>{

 }
  return (
    <Space wrap>
      {/* <Select
        defaultValue={designationData[0]}
        style={{
          width: 250,marginLeft:'65px'
        }}
        onChange={handleProvinceChange}
        options={designationData.map((province) => ({
          label: province,
          value: province,
        }))}
      /> */}

<Select style={{ 
          width: 250,marginLeft:'65px'
        }} 
        value={designation}
        onChange={(e)=>{setDesignation(e.target.value)}} defaultValue="select Designation">
  <Option value="associateTraineee">Associate Trainee</Option>
  <Option value="software Engineer">Software Engineer</Option>
  <Option value="test engineeer">Software Test Engineer</Option>
  <Option value="ui/ux designer">UI /UX Designer</Option>
</Select>
      
    </Space>
  );
};
export default SelectDropdown;