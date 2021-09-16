// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Test.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function Test() {

    const [messageState, setMessageState] = useState({
        message: {
            to: '',
            body: ''
          },
          submitting: false,
          error: false
    })

    // Regular varaible declaration
    const pageTitle = "Testing Page"

    // Handling functions
    function handleChangePhone(e) {
        setMessageState({
            message: {
                to: e.target.value, body: messageState.message.body
            },
            submitting: messageState.submitting,
            error: messageState.error
        })
    }

    function handleChangeContent(e) {
        setMessageState({
            message: {
                to: messageState.message.to, body: e.target.value
            },
            submitting: messageState.submitting,
            error: messageState.error
        })
    }

    function handleSubmit(e) {
        setMessageState({
            message: {
                to: messageState.message.to, body: messageState.message.body
            },
            submitting: true,
            error: messageState.error
        });

        fetch('http://localhost:3040/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageState.message)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Success!")
                setMessageState({
                    message: {
                        to: '', body: ''
                    },
                    submitting: false,
                    error: false
                });
            } else {
                console.log("Error!")
                setMessageState({
                    message: {
                        to: messageState.message.to, body: messageState.message.body
                    },
                    submitting: false,
                    error: true
                });
            }
        });
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-test">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="test-form-container">
                    <form className="test-text-container">
                        <span>Text Messaging</span>
                        <div className="test-input-container">
                            To:
                            <input className="test-input-phone" 
                                onChange={(e) => {
                                    handleChangePhone(e);
                                }}
                                value={messageState.message.to}
                            />
                        </div>
                        <div className="test-input-container">
                            Content:
                            <textarea rows={5} className="test-input-content" 
                                onChange={(e) => {
                                    handleChangeContent(e);
                                }}
                                value={messageState.message.body}
                            />
                        </div>
                        <div className="test-text-submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                        >Send</div>
                    </form>
                </div>
            </div>
            <div className="test-text-modal">

            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Test;