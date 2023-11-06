import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Form from "./Form";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FormProps from "./FormProps";


export type AppProps = {
  formProps: FormProps;
};

const Root: React.FC<AppProps> = ({ formProps }) => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<Form {...formProps} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(
  <Root formProps={{ latlng: { lat: 0, lng: 0 } }} />,
  document.getElementById("root")
);

reportWebVitals();
