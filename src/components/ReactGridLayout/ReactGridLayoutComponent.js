import React, { useEffect, useState, useRef } from "react";
import "./ReactGridLayoutComponent.css";
import { stringifyNumber } from "../../utils";
import InViewMonitor from "./InViewMonitor";

const ReactGridLayoutComponent = ({col, noOfCards}) => {
  const [cardElements, setCardElements] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  
  useEffect(() => {
    //Generate the card elements when the component mounts
    const cardList = [];
    for (let i = 1; i <= noOfCards; i++) {
      const cardNumber = stringifyNumber(i);
      cardList.push(cardNumber);
    }
    setCardElements(cardList);
  }, []);

  // Calculate the width of each column
  const columnWidth = `${100 / col}%`;

  // Define a callback function for when a card becomes visible
  const onCardIntersect = (cardNumber) => {
    if (!visibleCards.includes(cardNumber)) {
      console.log(`${cardNumber} WAS CALLED`);
      setVisibleCards((prevVisibleCards) => [...prevVisibleCards, cardNumber]);
    }
  };

  return (
    <div className="cards" style={{ gridTemplateColumns: `repeat(${col}, ${columnWidth})` }}>
      {cardElements.map((cardNumber, index) => {
        return (
          // Render each card element inside an InViewMonitor component
          <InViewMonitor key={index} onCardIntersect={onCardIntersect}>
            <div className="card">{cardNumber}</div>
          </InViewMonitor>
        );
      })}
    </div>
  );
};

export default ReactGridLayoutComponent;
