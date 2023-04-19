import React, { useState } from 'react';

function TicketModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>Modal content goes here</p>
            <button onClick={toggleModal}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketModal;