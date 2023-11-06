import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import FormProps from "./FormProps";

const Form: React.FC<FormProps> = ({ latlng }) =>{
  const Today = new Date();
  const [date, setDate] = React.useState(Today);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [count, setCount] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/observations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: lat,
        long: long,
        count: count,
        place: place,
        date: date
      })
    });
    if (response.ok) {
      console.log('Observation created successfully!');
    } else {
      console.error('Failed to create observation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>観察記録</h1>
      <div className="form-group">
        <label htmlFor="lat">緯度:</label>
        <input
          type="text"
          id="lat"
          value={lat}
          onChange={(event) => setLat(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lng">経度:</label>
        <input
          type="text"
          id="lng"
          value={long}
          onChange={(event) => setLong(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="count">見つけた数:</label>
        <input
          type="text"
          id="count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="place">場所の名前:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="place">見つけた日:</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={event => {setDate(event || Today)}}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

