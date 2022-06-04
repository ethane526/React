import React, { useState } from "react";
import * as productService from "../codeChallenge/services/addProduct";
import Toastr from "toastr";

function Product() {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
    cost: 0,
  });
  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newFormValue = target.value;
    const nameOfField = target.name;
    console.log({ nameOfField, newFormValue });
    setFormData((prevState) => {
      console.log("updater onChange");
      const newFormObject = {
        ...prevState,
      };
      newFormObject[nameOfField] = newFormValue;
      return newFormObject;
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    let formFieldDate = formData;
    productService
      .addProduct(formFieldDate)
      .then(onAddProductSuccess)
      .catch(onAddProductError);
  };

  const onAddProductSuccess = (response) => {
    console.log("onAddProductSuccess", response);
    const data = response.id;
    Toastr.success("You have submitted", data);
  };

  const onAddProductError = (err) => {
    console.error(err);
  };
  return (
    <React.Fragment>
      <h1>Products</h1>
      <div className="Form-group">
        <div className="container mt-5 mb-5 d-flex justify-content-center">
          <div className="card bg-dark bg-gradient p-3" style={{ width: 500 }}>
            <div className="card-body">
              <form className="row g-3">
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="inputManufacturer"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    name="manufacturer"
                    id="manufacturer"
                    placeholder="Manufacturer"
                    value={formData.manufacturer}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="inputDescription"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="inputCost" className="form-label text-light">
                    Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    id="cost"
                    placeholder="Cost"
                    value={formData.cost}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="d-grid gap-2 col-sm-6 mx-auto">
                  <button
                    type="submit"
                    name="btnSignUp"
                    className="btn btn-outline-warning"
                    onClick={onSubmitClick}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
