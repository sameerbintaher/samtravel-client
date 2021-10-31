import axios from "axios";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { randomId } from "../../utilities/utilities";
import "./AddEvent.css"

const AddEvent = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.eventId = randomId();
    axios
      .post("https://floating-savannah-80284.herokuapp.com/events", data)
      .then((res) => {
        if (res.data.insertedId) {
          swal({
            title: " Successful",
            text: "Successfully added your entered Event",
            icon: "success",
          });
          reset();
        } else {
          swal({
            title: "something went wrong",
            text: "we are triable to save this events",
            icon: "error",
          });
          reset();
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="font container p-md-5">
      <h1 className="text-primary">Add a new place in Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row sm="1" md="1" className="g-4">
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Name of Place</Form.Label>
              <Form.Control
                {...register("title", { required: true })}
                type="text"
                placeholder="name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control
                {...register("price", { required: true })}
                type="price"
                placeholder="$"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Place Description</Form.Label>
              <Form.Control
                as="textarea"
                {...register("description", { required: true })}
                rows="4"
                placeholder="provide some attraction description"
              />
            </Form.Group>
          </Col>
          <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Travel date</Form.Label>
              <Form.Control
                {...register("date", { required: true })}
                type="date"
                placeholder="....write here"
              />
            </Form.Group>
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Image of this Place</Form.Label>
              <Form.Control
                {...register("img", { required: true })}
                type="text"
                placeholder="image url"
              />
            </Form.Group>
          </Col>
          <input
            type="submit"
            value="Confirm this place"
            className="w-50 mx-auto btn-primary py-2 rounded-3"
          />
        </Row>
      </form>
    </div>
  );
};

export default AddEvent;
