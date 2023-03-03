<<<<<<< HEAD
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
=======
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
>>>>>>> a8e760b541ab43d308492d1e406d6128fd8b6032
    </>
  ); 
};
export default KRARating;
