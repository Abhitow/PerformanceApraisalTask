import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

function KRAselfrating() {
  const [selfInput , setSelfInput] = useState("");
  // console.log(selfInput);
  return (
    <div style={{float:'right',marginRight:'100px'}}>
        <TextArea value={selfInput} onChange={(e)=>{setSelfInput(e.target.value)}}
        rows={4} style={{width:'400px',marginTop:''}}/>
    </div>
  )
}

export default KRAselfrating