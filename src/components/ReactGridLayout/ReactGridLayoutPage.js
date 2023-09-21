import React from "react";
import Header from "../../common/Header";
import ReactGridLayoutComponent from "./ReactGridLayoutComponent";

const ReactGridLayoutPage = () => {
  return (
    <div>
      <Header pageTitle="React Grid Layout Page" showBackButton={true} />
      <div className="content">
        <ReactGridLayoutComponent col={3} noOfCards={21} />
      </div>
    </div>
  );
};

export default ReactGridLayoutPage;
