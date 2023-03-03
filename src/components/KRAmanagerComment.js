import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function KRAmanagerComment(props) {
  const [input , setInput]= useState("");
  // console.log(input);
  return (
    <div style={{ float: "right", marginRight: "100px" }}>
      <TextArea value={input}  onChange={(e)=>{setInput(e.target.value)}}
      rows={4} style={{ width: "400px", marginTop: "" }} />
    </div>
  );
}

export default KRAmanagerComment;
