import { Divider } from 'antd'
import React from 'react'

import KRAfirstquestion from './KRAfirstquestion'
import KRAfivequestion from './KRAfivequestion'
import KRAfourquestion from './KRAfourquestion'
import KRAsecquestion from './KRAsecquestion'
import KRAthirdquestion from './KRAthirdquestion'
function KRAdetails() {
  return (
    <div>
        <h1 >KRA-Technical Aspects</h1>
        <Divider />
       <KRAfirstquestion />
       <KRAsecquestion style={{marginTop:'20px'}}/>
       <KRAthirdquestion />
       <KRAfourquestion />
       <KRAfivequestion />

        
       
    </div>
  )
}

export default KRAdetails