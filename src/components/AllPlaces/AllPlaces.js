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
      text: "Delete this tour and client!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://floating-savannah-80284.herokuapp.com/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = allEvents.filter(
                (event) => event.eventId !== id
              );
              console.log(remaining);
              setAllEvents(remaining);
              swal("Sorry! Better luck next time", {
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

  useEffect(() => {
    axios
      .get("https://floating-savannah-80284.herokuapp.com/events")
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
