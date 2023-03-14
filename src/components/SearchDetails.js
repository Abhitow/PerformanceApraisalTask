import { Card, Col, Divider, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Typography from "antd/es/typography/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
const { Search } = Input;

function SearchDetails() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState();
  const [searchDetails, setSearchDetails] = useState();
  const [answer, setAnswer] = useState();
  const [email, setEmail] = useState();
  const [comment, setComment] = useState();
  const [empData, setEmpData] = useState();
  const [avgTotal , setAvgTotal] = useState();
  // console.log(comments,"kkkkkkkkkkk");

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((users) => {
        const regex = new RegExp(`${text}`, "gi");
        return users.email.match(regex);
      });
    }
    // console.log(matches,"matches");
    setSuggestions(matches);
    setText(text);
    setSearch(matches);
  };

  console.log(text, "///////////");

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onSearch = () => {
    if (search.length === 1 && text != null) {
      console.log(search[0].email, "searched -------->");

      if (text === search[0].email) {
        console.log(search[0].comments);
        setEmpData(search[0].comments);
      } else {
        console.log("not matched");
      }

      setSearchDetails(search);
    } else {
      console.log("please enter name");
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://demo.emeetify.com:81/appraisel/users/userNames"
      );
      setUsers(response.data.data);
      let userDetails = response.data.data;

      for (let i = 0; i < userDetails.length; i++) {
        let comments = userDetails[i].comments;
        for (let j = 0; j < comments.length; j++) {
          const element = comments[j];
          // console.log(element,"------>");
          setComment(element);
        }
      }
    };
    loadUsers();
  }, []);

  
  useEffect( () =>{
    axios.get("https://demo.emeetify.com:81/appraisel/users/Consolidate?email="+text)
    .then((response) =>{setAvgTotal(response.data.data)})
    .catch(e => console.log(e , "error Message"));
  },[text])

  // console.log(searchDetails[0].email,"ddddddddddddd");

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/appraisel/users/getDetails")
      .then((response) => {
        setAnswer(response.data.data);
      })
      .catch((e) => {
        console.log(e, "error message");
      });
  }, []);

  return (
    <div>
      <Search
        type="text"
        style={{ width: "300px", marginLeft: "150px", marginTop: "-35px" }}
        placeholder="Employee Email"
        onChange={(e) => onChangeHandler(e.target.value)}
        onSearch={onSearch}
        value={text}
      />
      {suggestions &&
        suggestions.map((suggestion, i) => (
          <div style={{marginLeft:'155px'}}
            key={i}
            className="suggestion"
            onClick={() => onSuggestHandler(suggestion.email)}
          >
            {suggestion.email}
          </div>
        ))}

      <div style={{ marginLeft: "45px" }}>
        {searchDetails?.length === 1 ? (
          <div style={{ marginTop: "10px", marginLeft: "100px" }}>
            {/* <Typography style={{fontSize:'20px',marginLeft:'250px'}}>{searchDetails[0].username}</Typography> */}

            <Card style={{ width: "900px", marginLeft: "-115px" }}>
              <Row className="search-details-card">
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    Name of Employee:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    {searchDetails[0].username}
                  </Typography>
                </Col>
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "40px" }}>
                    Manager Name:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    {searchDetails[0].manager_name}
                  </Typography>
                </Col>
              </Row>

              <Row className="search-details-card">
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    Role Id:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "125px" }}>
                    {searchDetails[0].role_id}
                  </Typography>
                </Col>
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "40px" }}>
                    Designation:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "56px" }}>
                    {searchDetails[0].designation}
                  </Typography>
                </Col>
              </Row>

              <Row className="search-details-card">
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    Department:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "85px" }}>
                    {searchDetails[0].department}
                  </Typography>
                </Col>
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "40px" }}>
                    Joining Date:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "53px" }}>
                    {searchDetails[0].joining_date}
                  </Typography>
                </Col>
              </Row>

              <Row className="search-details-card">
                <Col span={12} className="search-details-column">
                  <Typography style={{ fontSize: "18px", marginLeft: "30px" }}>
                    Review Period:
                  </Typography>
                  <Typography style={{ fontSize: "18px", marginLeft: "20px" }}>
                    {searchDetails[0].review_period}
                  </Typography>
                </Col>
              </Row>

              {answer !== undefined &&
                answer.map((d, index) => {
                  return (
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
                            <div></div>
                          </Card>
                        </div>

                        {empData !== undefined &&
                          empData.map((item, index) => {
                            if (d.t_id === item.t_id) {
                              return (

                                <>
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
                                      <div>
                                        <Card
                                          className="fetchedDetailedRating"
                                          key={item.t_id}
                                        >
                                          <Typography
                                            style={{
                                              fontSize: "20px",
                                              marginTop: "-23px",
                                              marginLeft: "25px",
                                              fontWeight: "light",
                                            }}
                                          >
                                            {item.self_rating}
                                          </Typography>
                                        </Card>
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
                                      <div>
                                        <Card style={{marginLeft:'-180px',marginRight:'20px'}}
                                          className="fetchedCard"
                                          key={item.t_id}
                                        >
                                          <Typography
                                            style={{
                                              marginTop: "-15px",
                                              marginLeft: "-5px",
                                              fontSize: "16px",
                                            }}
                                          >
                                            {item.self_comment}
                                          </Typography>
                                        </Card>
                                      </div>
                                    </Form.Item>
                                  </Col>
                                </Row>

                                <Row style={{ marginTop: "20px" }}>
                                  <Col span={12}>
                                    <Form.Item
                                      style={{ marginLeft: "100px" }}
                                      name="selfRating"
                                      label={
                                        <label className="self-rating">
                                          Manager Rating
                                        </label>
                                      }
                                    >
                                      <div>
                                        <Card style={{marginLeft:'-140px'}}
                                          className="fetchedDetailedRating"
                                          key={item.t_id}
                                        >
                                          <Typography
                                            style={{
                                              fontSize: "20px",
                                              marginTop: "-23px",
                                              marginLeft: "25px",
                                              fontWeight: "light",
                                            }}
                                          >
                                            {item.manager_rating}
                                          </Typography>
                                        </Card>
                                      </div>
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      label={
                                        <label style={{marginLeft:'5px'}} className="self-comment">
                                          Manager Comment
                                        </label>
                                      }
                                      name="selfComment"
                                    >
                                      <div>
                                        <Card style={{marginLeft:'-160px',marginRight:'20px'}}
                                          className="fetchedCard"
                                          key={item.t_id}
                                        >
                                          <Typography
                                            style={{
                                              marginTop: "-15px",
                                              marginLeft: "-5px",
                                              fontSize: "16px",
                                            }}
                                          >
                                            {item.manager_comment}
                                          </Typography>
                                        </Card>
                                      </div>
                                    </Form.Item>
                                  </Col>
                                </Row>
                                </>
                                // <Typography key={item.t_id}>{item.self_rating}</Typography>
                                // <Typography>hiiiii</Typography>
                                

                                
                              );
                            }
                          })}
                      </Form>
                    </>
                  );
                })}

