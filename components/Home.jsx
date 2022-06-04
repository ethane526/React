import React from "react";

function Home(props) {
  console.log("Home fx user", props.user);
  return (
    <React.Fragment>
      <h1>
        Welcome {props.user.firstName} {props.user.lastName}!
      </h1>
    </React.Fragment>
  );
}

export default Home;
