import { Form, Rate } from "antd";
import {useState , useEffect} from "react";

const KRArating = ({props}) => {

  const [inputValue , setInputValue] = useState();

  const handleChange = (e , value) => {
      setInputValue(e);
  }
  const childData = inputValue;
  // console.log(childData,"ssssssssssssssssssssssssssss");
// console.log(inputValue,"kkkkkkkkkkkkkkkkkkk")
  return (
    <>
          <Rate onChange={handleChange}
          value={inputValue}
            defaultValue={1}
            character={({ index }) => index + 1}
            style={{ fontSize: "30px", float: "left", marginLeft: "30px" }}
          />
    </>
  );
};
export default KRArating;
