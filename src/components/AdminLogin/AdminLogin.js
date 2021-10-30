import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
const AdminLogin = () => {
  const nameRef = useRef();
  const passRef = useRef();
  const uName = "sameerbintaher";
  const pass = "123456";
  const { setAdmin } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const redirect_uri = location?.state?.from || "/";
  console.log(redirect_uri);
  console.log(location?.state?.from);

  const handleSubmit = (e) => {
    const username = nameRef.current.value;
    const password = passRef.current.value;

    if (username === uName && password === pass) {
      localStorage.setItem("admin_info", "ADMINinfo9910099");
      swal({
        title: "Login Successful",
        text: "Now you can control the database",
        icon: "success",
        button: "ok",
      });
      setAdmin(true);

      history.push(redirect_uri);
    } else {
      swal({
        title: "Login Failed",
        text: "Invalid username and password",
        icon: "error",
        button: "try Again",
      });
    }

    e.preventDefault();
  };
  return (
    <div className="py-5" style={{fontFamily:'Josefin Sans'}}>
      <h1 className="text-primary my-5" style={{fontWeight:'700'}}>Manage Client's Travel and Places</h1>

      <div className="mx-auto container ">
        <form className='border p-md-5 shadow'>
          <h5>Your username provided from office</h5>
          <input className="w-50 mb-4" type="text" placeholder="sameerbintaher" ref={nameRef} /> <br />
          <h5>Your Secured Password</h5>
          <input className="w-50 mb-4" type="password" placeholder="123456" ref={passRef} /> <br />
          <input className="btn btn-primary w-25" type="submit" onClick={handleSubmit} />
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
