import React from 'react'
import founderImage from '../images/US soft.jpg'

function About() {
  return (
    <div className = "myAbout">
        <h2>About CF-Sprint</h2>
        <p className = "about-paragraph">CF-Sprint is an app to help YOU increase your rating on Codeforces! It lists the 30 most solved questions for a particular rating - do these and you will surely advance to the next level. Simply enter your profile name, pick a rating 100-200 points above your current rating, and start solving the questions to see rapid progress!</p>
        <h2>Developed by:</h2>
        <img src={founderImage} alt="Founder image" />
        <p>Gaurav Thakur</p>
    </div>
  )
}

export default About
