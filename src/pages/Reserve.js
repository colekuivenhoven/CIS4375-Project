// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Reserve.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function Reserve() {

    // Regular varaible declaration
    const pageTitle = "Reserve Your Court"

    // Handling functions

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-reserve">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="reserve-form-container">

                </div>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Reserve;