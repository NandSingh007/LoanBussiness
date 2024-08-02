import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  render() {
    const { isOpen, onClose, children } = this.props;
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
