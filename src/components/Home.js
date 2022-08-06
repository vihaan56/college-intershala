import React from "react";
import Card from "./Card";
const Home = () => {
  if (sessionStorage.getItem("userstatus") === null) {
    localStorage.clear();
  }

  return (
    <div className="container main-content">
      <Card></Card>
    </div>
  );
};
export default Home;
