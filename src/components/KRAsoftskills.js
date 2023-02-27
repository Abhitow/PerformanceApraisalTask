import { Divider, Typography } from 'antd'
import React from 'react'

import KRAfirstquestion from './KRAfirstquestion'
import KRAfivequestionSoftSkill from './KRAfivequestionSoftSkill'
import KRAfourquestionSoftSkill from './KRAfourquestionSoftSkill'
import KRAonequestionSoftSkill from './KRAonequestionSoftSkill'
import KRAsecquestion from './KRAsecquestion'
import KRAsixquestionSoftSkill from './KRAsixquestionSoftSkill'
import KRAthreequestionSoftSkill from './KRAthreequestionSoftSkill'
import KRAtwoquestionSoftSkill from './KRAtwoquestionSoftSkill'
function KRAdetails() {
  return (
    <div>
        <h1>KRA - Softskills</h1>
        <Divider />
       <KRAonequestionSoftSkill/>
       <KRAtwoquestionSoftSkill style={{marginTop:'20px'}}/>
       <KRAthreequestionSoftSkill />
       <KRAfourquestionSoftSkill />
       <KRAfivequestionSoftSkill />
       <KRAsixquestionSoftSkill />
      

        
       
    </div>
  )
}

export default KRAdetails