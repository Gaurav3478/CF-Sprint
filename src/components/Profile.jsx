import React from 'react'

function Profile(props) {
  return (
    <div className="myProfile">
      {props.validUser === 0 ? (
        <div className="d-flex justify-content-center">
        <div className="bg-warning text-white py-3 px-4 rounded error-box">
          <p className="m-0">Handle:</p>
          <p className="m-0">Rank:</p>
          <p className="m-0">Max rating:</p>
        </div>
      </div>
      ) : props.validUser === 2 ? (
        <div className="container">
        <div id = "showProfileID" className="d-flex justify-content-center">
          <div className="bg-success text-white py-3 px-4 rounded error-box">
            <p className="m-0">Handle: {props.user.handle} ({props.user.rating ? props.user.rating : 0})</p>
            <p className="m-0">Rank: {props.user.rank ? props.user.rank[0].toUpperCase() + props.user.rank.slice(1) : 'Newbie'}</p>
            <p className="m-0">Max rating: {props.user.maxRating ? props.user.maxRating : 0}</p>
          </div>
          <img src={props.user.avatar} alt="User Avatar" />
        </div>
    </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="bg-danger text-white py-3 px-4 rounded error-box">
            <p className="m-0">Handle:</p>
            <p className="m-0">Rank:</p>
            <p className="m-0">Max rating:</p>
          </div>
        </div>
      )}
    </div>
    )
}

export default Profile
