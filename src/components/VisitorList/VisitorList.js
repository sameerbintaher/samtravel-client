import React from "react";
import { Table } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { processDate2 } from "../../utilities/utilities";

const VisitorList = ({ userEvents, handleDelete }) => {
  return (
    <div>
      <h1 className="font fw-bold text-success text-center">You total client and their place</h1>
      <div className="p-4" style={{overflowX: 'auto'}}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registration date</th>
              <th>Place</th>
              <th>Your Action</th>
            </tr>
          </thead>
          <tbody>
            {userEvents.map((event) => (
              <tr key={`${event.userId}${event.eventId}`}>
                <td>{event.name}</td>
                <td>{event.username}</td>
                <td>{processDate2(event.registerDate)}</td>
                <td>{event.event}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(event.eventId, event.userId)}
                    className="admin-delete-btn"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorList;
