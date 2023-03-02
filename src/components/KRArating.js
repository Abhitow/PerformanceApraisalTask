// import { Select, Space ,Label } from 'antd';
// import { useState } from 'react';
// const designationData = ['Select Rating','1', '2' ,'3','4','5' ];

// const KRArating = () => {
//     const [designation , setDesignation] = useState();
//  const handleProvinceChange=()=>{

//  }
//   return (
//     <Space wrap style={{float:'left'}}>
//       <Select
//         defaultValue={designationData[0]}
//         style={{
//           width: 250,marginLeft:'20px'
//         }}
//         onChange={handleProvinceChange}
//         options={designationData.map((province) => ({
//           label: province,
//           value: province,
//         }))}
//       />

//     </Space>
//   );
// };
// export default KRArating;
import { Form, Rate } from "antd";
import { useState } from "react";

const KRArating = () => {
  const [form] = Form.useForm();
  const[value , setValue] = useState();
  // console.log(value);
  return (
    <>
      <Form form={form}>
        <Form.Item>
          <Rate onChange={(e)=>{setValue(e)}} value={value}
            defaultValue={1}
            character={({ index }) => index + 1}
            style={{ fontSize: "30px", float: "left", marginLeft: "30px" }}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default KRArating;
