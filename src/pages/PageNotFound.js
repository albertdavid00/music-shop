import React from "react";
import { useHistory } from "react-router-dom";
import TopSection from "../components/TopSection";
export default function PageNotFound() {
    const history = useHistory();
  return (
    <>
      <TopSection />
      <div className="w-100 mt-5 d-flex justify-content-center flex-column align-items-center">
        <h1 style={{ fontFamily: "cursive" }} className="mt-5">
          <strong>Oops! Page not found!</strong>
        </h1>
        <button className="btn btn-link" onClick={() => {history.push("/guitars")}}> Go Back</button>
      </div>
    </>
  );
}