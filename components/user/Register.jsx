import React, { useState } from "react";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U0337CTRNRX",
  });

  const navigate = useNavigate();

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
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

  const onRegisterClick = (e) => {
    e.preventDefault();
    userService
      .addNewUser(formData)
      .then(onRegisterSuccess)
      .catch(onRegisterError);
  };

  const onRegisterSuccess = (response) => {
    console.log("onRegisterSuccess", response);
    let fName = response.firstName;
    let lName = response.lastName;
    toastr.success("You have registered successfully", `${fName} ${lName}`);
    navigate("/login");
  };

  const onRegisterError = (err) => {
    console.error(err);
    toastr.error(err);
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card bg-dark bg-gradient p-3" style={{ width: 500 }}>
          <div className="card-body">
            <h4 className="d-flex justify-content-center text-warning">
              Register
            </h4>
            <form className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="inputFirstName" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="inputLastName" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputEmail" className="form-label"></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email: example@email.com"
                  value={formData.email}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPassword" className="form-label"></label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label
                  htmlFor="inputConfirmPassword"
                  className="form-label"
                ></label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={formData.passwordConfirm}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputAvatarUrl" className="form-label"></label>
                <input
                  type="url"
                  className="form-control"
                  name="avatarUrl"
                  placeholder="Profile url"
                  value={formData.avatarUrl}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="d-grid gap-2 col-sm-6 mx-auto">
                <button
                  type="submit"
                  name="btnSignUp"
                  className="btn btn-outline-warning"
                  onClick={onRegisterClick}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
