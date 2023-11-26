import React from 'react';
//import { Link } from 'react-router-dom';
import '../assets/styles/pages/About.css';
import image1 from '../assets/images/pragati.png';
import image2 from '../assets/images/sarah.jpeg';
import image3 from '../assets/images/alex.jpg';
import image4 from '../assets/images/Moe.png';
import image5 from '../assets/images/cjay.jpeg';


const About = () => {
    const cardData = [
        {
            imagePath: image1,
            aboutTitle: 'Pragati Makani',
            info: "I currently serve as a Team Lead for Team 2. I'm someone who appreciates a friendly and collaborative atmosphere, and I've had the opportunity to lead teams in the past. My approach is grounded and practical, and I aim to keep things straightforward. Fun Fact: I was a state-level basketball player for about 6 years",
            github: 'https://github.com/pragati-e',
            linkedin: 'https://www.linkedin.com/in/pragati-makani-661332220'
        },
        {
            imagePath: image2,
            aboutTitle: 'Sarah Abusaif',
            info: "Hello there! I am the Frontend Lead for Team 2. With my past experiences with web development, I've enjoyed working on the site's style. I always find myself looking for ways to make the site feel alive while making it easy for users to read. Fun Fact: I make edits of shows I've watched or games I play.",
            github: 'https://github.com/sabusaif',
            linkedin: 'https://linkedin.com/in/jessie2'
        },
        {
            imagePath: image3,
            aboutTitle: 'Alexander Del Rio',
            info: "Hi, I'm Alex, and I'm the Backend lead for Team 2. I enjoy leraning about systems on a low level and working on optimization problems. This is my last semester at SFSU and I'm excited to learn new skills in the real world. Hobbies: I spend most of my free time playing video games or playing with my cats.",
            github: 'https://github.com/ajdelrio',
            linkedin: 'https://linkedin.com/in/jessie2'
        }, 
        {
            imagePath: image4,
            aboutTitle: 'Mohammad Dahbour',
            info: "Hi everyone! My name's Mohammad but everyone calls me Moe. I'm the scrum master for team 2. I'm a computer Science major who's graduating next semester so i'm really excited for that! What I'm interested in: Videogames and my favs are Persona 5, Final Fantasy, and God Of War. I'm also really into soccer and my favorite team is Barcelona.",
            github: 'https://github.com/MoeD02',
            linkedin: 'https://www.linkedin.com/in/mohammad-dahbour-404317254/'
        },  
        {
            imagePath: image5,
            aboutTitle: 'Christian Montalvo',
            info: "Hi! My name is Christian, but everyone calls me Cjay. I am the GitHub Lead of team 02. One way I would definitely describe myself as an Extrovert that loves to meet and learn more about others. I find everything to do with technology to be very intruiging and I look forward to making somehting that will connect more and more people! Hobbies: Love to go to the gym, play videogames, play all types of sports, and party",
            github: 'https://github.com/cjay-m',
            linkedin: 'https://www.linkedin.com/in/christian-jay-montalvo-88844a192'
        },     
    ];

    const cards = cardData.map((data, index) => (
        <div className="card" key={index}>
          <div className="img" style={{ backgroundImage: `url(${data.imagePath})` }}></div>
          <span>{data.aboutTitle}</span>
          <p className="info">
            {data.info}
          </p>
          <div className="share">
            <a href={data.github}>
              <button>github</button>
            </a>
            <a href={data.linkedin}>
              <button>linkedin</button>
            </a>
          </div>
        </div>
    ));
  
    return <div className="cards-container">{cards}</div>;
  };
  
  export default About;