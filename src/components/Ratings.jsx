import React from 'react'

function Ratings(props) {
    const changeRating = (rating) => {
      props.setRating(rating);
    };
  
    return (
      <div className="myRatings">
        <button type="button" className={`btn ${props.rating === 800 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(800)}>800</button>
        <button type="button" className={`btn ${props.rating === 900 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(900)}>900</button>
        <button type="button" className={`btn ${props.rating === 1000 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1000)}>1000</button>
        <button type="button" className={`btn ${props.rating === 1100 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1100)}>1100</button>
        <button type="button" className={`btn ${props.rating === 1200 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1200)}>1200</button>
        <button type="button" className={`btn ${props.rating === 1300 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1300)}>1300</button>
        <button type="button" className={`btn ${props.rating === 1400 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1400)}>1400</button>
        <button type="button" className={`btn ${props.rating === 1500 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1500)}>1500</button>
        <button type="button" className={`btn ${props.rating === 1600 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1600)}>1600</button>
        <button type="button" className={`btn ${props.rating === 1700 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1700)}>1700</button>
        <button type="button" className={`btn ${props.rating === 1800 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1800)}>1800</button>
        <button type="button" className={`btn ${props.rating === 1900 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(1900)}>1900</button>
        <button type="button" className={`btn ${props.rating === 2000 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(2000)}>2000</button>
        <button type="button" className={`btn ${props.rating === 2100 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(2100)}>2100</button>
        <button type="button" className={`btn ${props.rating === 2200 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(2200)}>2200</button>
        <button type="button" className={`btn ${props.rating === 2300 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(2300)}>2300</button>
        <button type="button" className={`btn ${props.rating === 2400 ? `btn-pink` : `btn-primary`}`} onClick={() => changeRating(2400)}>2400</button>
      </div>
    );
}
  

export default Ratings
