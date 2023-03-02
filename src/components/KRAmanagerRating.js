import { Rate } from "antd";
import { useState } from "react";

const KRAmanagerRating = () => {
  const [value , setValue] = useState();
  // console.log(value);
  return (
    <>
      <Rate onChange={(e)=>{setValue(e)}} value={value}
        defaultValue={1}
        character={({ index }) => index + 1}
        style={{ fontSize: "30px", float: "left", marginLeft: "30px" }}
      />
    </>
  ); 
};
export default KRAmanagerRating;
