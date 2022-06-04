import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import toastr from "toastr";

function LogIn(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "U0337CTRNRX",
  });
  const navigate = useNavigate();

  const onFormFieldChange = (event) => {
    // console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newFormValue = target.value;
    const nameOfField = target.name;
    setFormData((prevState) => {
      const newFormObject = {
        ...prevState,
      };
      newFormObject[nameOfField] = newFormValue;
      return newFormObject;
    });
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    userService.userLogin(formData).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = (response) => {
    console.log("onLoginSuccess", response);
    toastr.success("You have registered successfully", `Login Success`);
    userService
      .getCurrentUser()
      .then(onCurrentUserSuccess)
      .catch(onCurrentUserError);
  };

  const onLoginError = (err) => {
    console.error(err);
    toastr.error(err);
  };

  const onCurrentUserSuccess = (response) => {
    console.log("onCurrentUserSuccess", response);
    let userId = response.data.item.id;
    userService.getUserById(userId).then(onGetIdSuccess).catch(onGetIdError);
  };

  const onCurrentUserError = (err) => {
    console.error(err);
  };

  const onGetIdSuccess = (response) => {
    console.log("onGetIdSuccess", response);
    let newUser = response.id;
    props.setUser((prevState) => {
      const newUserObj = {
        ...prevState,
      };
      newUserObj.firstName = newUser.firstName;
      newUserObj.lastName = newUser.lastName;
      newUserObj.isLoggedIn = true;
      return newUserObj;
    });
    navigate("/");
  };

  const onGetIdError = (err) => {
    console.error(err);
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card bg-dark bg-gradient p-3" style={{ width: 400 }}>
          <form>
            <div className="card-body">
              <h4 className="text-warning d-flex justify-content-center mb-3">
                Log in
              </h4>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={onFormFieldChange}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onFormFieldChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid col-6 d-grid gap-2 col-sm-6 mx-auto">
                <button
                  type="submit"
                  name="btnSignIn"
                  className="btn btn-outline-warning"
                  onClick={onLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LogIn;

/* -----V1-----


const onLoginSuccess = (response) => {
    console.log("onLoginSuccess", response);
    Toastr.success("You have registered successfully", `Login Success`);
    userService
      .getCurrentUser()
      .then(onCurrentUserSuccess)
      .catch(onCurrentUserError);
  };

  const onLoginError = (err) => {
    console.error(err);
    Toastr.error(err);
  };

  const onCurrentUserSuccess = (response) => {
    console.log("onCurrentUserSuccess", response);
    let userId = response.data.item.id;
    userService.getUserById(userId).then(onGetIdSuccess).catch(onGetIdError);
  };

  const onCurrentUserError = (err) => {
    console.error(err);
  };

  const onGetIdSuccess = (response) => {
    console.log("onGetIdSuccess", response);
    let newUser = response.id;
    props.setUser((prevState) => {
      const newUserObj = {
        ...prevState,
      };
      newUserObj.firstName = newUser.firstName;
      newUserObj.lastName = newUser.lastName;
      newUserObj.isLoggedIn = true;
      return newUserObj;
    });
    navigate("/");
  };

  const onGetIdError = (err) => {
    console.error(err);
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card bg-dark bg-gradient p-3" style={{ width: 400 }}>
          <form>
            <div className="card-body">
              <h4 className="text-light d-flex justify-content-center mb-3">
                Log in
              </h4>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={onFormFieldChange}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onFormFieldChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid col-6 d-grid gap-2 col-sm-6 mx-auto">
                <button
                  type="submit"
                  name="btnSignIn"
                  className="btn btn-outline-warning"
                  onClick={onLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LogIn;

*/
