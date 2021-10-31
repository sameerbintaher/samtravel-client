import React from "react";
import { Table } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { processDate2 } from "../../utilities/utilities";

const VisitorList = ({ userEvents, handleDelete }) => {
  return (
    <div className="font container">
      <h1 className="font fw-bold text-success text-center">You total client and their place</h1>
      

              {userEvents.map((event) => (
                <div key={`{event.user.id}${event.eventId}`} 
                className="card my-2 my-md-4 shadow rounded-3">
                <div className="card-body p-md-5 mx-md-auto">
                  <h1><span className="fw-bold">Visitor name:</span> {event.name}</h1>
                  <h3><span className="fw-bold">His/her email:</span> {event.username}</h3>
                  <h2><span className="fw-bold">Registration Date:</span> {processDate2(event.registerDate)}</h2>
                  <h1><span className="fw-bold text-success">{event.event}</span></h1>
                  <button onClick={() => handleDelete(event.eventId, event.userId)} className="btn btn-primary px-3">Delete this client</button>
                </div>
      </div>
  ))}
      

      
    </div>
  );
};

export default VisitorList;
