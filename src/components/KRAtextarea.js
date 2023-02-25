import { Card } from "antd";
import KRArating from "./KRArating";
import KRAselfrating from "./KRAselfrating";

const KRAtextfield = () => (
  <>
    <Card style={{borderColor:'blue'}}>
      <div style={{display:'flex' ,flexDirection:'column'}}>
      <p style={{marginLeft:'-20%',fontSize:'17px',marginTop:'-10px',fontWeight:"bold"}}>Your ability to self-learn and apply new technologies, protocols, libraries, or even languages as needed.</p>
      <p style={{marginLeft:'-63%',fontSize:'17px',marginTop:'-10px'}}>How good you are at learning technical things ? </p>
      <p style={{marginLeft:'-56%',fontSize:'17px',marginTop:'-10px'}}>Example: Pace of learning, comprehension of the concept</p>
      </div> 
    </Card>
    
  </>
);
export default KRAtextfield;