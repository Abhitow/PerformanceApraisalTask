import {Col, Input, Row} from 'antd'
import Typography from 'antd/es/typography/Typography';
import axios from 'axios'
import { useEffect, useState } from 'react';
const {Search} = Input;



function SearchDetails() {
  const [users , setUsers] = useState([]);
  const [text , setText] = useState();
  const [suggestions , setSuggestions] = useState([]);
  const [search , setSearch] = useState();
  const [searchDetails , setSearchDetails] = useState();

  useEffect( () =>{
    const loadUsers = async()=>{
      const response = await axios.get("https://demo.emeetify.com:81/appraisel/users/userNames");
      console.log(response.data);
      setUsers(response.data.data);
    }
    loadUsers();
  },[]);

  const onChangeHandler = (text) =>{
    let matches = [];
    if(text.length>0){
        matches = users.filter( (users) => {
            const regex = new RegExp( `${text}`,"gi");
            return users.email.match(regex)
        });
    }
    // console.log(matches,"matches");
    setSuggestions(matches);
    setText(text);  
    setSearch(matches);
  }

  const onSuggestHandler = (text) =>{
    setText(text);
    setSuggestions([]);
  }

  const onSearch = () => {
    if(search.length === 1 && text != null){
      // console.log(search,"searched");
      setSearchDetails(search);
    }else{
      console.log("please enter name")
    }
  };
  console.log(searchDetails,"12456");
  // console.log(search,"6666666");
  return (
    <div style={{marginTop:'20px' , marginLeft:'50px',width:'300px'}}>
      {/* <Search
      placeholder='Employee Name'
      onSearch={onSearch}
      enterButton/> */}
      
      <Search type='text'
      placeholder='Employee Email'
        onChange={(e)=>onChangeHandler(e.target.value)}
        onSearch={onSearch}
        value={text} 
      />
     {suggestions && suggestions.map( (suggestion , i) =>
     <div key={i} className="suggestion" onClick={() =>onSuggestHandler(suggestion.email)}>
        {suggestion.email}
     </div>)}

<div>
   { searchDetails?.length === 1 ?
      <div style={{marginTop:'50px',marginLeft:'100px'}}>
        {console.log("working")}
        <div style={{display:'flex' ,flexDirection:'row'}}>
          <Row style={{display:'flex' , flexDirection:'row'}}>
            <Col span={12}>
            <Typography style={{fontSize:'20px'}}>Name :</Typography>
            <Typography style={{fontSize:'16px',marginTop:'4px'}}>{searchDetails[0].username}</Typography>
            </Col>
            <Col span={12}>
            <Typography style={{fontSize:'20px'}}>Name :</Typography>
            <Typography style={{fontSize:'16px',marginTop:'4px'}}>{searchDetails[0].username}</Typography>
            </Col>
          </Row>
                  </div>
      </div>:
      <div>
         {console.log("not working")}
      </div>
    
    }
   
  
</div>
    </div>
  );
}

export default SearchDetails;


