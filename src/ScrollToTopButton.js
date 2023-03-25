import React from 'react';

function ScrollToTopButton() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button onClick={handleClick}>
      Scroll to top
    </button>
  );
}

export default ScrollToTopButton;