import { Card } from "antd";
import KRArating from "./KRArating";
import KRAselfrating from "./KRAselfrating";

const KRAtextfield2 = () => (
  <>
    <Card style={{borderColor:'blue'}}>
      <div style={{display:'flex' ,flexDirection:'column'}}>
      <p style={{fontSize:'17px',marginTop:'-10px',fontWeight:"bold"}}>
        Your ability to complete the task in a timely manner and ability to plan how to
        complete the assigned task, as well as your accuracy in presenting the results.
        </p>
      <p style={{fontSize:'17px',marginTop:'-10px'}}>
            Ability to see  new “thing” in a wider perspective, for example how a small library
            fit into a large project or product, Finding better ways to achieve your projects
            goals, Understanding the specifications for the “thing” you are about to implement
        </p>
      </div> 
    </Card>
    
  </>
);
export default KRAtextfield2;