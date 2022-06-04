import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import * as friendsService from "../../services/friendsService";
import debug from "sabio-debug";

function AddFriend() {
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 1,
    primaryImage: "",
    skills: [],
  });

  const { state } = useLocation();
  const navigate = useNavigate();
  const _logger = debug.extend("AddFriend");

  useEffect(() => {
    console.log(state);
    if (state && state?.type === "FRIEND_DATA") {
      setFormData(() => {
        let friendData = state.payload;
        let newFormData = {
          title: friendData.title,
          bio: friendData.bio,
          summary: friendData.summary,
          headline: friendData.headline,
          slug: friendData.slug,
          statusId: friendData.statusId,
          primaryImage: friendData.primaryImage.url,
          skills: friendData.skills?.map((mappedSkills) => {
            return mappedSkills.name;
          }),
        };
        return newFormData;
      });
    }
  }, []);

  const onFormFieldChange = (e) => {
    const target = e.target;
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

  const onSubmitClicked = (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      bio: formData.bio,
      summary: formData.summary,
      headline: formData.headline,
      slug: formData.slug,
      statusId: formData.statusId,
      primaryImage: {
        url: formData.primaryImage,
        typeId: 1,
      },
      skills: formData.skills?.split(", "),
    };

    if (state) {
      console.log("Update running ->", formData);

      friendsService
        .editFriendById(state.payload.id, data)
        .then(onEditFriendSuccess)
        .catch(onEditFriendError);
    } else {
      friendsService
        .addNewFriend(data)
        .then(onAddFriendSuccess)
        .catch(onAddFriendError);
    }
  };

  const onAddFriendSuccess = (response) => {
    _logger("onAddFriendSuccess", response);
    toastr.success("New friend successfully added", "Added Friend");
    navigate("/friends");
  };

  const onAddFriendError = (err) => {
    _logger("onEditFriendError", err);
    toastr.error(err);
  };

  const onEditFriendSuccess = (response) => {
    _logger("onEditFriendSuccess", response);
    toastr.success("Friend successfully updated", response.title);
    navigate("/friends");
  };

  const onEditFriendError = (err) => {
    _logger("onEditFriendError", err);
    toastr.error(err);
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card bg-dark bg-gradient p-3" style={{ width: 500 }}>
          <div className="card-body">
            <h4 className="d-flex justify-content-center text-warning">
              Add/Edit Friend
            </h4>
            <form className="row g-3">
              <div className="col-12">
                <label htmlFor="inputTitle" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="title"
                  value={formData.title}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputBio" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="bio"
                  placeholder="bio"
                  value={formData.bio}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputSummary" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  placeholder="summary"
                  value={formData.summary}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputHeadline" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="headline"
                  placeholder="headline"
                  value={formData.headline}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputSlug" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  placeholder="slug"
                  value={formData.slug}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputAvatarUrl" className="form-label"></label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Profile url"
                  name="primaryImage"
                  value={formData.primaryImage}
                  onChange={onFormFieldChange}
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Skills</span>
                <textarea
                  className="form-control"
                  aria-label="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={onFormFieldChange}
                ></textarea>
              </div>
              <div className="d-grid gap-2 col-sm-6 mx-auto">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btn btn-outline-warning"
                  onClick={onSubmitClicked}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFriend;
