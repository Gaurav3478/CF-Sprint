import React, { useState } from "react";

function SearchBar(props) {
  const [formData, setFormData] = useState("");
  const handleOnChange = (event) => {
    setFormData(event.target.value);
  }

  const handleSubmit = (event) => {
    const url = `https://codeforces.com/api/user.info?handles=${formData}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'OK') {
        props.setValidUser(2);
        props.setUser(data.result[0])
      }
      else {
        props.setValidUser(1);
        props.setUser({});
      }
    })
    .catch(error => {
      props.setValidUser(0);
    });
    event.preventDefault();
  };


  return (
    <div className = "mySearchBar d-flex justify-content-center">
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input className="form-control mr-sm-2" type="search" placeholder="Codeforces Handle" aria-label="Search" onChange={handleOnChange}/>
      <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onSubmit={handleSubmit}>Search</button>
    </form>
    </div>
  )
}

export default SearchBar
