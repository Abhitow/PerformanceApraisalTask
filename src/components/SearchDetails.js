import {Card, Col, Form, Input, Row, Select} from 'antd'
import TextArea from 'antd/es/input/TextArea';
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
  const [answer , setAnswer] = useState();

  useEffect( () =>{
    const loadUsers = async()=>{
      const response = await axios.get("https://demo.emeetify.com:81/appraisel/users/userNames");
      // console.log(response.data);
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

  useEffect( () =>{
    axios.get("https://demo.emeetify.com:81/appraisel/users/getDetails")
    .then( (response) => {setAnswer(response.data.data)})
    .catch( (e) => {console.log(e ,"error message")});
  },[]);

  return (
    <div >
      <Search type='text' style={{width:'300px' , marginLeft:'150px',marginTop:'-35px'}}
      placeholder='Employee Email'
        onChange={(e)=>onChangeHandler(e.target.value)}
        onSearch={onSearch}
        value={text} 
      />
     {suggestions && suggestions.map( (suggestion , i) =>
     <div key={i} className="suggestion" onClick={() =>onSuggestHandler(suggestion.email)}>
        {suggestion.email}
     </div>)}

<div style={{marginLeft:'45px'}}>
   { searchDetails?.length === 1 ?
      <div style={{marginTop:'10px',marginLeft:'100px'}}>
        {/* <Typography style={{fontSize:'20px',marginLeft:'250px'}}>{searchDetails[0].username}</Typography> */}

          <Card style={{width:'900px',marginLeft:'-115px'}}>

          <Row className='search-details-card'>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>Name of Employee:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>{searchDetails[0].username}</Typography>
            </Col>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'40px'}}>Manager Name:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>{searchDetails[0].manager_name}</Typography>
            </Col>
          </Row>

          <Row className='search-details-card'>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>Role Id:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'125px'}}>{searchDetails[0].role_id}</Typography>
            </Col>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'40px'}}>Designation:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'56px'}}>{searchDetails[0].designation}</Typography>
            </Col>
          </Row>

          <Row className='search-details-card'>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>Department:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'85px'}}>{searchDetails[0].department}</Typography>
            </Col>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'40px'}}>Joining Date:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'53px'}}>{searchDetails[0].joining_date}</Typography>
            </Col>
          </Row>

          <Row className='search-details-card'>
            <Col span={12} className="search-details-column" >
              <Typography style={{fontSize:'18px',marginLeft:'30px'}}>Review Period:</Typography>
              <Typography style={{fontSize:'18px',marginLeft:'20px'}}>{searchDetails[0].review_period}</Typography>
            </Col>
          </Row>

          {answer !==undefined && answer.map((d,index) =>{
              return(
                      <>
                        <Form>

                        <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "10px",
                            }}
                          >
                            <Row>
                              <Col style={{ float: "left", fontSize: "12px" }}>
                                <h1 key={d.t_id}>{d.kra_id} : </h1>
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                style={{
                                  float: "left",
                                  fontSize: "12px",
                                  marginLeft: "4px",
                                  fontWeight: "none",
                                }}
                              >
                                <h1 key={d.t_id}> {d.kra}</h1>
                              </Col>
                            </Row>
                          </div>
                          <div>
                            <Card
                              style={{
                                height: "75px",
                                borderColor: "blue",
                                textAlign: "left",
                                marginTop: "0px",
                                marginLeft: "10px",
                                marginRight: "20px",
                              }}
                            >
                              <p
                                style={{ fontSize: "17px", marginTop: "-10px" }}
                                key={d.t_id}
                              >
                                {d.measures}
                              </p>
                            </Card>
                          </div>

                          <div>
                            <Row style={{ marginTop: "20px" }}>
                              <Col span={12}>
                                <Form.Item
                                  style={{ marginLeft: "100px" }}
                                  name="selfRating"
                                  label={
                                    <label className="self-rating">
                                      Self Rating
                                    </label>
                                  }
                                >
                                  <div
                                    className="self-rating-input"
                                    key={d.t_id}
                                  >
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label={
                                    <label className="self-comment">
                                      Justify Your Comment
                                    </label>
                                  }
                                  name="selfComment"
                                >
                                  <div
                                    className="self-comment-input"
                                    key={d.t_id}
                                  >
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>
           
                        </Form>
                      </>
              )
            })
          }

           

          </Card>
      </div>
      :
      <div>
         {console.log("not working")}
      </div>
    
    }
   
  
</div>
    </div>
  );
}

export default SearchDetails;