<Divider
                    style={{
                      marginTop: "60px",
                      backgroundColor: "violet",
                      height: "5px",
                    }}
                  />

<Row>
                    <Col span={12}>
                      <Form.Item
                        readOnly
                        label={
                          <label
                            style={{ fontSize: "18px", marginLeft: "100px" }}
                          >
                            Employee Self Rating
                          </label>
                        }
                      >
                        <Card
                          style={{
                            height: "50px",
                            width: "100px",
                            marginTop: "50px",
                            marginLeft: "-185px",
                          }}
                        >
                          <Typography
                            style={{
                              textAlign: "center",
                              margin: "auto",
                              marginTop: "-20px",
                              fontSize: "24px",
                            }}
                          > {avgTotal?.self_rating}</Typography>
                        </Card>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginLeft: "15px" }}
                        label={
                          <label style={{marginLeft:'30px'}} className="self-aspiration">
                            Self Aspiration
                          </label>
                        }
                        name="selfAspiration"
                      >
                        <div>
                            <Card style={{ marginTop: "10px", marginLeft: "30px",width:'380px',height:'100px'}}>
                            <Typography
                            rows={4}
                          >{empData?.self_aspiration}</Typography>
                            </Card>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col span={12}>
                      <Form.Item
                        readOnly
                        label={
                          <label
                            style={{ fontSize: "18px", marginLeft: "100px" }}
                          >
                            Manager's Consolidated Rating
                          </label>
                        }
                      >
                        <Card
                          style={{
                            height: "50px",
                            width: "100px",
                            marginTop: "50px",
                            marginLeft: "-250px",
                          }}
                        >
                          <Typography
                            style={{
                              textAlign: "center",
                              margin: "auto",
                              marginTop: "-20px",
                              fontSize: "24px",
                            }}
                          >
                            {avgTotal?.manager_rating}
                          </Typography>
                        </Card>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <label style={{marginLeft:'45px'}} className="teamlead-feedback">
                            Manager's Feedback
                          </label>
                        }
                        name="managerFeedback"
                      >
                        <div>
                          <Card style={{ marginTop: "10px", marginLeft: "45px",width:'380px',height:'100px'}}>
                          <Typography
                            rows={4}
                          >{empData?.manager_feedback}</Typography>
                          </Card>
                         
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
            </Card>
          </div>
        ) : (
          <div>{console.log("")}</div>
        )}
      </div>
    </div>
  );
}

export default SearchDetails;
