import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import { processDate, processDate2 } from "../../utilities/utilities";

const AllPlaces = () => {
  const [allEvents, setAllEvents] = useState([]);
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete this Events and user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = allEvents.filter(
                (event) => event.eventId !== id
              );
              console.log(remaining);
              setAllEvents(remaining);
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setAllEvents(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      <h1>All Places </h1>
      <div className="p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Visit Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((event, index) => (
              <tr key={`${event.userId}${event.eventId}`}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{processDate2(event.date)}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(event._id)}
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

export default AllPlaces;
