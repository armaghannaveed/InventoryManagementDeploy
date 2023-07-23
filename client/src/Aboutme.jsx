import React from 'react';
import { Link } from 'react-router-dom';
import './Aboutme.css';
import homeIcon from './images/home.png';
import myImage from './images/IMG_0833.jpg';

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <Link to="/form">
        <img className="about-me-home-icon" src={homeIcon} alt="Press to return home" />
      </Link>
      <img className="about-me-image" src={myImage} alt="CUTE ME" />
      <p className="about-me-bolded">Let me tell you more about myself:</p>
      <p className="about-me-normal">
        I grew up in a small village in Pakistan called Karimupur. I then
        received a scholarship to UBC, which made this entire journey of coming
        here possible. I love traveling, playing sports, and growing plants. I
        am currently in my 4th year studying Business and Computer Sciences.
        Even though I have worked in Media A&I and DevOps roles, I haven't had
        the chance to build a website from scratch.
      </p>
    </div>
  );
};

export default AboutMe;
