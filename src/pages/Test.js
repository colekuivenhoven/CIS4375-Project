// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Test.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

var testDataRaw = [];
var testDataConverted = [];
var gotTestData = false;

// Main function for the specific 'page'
function Test(props) {
    const[testData, setTestData] = useState([]);

    // Regular varaible declaration
    const pageTitle = "Testing Page"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotTestData) {
            getTestData();
        }

        var mainContainer = document.querySelector(".container-test");
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
            mainContainer.style.top = "5vmin"
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

        return () => {
            gotTestData = false;
        }
    }, []);

    // Get data functions
    async function getTestData() {
        let response = await fetch("http://3.218.225.62:3040/read");
        response = await response.json();
        testDataRaw = response.visitors;
        testDataConverted = [];

        if (!gotTestData) {
            convertTestData();
        }
    }

    function convertTestData() {
        testDataRaw.forEach(visitor => {
            testDataConverted.push(
                <div key={visitor._id} style={{display: 'flex', flexDirection: 'column', marginTop: '1vmin'}}>
                    <b>Name: {visitor.name}</b>
                    <span>Connect Date: {visitor.date}</span>
                </div>
            )
        });

        setTestData(testDataConverted);
        gotTestData = true;
    }


    // Handling functions
    

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-test">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="test-form-container">
                    <div className="test-object-container">
                        <div>{testData}</div>
                    </div>
                </div>
            </div>
            <div className="test-modal">
                
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Test;