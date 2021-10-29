import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { BsThreeDots, BsFillBookmarkStarFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import "./Home.css";
import { useHistory } from "react-router";
import { randomColor } from "../../utilities/utilities";
import AOS from "aos";
import Banner from "../Banner/Banner";
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
      .get("http://localhost:5000/events")
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
    >
      <Banner></Banner>
      
      <Container>
        
        <div className='my-5'>
          <h1 className="text-primary">Our Most Desire Place</h1>
          <h4>Let us transport you with our highly affordable and reliable holiday packages</h4>
        </div>

        <Row className="g-3 g-md-4 g-lg-5">
          {events.length > 0 ? (
            events.map((event) => (
              <Col
                key={event._id}
                data-aos="zoom-in"
                data-aos-duration="800"
                className="ms-4 ms-md-0"
              >
                <div className="border rounded-3 shadow my-5">
                  <div className="">
                    <img className="img" src={event.img} alt="" />
                  </div>
                  <p className="my-2 p-2">{event.description}</p>
                  <div className='pt-5'>
                  
                    <h1>This is <span className="text-primary">{event.title}</span></h1>
                    <h4>Estimated Cost: <span className="text-primary">${event.price}</span></h4>
                  </div>

                  
                    <div className="p-5 ">
                      <button className="btn btn-primary w-50" onClick={() => handleEvent(event._id)}>Book this place</button>
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
    </Container>
  );
};

export default Home;
