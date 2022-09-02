import React from "react";
import "./Loadingspinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div data-testid="spinner" className="loading-spinner"></div>
    </div>
  );
}