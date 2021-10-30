import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Table } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import "./Admin.css";
import axios from "axios";
import swal from "sweetalert";
import VisitorList from "../VisitorList/VisitorList";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import AddEvent from "../AddEvent/AddEvent";
import AllPlaces from "../AllPlaces/AllPlaces";

const Admin = () => {
  const [userEvents, setUserEvents] = useState([]);
  const { setAdmin } = useAuth();
  useEffect(() => {
    axios
      .get("https://floating-savannah-80284.herokuapp.com/event_list")
      .then((res) => {
        setUserEvents(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleDelete = (eventId, userId) => {
    swal({
      title: "Are you sure?",
      text: "Delete this Events and user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://floating-savannah-80284.herokuapp.com/user/events/${eventId}/${userId}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = userEvents.filter(
                (event) =>
                  !(event.eventId === eventId && event.userId === userId)
              );
              console.log(remaining);
              setUserEvents(remaining);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const adminLogout = () => {
    localStorage.setItem("admin_info", null);
    swal("successful Logout Admin", {
      icon: "success",
    });
    setAdmin(false);
  };
  return (
    <Container fluid className="my-5 text-start h-100">
      <Row className="h-100 g-4 g-md-0">
        <Col sm="12" md="4" lg="3" className="h-100">
          <div className="p-4">
            <NavLink
              className="admin-nav-item"
              activeClassName="admin-active-nav-item"
              to="/admin/visitor"
            >
              <FiUsers></FiUsers> Total Registered Place
            </NavLink>
            <br />
            <NavLink
              className="admin-nav-item btn btn-primary"
              activeClassName="admin-active-nav-item"
              to="/admin/addEvent"
            >
               Add Place in Database
            </NavLink>
            <br />
            
            <Nav.Link className="user-nav-item" onClick={adminLogout}>
              {" "}
              <FiLogOut className="me-2"></FiLogOut>Log out
            </Nav.Link>
          </div>
        </Col>
        <Col
          sm="12"
          md="8"
          lg="9"
          className="ps-2"
          style={{ borderLeft: "1px solid #adadad" }}
        >
          <Switch>
            <Route path="/admin/visitor">
              <VisitorList
                userEvents={userEvents}
                handleDelete={handleDelete}
              ></VisitorList>
            </Route>
            <Route path="/admin/addEvent">
              <AddEvent></AddEvent>
            </Route>
            <Route path="/admin/allPlaces">
              <AllPlaces></AllPlaces>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
