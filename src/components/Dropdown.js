import { Select, Space } from 'antd';
import { useState } from 'react';
const designationData = ['Select Designation','Associate Trainee', 'Software Engineer' , 'Software Test Engineer'];
const SelectDropdown = () => {
    const [designation , setDesignation] = useState();
 const handleProvinceChange=()=>{

 }
  return (
    <Space wrap>
      <Select
        defaultValue={designationData[0]}
        style={{
          width: 250,marginLeft:'65px'
        }}
        onChange={handleProvinceChange}
        options={designationData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      
    </Space>
  );
};
export default SelectDropdown;