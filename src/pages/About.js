// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/About.css';
// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Importing the components used in this page
import Loading from '../components/Loading';

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function About(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));

    // Regular varaible declaration
    const pageTitle = "About"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {

    });

    // Handling functions

    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }
    
    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-about">
                {/* Variables can be inserted inside of brackets as shown below */}
                {/* <div className="page-title"><span className="font-round-large">{pageTitle}</span></div> 
                
                <div className="map"></div>
                <div className="map2"></div>*/
                }

                
                <div className="test-container">
                    
                    <div class="main-text-panel">
                    
                        FAQ 
<br/><strong>
Are the courts open to the public? </strong>
<br/>
Homer Ford Tennis Center is open to the public. Courts require a rental fee to use. Please check-in at the Pro shop found at the front of the tennis center. 
<br/><strong>
What are the hours of operation? </strong>
<br/>
Weekdays: 7:30 AM – 9:00 PM 
<br/>
Weekends: 7:30 AM – 6:00 PM 
<br/>
Closed: December 25th, Thanksgiving, January 1st 
<br/><strong>
How can I rent a court? </strong>
<br/>
You can rent a court either in person, over the phone, or online. Reservations can be made up to a week in advance. 
<br/><strong>
What are the court fees? </strong>
<br/>
Prime time reservations are on weekdays after 4pm and weekends. Non-prime time is weekdays before 4pm. Fees to use a court will be dependent on majority of your reservation time falls under. 
<br/>
Non-prime 1h30mins: $4.00 
<br/>
Non-prime 2hrs: $5.00 
<br/>
Prime 1h30mins: $6.00 
<br/>
Prime 2hrs: $8.00 
<br/><strong>
Do you offer tennis lessons for adults? </strong>
<br/>
We do offer tennis lessons at our facility. Please contact the manager for more information: 
<br/>
Roger White: (832)373-8798 
<br/><strong>
Do you offer tennis lessons for kids? </strong>
<br/>
The Zina Garrison Academy is hosted at our facility; a youth tennis program that offers lessons to kids from ages 6-18. For more information, please visit their website at https://www.zinagarrison.org/ 
<br/><strong>
Do you offer equipment rentals? </strong>
<br/>
Current equipment that we rent out is a ball machine. For additional equipment, ask at the front desk. 
<br/><strong>
Do you have tournaments or leagues? </strong>
<br/>
We do host tournaments and leagues at our tennis center. Contact the manager for more information to get involved in either one. 
<br/>
Roger White: (832)373-8798 
<br/><strong>
Are pets allowed at your facility? </strong>
<br/>
Pets are not allowed within the gates of our facility. 
<br/><strong>
If you have any further questions, please contact our manager: 
<br/>
Roger White: (832)373-8798  </strong>
                    </div>
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
            </div>
            <Loading timeRange={[250, 500]} />
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default About;