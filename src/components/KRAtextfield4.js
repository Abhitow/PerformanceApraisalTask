import { Card } from "antd";
import KRArating from "./KRArating";
import KRAselfrating from "./KRAselfrating";

const KRAtextfield4 = () => (
  <>
    <Card style={{borderColor:'green'}}>
      <div style={{display:'flex' ,flexDirection:'column'}}>
      <p style={{fontSize:'17px',marginTop:'-10px',fontWeight:"bold",marginLeft:'-50%'}}>
      Have you considered the following items when coding / Testing? 
        </p>
       
      <p style={{fontSize:'17px',marginTop:'-10px',textAlign:'left'}}>
      1. Code that can be tested.<span style={{textAlign:'left',paddingLeft:'110px'}}>1. Understand the business requirement / process.</span><br/>
      2. Code that is clean and reusable.<span style={{textAlign:'left',paddingLeft:'52px'}}>2. Carry out appropriate planning (Preparng Test plans and Test cases).</span> <br/>
      3. Code that is easy to maintain.<span style={{textAlign:'left',paddingLeft:'72px'}}>3. Actions taken to improve the software quality.</span> <br/>
      4. Code that can be read.<span style={{textAlign:'left',paddingLeft:'123px'}}>4. Tracking active defects.</span> <br/>
      5. Code that is free of bugs.<span style={{textAlign:'left',paddingLeft:'106px'}}>5. Finding and implementing test automation whereever applicable to save time and effort.</span>
        </p>
      </div> 
    </Card>
    
  </>
);
export default KRAtextfield4;