import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import "./Home.css";
import { useHistory } from "react-router";
import AOS from "aos";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Contact from "../Contact/Contact";
AOS.init({
  disable: false,
  startEvent: "DOMContentLoaded",
  initClassName: "aos-init",
  animatedClassName: "aos-animate",
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
});

const Home = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://floating-savannah-80284.herokuapp.com/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const handleEvent = (id) => {
    history.push(`/register/${id}`);
  };
  return (
    <Container
      fluid
      className="position-relative"
      // onClick={() => setIsMenuOpen(false)}
      style={{fontFamily:'Josefin Sans'}}
    >
      <Banner></Banner>
      
      <Container>
        
        <div className='my-5'>
          <h1 className="text-primary">Upcoming Tours</h1>
          <h4>Let us transport you with our highly affordable and reliable holiday packages</h4>
        </div>

        <Row className="p-md-5 bg-light rounded-3 shadow">
          {events.length > 0 ? (
            events.map((event) => (
              <Col
                key={event._id}
                data-aos="zoom-in"
                data-aos-duration="800"
                className=""
              >
                <div className="card shadow-sm my-3 mx-auto" style={{width: "20rem"}}>
                  <img src={event.img} style={{height: "250px"}} class="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h1 className="card-title">{event.title}</h1>
                    <p className="card-text" style={{textAlign: "left"}}>{event.description}</p>
                    <h4 style={{textAlign: "left"}}>Next tour will be <br /> {event.date}</h4>
                    <h4 style={{textAlign: "left"}}>Total Estimated travel cost: ${event.price}</h4>
                    <button className="btn btn-primary" onClick={() => handleEvent(event._id)}>Book this tour</button>
                  </div>
                </div> 
              </Col>
            ))
          ) : (
            <Col sm="2" lg="1" className="mx-auto">
              <Spinner animation="border" variant="secondary" />
            </Col>
          )}
        </Row>
      </Container>

      <About></About>
      <Contact></Contact>
    </Container>
  );
};

export default Home;
