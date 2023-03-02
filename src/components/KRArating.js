import { Rate } from "antd";
import { useState } from "react";

const KRARating = (props) => {
  const [value , setValue] = useState();
  const sendingData = value;
  console.log(value,"+++++");
  const onClick = () =>{
    props.sendData(sendingData);
  }
  return (
    <>
      <Rate onClick={onClick} onChange={(e)=>{setValue(e)}} value={value}
        defaultValue={1}
        character={({ index }) => index + 1}
        style={{ fontSize: "30px", float: "left", marginLeft: "30px" }}
      />
    </>
  ); 
};
export default KRARating;
