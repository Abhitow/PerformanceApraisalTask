import { Select, Space } from 'antd';
import { useState } from 'react';
const designationData = ['Select Department', 'Development' ,'Marketing', 'Testing','UI/UX Desgin' ];

const DepartmentDropdown = () => {
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
export default DepartmentDropdown;