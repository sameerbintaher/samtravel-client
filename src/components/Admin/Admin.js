import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Table } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import VisitorList from "../VisitorList/VisitorList";
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
      text: "Delete this tour and client!",
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
              swal("Deleted! Better luck next time", {
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));
      } else {
        swal("You're safe to us");
      }
    });
  };

  const adminLogout = () => {
    localStorage.setItem("admin_info", null);
    swal("Thank You Admin", {
      icon: "success",
    });
    setAdmin(false);
  };
  return (
    <Container fluid className="my-5 text-start h-100" >
      <Row className="h-100 g-4 g-md-0">
        <Col sm="12" md="4" lg="12" className="bg-light mb-5">
          <div className="container p-2 px-md-5 d-flex justify-content-between align-items-center">
            <NavLink
              activeClassName="admin-active-nav-item"
              to="/admin/visitor"
            >
               <button className="btn btn-primary">Total Registered Place</button>
            </NavLink>
            <br />
            <NavLink
              activeClassName="admin-active-nav-item"
              to="/admin/addEvent"
            >
               <button className="btn btn-primary my-3 ms-3">Add Place in Database</button>
            </NavLink>
            <br />
            
            <Nav.Link onClick={adminLogout}>
              {" "}
              <button className="btn btn-primary">Log out from database</button>
            </Nav.Link>
          </div>
        </Col>
        <Col
          sm="12"
          md="8"
          lg="12"
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
