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
      .get("https://fast-ravine-50741.herokuapp.com/events")
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
        
        <div>

          <Row className='my-2'>
            <Col sm={10} md={7} lg={5} xl={4} className="mx-auto mt-3 mb-5 ">
              <h1 className="my-5">Our Special Service</h1>
            </Col>
          </Row>
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
                <div className="event-item">
                  <div className="event-img">
                    <img className="img-fluid" src={event.img} alt="" />
                  </div>
                  <div
                    style={{ backgroundColor: randomColor() }}
                    className="event-text"
                  >
                    <h6>{event.title}</h6>
                  </div>
                  <div className="event-overlay">
                    <div className="event-icons">
                      <BsFillBookmarkStarFill className="event-book"></BsFillBookmarkStarFill>
                      <FiHeart className="event-heart"></FiHeart>
                      <BsThreeDots className="event-dot"></BsThreeDots>
                    </div>
                    <div className="event-add">
                      <AiOutlineAppstoreAdd
                        onClick={() => handleEvent(event._id)}
                        className="add-icon"
                      ></AiOutlineAppstoreAdd>
                    </div>
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
