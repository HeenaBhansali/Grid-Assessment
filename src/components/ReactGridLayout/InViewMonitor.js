import React, { useEffect, useRef } from "react";

const InViewMonitor = ({ children, onCardIntersect }) => {
  const ref = useRef(null);

  useEffect(() => {
    // Create an IntersectionObserver to monitor when the card becomes visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Call the callback function when the card is intersecting the viewport
          onCardIntersect(children.props.children);
          // Stop observing the card once it becomes visible
          observer.unobserve(ref.current);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    // Start observing the card element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to stop observing when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [children, onCardIntersect]);

  return <div ref={ref}>{children}</div>;
};

export default InViewMonitor;
