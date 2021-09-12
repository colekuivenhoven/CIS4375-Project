// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function AdminHome() {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0)

    // Regular varaible declaration
    const pageTitle = "Admin"

    // Handling functions
    function handleAddButtonLocal() {
        localNumberRaw += 1;
        setLocalNumber(localNumberRaw);
    }

    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-admin">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="test-container">
                    <span className="font-round-medium unselectable">Local Number: {localNumber}</span>
                    <div 
                        className="container-add unselectable" 
                        onClick={() => {
                            // Calling the appropriate handle function when the element has been clicked.
                            handleAddButtonLocal();
                        }}
                    ></div>
                </div>
                <div className="test-container">
                    <span className="font-round-medium unselectable">Global Number: {globalNumber}</span>
                    <div 
                        className="container-add unselectable" 
                        onClick={() => {
                            // Calling the appropriate handle function when the element has been clicked.
                            handleAddButtonGlobal();
                        }}
                    ></div>
                </div>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default AdminHome;