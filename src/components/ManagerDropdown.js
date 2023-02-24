import { Select, Space } from 'antd';
import { useState } from 'react';
const designationData = ['Select Manager','Arun Karthikeyan', 'Arun P' ,'Raj Manikam' ];

const ManagerDropdown = () => {
    const [designation , setDesignation] = useState();
 const handleProvinceChange=()=>{

 }
  return (
    <Space wrap>
      <Select
        defaultValue={designationData[0]}
        style={{
          width: 250,marginLeft:'20px'
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
export default ManagerDropdown;