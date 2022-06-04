import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import debug from "sabio-debug";

function FriendsTemp(props) {
  const aPerson = props.friends;

  // const skillList = aPerson.skills?.map((mappedSkills) => {
  //   if (mappedSkills === null) {
  //     return <p>No Skills</p>;
  //   } else {
  //     return <li>{mappedSkills.name}</li>;
  //   }
  // });
  // const skillListId = aPerson.skills?.map((mappedSkills) => {
  //   return mappedSkills.id;
  // });
  const _logger = debug.extend("FriendsTemp");

  const onLocalDeleteClicked = (e) => {
    e.preventDefault();
    props.onPersonDelClicked(aPerson, e);
  };

  const navigate = useNavigate();

  const onHandleEditClick = () => {
    _logger("onHandleEditClick", aPerson);
    const state = { type: "FRIEND_DATA", payload: aPerson };
    navigate(`/friends/addfriend/${aPerson.id}`, { state });
  };

  return (
    <div className="col-md-3">
      <div className="card bg-dark bg-gradient mb-3">
        <div className="border-0 shadow">
          <img
            src={aPerson.primaryImage.url}
            className="card-img-top p-1"
            alt={aPerson.headline}
            style={{ height: 200 }}
          />
          <div className="card-body text-center p-2">
            <h5 className="card-title mb-2 text-light">{aPerson.title}</h5>
            <div className="card-text text-light align-middle">
              {aPerson.bio}
            </div>
            <button
              type="button"
              className="btn mt-2 me-3 btn-outline-warning btnEdit btn-sm "
              onClick={onHandleEditClick}
            >
              Edit
            </button>
            <button
              type="submit"
              className="btn mt-2 btn-outline-danger btnDelete btn-sm"
              onClick={onLocalDeleteClicked}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FriendsTemp.propTypes = {
  friends: PropTypes.shape({
    primaryImage: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }),
};

export default React.memo(FriendsTemp);
