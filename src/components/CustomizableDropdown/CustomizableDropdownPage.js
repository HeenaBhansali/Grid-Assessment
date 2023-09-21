import React from "react";
import Header from "../../common/Header";
import CustomizableDropdownComponent from "./CustomizableDropdownComponent";
import options from '../../data.json'

const CustomizableDropdownPage = () => {
  return (
    <div>
      <Header pageTitle="Customizable Dropdown Page" showBackButton={true} />
      <div className="customizable-content">
        <CustomizableDropdownComponent
          options={options}
          multiSelect={true}
          searchable={true}
          sortable={true}
          groupable={true}
        />
      </div>
    </div>
  );
};

export default CustomizableDropdownPage;
