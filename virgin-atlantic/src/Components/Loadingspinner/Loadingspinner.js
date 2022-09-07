import React from "react";
import classes from  "./Loadingspinner.module.css";


export default function LoadingSpinner() {
  return (
    <div className={classes['spinner-container']}>
      <div data-testid="spinner" className={classes['loading-spinner']}></div>
    </div>
  );
}