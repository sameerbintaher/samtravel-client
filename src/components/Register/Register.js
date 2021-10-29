import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  const { user } = useAuth();
  const history = useHistory();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/event/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  setValue("name", user.displayName);
  setValue("username", user.email || user.displayName);
  setValue("event", event.title);

  const onSubmit = (data) => {
    setIsUpdated(true);
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    data.registerDate = currentDate;
    data.eventId = event.eventId;
    data.userId = user.uid;

    axios
      .post("http://localhost:5000/event/register", data)
      .then((res) => {
        if (res.data?.eventAdded) {
          swal({
            title: "SORRY!",
            text: "You already booked it",
            icon: "error",
            buttons: "back to Home",
          });
        }
        if (res.data.insertedId) {
          swal(
            "YAYY!! Your Booking is confirmed",
            "We have noted your info. For further case we will contact with you",
            "success"
          );
          history.push("/home");
        }
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsUpdated(false);
        swal("Registration Failed", err.message, "error");
      });
  };
  return (
    <Container className="my-5">
      <h1 className="text-primary">Please fill up this requirements</h1>
      <h3>Then we will confirm your booking</h3>
      <Row>
        <Col sm="12" md="8" lg="6" xl="5" className="mx-auto text-start mt-5">
          <div className="reg-form">
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">Your full Name </label> <br />
              <input {...register("name")} /> <br />
              <label htmlFor="">Your Username Or Email</label> <br />
              <input {...register("username", { required: true })} /> <br />
              <label htmlFor="">Your exact possible travel date</label> <br />
              <input
                type="date"
                {...register("eventDate", { required: true })}
                placeholder="Date"
              />{" "}
              
              <br />
              <label htmlFor="">Where to go</label> <br />
              <input {...register("event")} /> <br />
              <button type="submit" className="rag-submit w-100">
                {isUpdated ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ height: "25px", width: "25px" }}
                  />
                ) : (
                  "Confirm Booking"
                )}
              </button>
              {errors.exampleRequired && <span>This field is required</span>}
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
