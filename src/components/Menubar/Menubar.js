import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Menubar.css";
import useAuth from "../../hooks/useAuth";
import { AiFillCloseCircle } from "react-icons/ai";
import avater from "../../images/avater2.png";

const Menubar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="position-relative">
      
      <Navbar className="menubar px-md-5" expand="lg" fixed="top">
        
          <Navbar.Brand className=" d-md-block bg-primary px-3 rounded-3 text-white" as={NavLink} to="/home">
            <h2>SamTarvel</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                as={NavLink}
                to="/home"
                className="nav-item"
                activeClassName="active-item"
              >
                Home
              </Nav.Link>

              {
                user.email&&(<Nav.Link
                  as={NavLink}
                  to="/user_events"
                  className="nav-item"
                  activeClassName="active-item"
                >
                  Manage Booking
                </Nav.Link>)
              }

              {
                user.email&&(<Nav.Link
                  as={NavLink}
                  to="/admin/visitor"
                  className="user-nav-item"
                  activeClassName="active-item"
                >
                  Admin Dashboard
                </Nav.Link>)
              }
              
            </Nav>

            
          </Navbar.Collapse>
          {!user.displayName ? (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/login"
                className="user-nav-item"
                activeClassName="active-item"
              >
                <button className="btn btn-primary">
                  Login
                </button>
              </Nav.Link>
            </Nav>
          ) : (
            
            <Navbar.Brand>
              <img
                src={user.photoURL || avater}
                alt=""
                height="45px"
                width="45px"
                className="rounded-circle user-avater"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </Navbar.Brand>
          )}
        
      </Navbar>

      <div
        className="user-menu text-start"
        onBlur={() => setIsMenuOpen(false)}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <AiFillCloseCircle
          className="clos-btn"
          onClick={() => setIsMenuOpen(false)}
        ></AiFillCloseCircle>
        <br />

        <div className="mx-auto  p-3 d-flex justify-content-center">
          <img
            src={user.photoURL || avater}
            className="img-fluid rounded-circle mx-auto  "
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
        <h5 className="mt-2 text-center">
          {user.displayName || "No User"}
        </h5>
        <h6 className="text-center">{user.email}</h6>
        <hr />

        
        
        {user.displayName ? (
          <Nav.Link className="text-dark text-center" onClick={logOut}>
            {" "}
            <button className='btn btn-primary'>Log Out</button>
          </Nav.Link>
        ) : (
          <Nav.Link
            as={NavLink}
            to="/login"
            className="user-nav-item"
            activeClassName="active-item"
          >
             Login
          </Nav.Link>
        )}
      </div>
    </div>
  );
};

export default Menubar;
