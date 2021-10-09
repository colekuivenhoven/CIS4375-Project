// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Home.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player/lazy';

// Importing the router files
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// Importing locally used objects
import video from '../assets/images/team-images/Dronefootage1-converted.webm';

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;
var numImages = 3;

// Main function for the specific 'page'
function Home(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0);
    const [imgIndex, setImgIndex] = useState(0);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));

    // Regular varaible declaration
    const pageTitle = "Home"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        var mainContainer = document.querySelector(".container-home");
        var fontLarge = document.querySelectorAll(".font-round-large");
        var fontMed = document.querySelectorAll(".font-round-medium");
        var addButton = document.querySelectorAll(".container-add");

        if(isMobile) {
            mainContainer.style.top = "15vmin"

            fontLarge.forEach(el => {
                el.style.fontSize = "10vmin"
            });

            fontMed.forEach(el => {
                el.style.fontSize = "5.5vmin"
            });

            addButton.forEach(el => {
                el.style.width = "5.5vmin"
                el.style.marginLeft = "3vmin"
            });
        }
        else {
            mainContainer.style.top = "7vmin"
            fontLarge.forEach(el => {
                el.style.fontSize = "4vmin"
            });

            fontMed.forEach(el => {
                el.style.fontSize = "2.25vmin"
            });

            addButton.forEach(el => {
                el.style.width = "2.5vmin"
                el.style.marginLeft = "1vmin"
            });
        }
    });

    // Handling functions
    function handleAddButtonLocal() {
        localNumberRaw += 1;
        setLocalNumber(localNumberRaw);
    }

    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }

    function handleImageNext() {
        var el_next = document.querySelector(".image-content-next-button");
        var el_back = document.querySelector(".image-content-back-button");
        var el_scrollContainer = document.querySelector(".home-image-content");

        if(imgIndex < numImages-1) {
            setImgIndex(imgIndex+1);
            el_back.classList.add("active");
            el_scrollContainer.scrollTo({
                top: el_scrollContainer.getBoundingClientRect().height * (imgIndex+1) + 1,
                left: 0,
                behavior: 'smooth'
            });
        }
        
        if(imgIndex == numImages-2) {
            el_next.classList.remove("active");
        }
    }

    function handleImageBack() {
        var el_next = document.querySelector(".image-content-next-button");
        var el_back = document.querySelector(".image-content-back-button");
        var el_scrollContainer = document.querySelector(".home-image-content");

        if(imgIndex > 0) {
            setImgIndex(imgIndex-1);
            el_next.classList.add("active");
            el_scrollContainer.scrollTo({
                top: el_scrollContainer.getBoundingClientRect().height * (imgIndex-1) + 1,
                left: 0,
                behavior: 'smooth'
            });
        }

        if(imgIndex == 1) {
            el_back.classList.remove("active");
        }
    }

    // Home Templates
    function newHome() {
        return (
            <>
                <div className="new-home-content">
                    <div className="main-text-panel">
                        <div className="main-text-title">Schedule Your Next Tennis Session With Us</div>
                        <div className="main-text-body">The Homer Ford Tennis Center is the perfect place to play tennis. Whether it's a tournament, 
                                                        a practice game, or even a couples' date night, the Homer Ford Tennis Center is the place for you!
                        </div>
                        <div className="main-text-body-button-container">
                            <Link className="main-text-body-button" to="/reserve">Schedule Now</Link>
                            <Link className="main-text-body-button-2" to="/about">More Info</Link>
                        </div>
                    </div>
                    <div className="main-image-panel">
                        <div className="home-image-content">
                            <div className="player-wrapper">
                                <ReactPlayer 
                                    playing={true}
                                    playbackRate={1}
                                    loop={true}
                                    muted={true}
                                    url={video}
                                    width={'100%'} 
                                    height={'100%'}
                                    className="react-player"
                                />
                            </div>
                            <div className="slide-image-2"></div>
                            <div className="slide-image-3"></div>
                        </div>
                        <div className="image-content-back-button"
                            onClick={() => {
                                handleImageBack();
                            }}
                        ></div>
                        <div className="image-content-next-button active"
                            onClick={() => {
                                handleImageNext();  
                            }}
                        ></div>
                    </div>
                </div>
                <div className="subcontent-container">
                    <div className="subcontent-content">
                        <div className="subcontent-title">Our Services</div>
                        <div className="subcontent-item">
                            <div className="item-image-1"></div>
                            <div className="item-desc">Equipment Rental</div>
                        </div>
                        <div className="subcontent-item">
                            <div className="item-image-2"></div>
                            <div className="item-desc">Court Reservations</div>
                        </div>
                        <div className="subcontent-item">
                            <div className="item-image-3"></div>
                            <div className="item-desc">Auto Alert System</div>
                        </div>
                        <div className="subcontent-item">
                            <div className="item-image-4"></div>
                            <div className="item-desc">Smart Web Application</div>
                        </div>
                    </div>
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_name}</b>!</div>}
            </>
        )
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-home">
                {/* Variables can be inserted inside of brackets as shown below */}
                {newHome()}
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Home;