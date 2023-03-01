import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Technical() {
    const [detail , setDetail] =useState("");

    const fetchProject = () =>{
        axios.get("https://demo.emeetify.com:81/appraisel/users/getDetails")
        .then(response => setDetail(response.data.data))
        .catch(e =>{console.log("e" ,e)})   
    }
    
    console.log(detail);
    useEffect( ()=>{
      fetchProject();
     },[])
  return (
    <div>
      {detail.map( (d)=>{
        return(
         <p>{d.Kra}</p>
        )
      })}
  </div>
  )
}

export default Technical