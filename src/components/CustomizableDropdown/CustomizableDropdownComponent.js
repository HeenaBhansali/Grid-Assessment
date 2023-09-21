import React, { useState, useEffect } from "react";
import "./CustomizableDropdownComponent.css";
import up from "../../assets/images/up.png";
import down from "../../assets/images/down.png";

const CustomizableDropdownComponent = ({
  options,
  multiSelect,
  searchable,
  sortable,
  groupable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  // Check if all options are selected
  const allOptionsSelected = options.length === selectedItems.length;

  // Handle toggling the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selecting an item (single or multi-select)
  const handleItemClick = (item) => {
    if (multiSelect) {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((selected) => selected !== item));
        // Add the item back to the options
        setFilteredOptions([...filteredOptions, item]);
      } else {
        setSelectedItems([...selectedItems, item]);
        // Remove the item from the options
        setFilteredOptions(filteredOptions.filter((option) => option !== item));
      }
    } else {
      setSelectedItems([item]);
      setIsOpen(false);
    }
  };

  // Handle sorting the options
  useEffect(() => {
    const sortedOptions = [...filteredOptions];
    sortedOptions.sort((a, b) => {
      if (sortAscending) {
        return a.label.localeCompare(b.label);
      } else {
        return b.label.localeCompare(a.label);
      }
    });
    setFilteredOptions(sortedOptions);
  }, [sortAscending]);

  // Handle filtering options based on search query
  useEffect(() => {
    if (searchable) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options, searchable]);

  // Render the options
  const renderOptions = () => {
    if (groupable) {
      const groupedOptions = {};

      filteredOptions.forEach((item) => {
        const groupName = item.group || "Other";
        if (!groupedOptions[groupName]) {
          groupedOptions[groupName] = [];
        }
        groupedOptions[groupName].push(item);
      });

      return Object.entries(groupedOptions).map(([groupName, groupItems]) => (
        <div key={groupName} className="group">
          <div className="group-label">{groupName}</div>
          {groupItems.map((item) => (
            <div
              key={item.value}
              className={`dropdown-item ${
                selectedItems.includes(item) ? "selected" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      ));
    } else {
      if (allOptionsSelected) {
        return <div className="no-data-remaining">No data remaining</div>;
      } else if (filteredOptions.length === 0 && searchQuery.trim() !== "") {
        return <div className="no-data-remaining">No records available</div>;
      } else {
        return filteredOptions.map((item) => (
          <div
            key={item.value}
            className={`dropdown-item ${
              selectedItems.includes(item) ? "selected" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </div>
        ));
      }
    }
  };

  // Handle removing a selected item
  const removeSelectedItem = (e, item) => {
    e.stopPropagation();
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
    setFilteredOptions([...filteredOptions, item]);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header">
        <div className="selected-items" onClick={toggleDropdown}>
          {selectedItems.length === 0 ? (
            <div className="placeholder">Select from Dropdown</div>
          ) : (
            selectedItems.map((item) => (
              <div key={item.value} className="selected-item">
                {item.label}
                <span
                  className="close-icon"
                  onClick={(e) => removeSelectedItem(e, item)}
                >
                  X
                </span>
              </div>
            ))
          )}
        </div>
        {isOpen && !allOptionsSelected && sortable && (
          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="sort-button"
          >
            {sortAscending ? (
              <img alt="Up icon" src={up} />
            ) : (
              <img alt="Down icon" src={down} />
            )}
          </button>
        )}
        <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}></div>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          <div className="dropdown-search">
            {searchable && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </div>
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default CustomizableDropdownComponent;
