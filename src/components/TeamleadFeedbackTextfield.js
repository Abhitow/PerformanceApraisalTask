import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function TeamleadFeedbackTextfield() {
  return (
    <div style={{float:'right',marginRight:'100px',marginLeft:'20px'}}>
        <TextArea rows={4} style={{width:'400px',marginTop:''}}/>
    </div>
  )
}

export default TeamleadFeedbackTextfield