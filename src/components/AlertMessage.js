import '../assets/styles/AlertMessage.css';

import React, { useEffect, useState } from "react";

function AlertMessage({ alertMessage }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        msg: '',
        type: ''
    });

    useEffect(() => {
        setMessage(alertMessage);
        setShow(alertMessage.msg.length > 0 ? true : false);

        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [alertMessage]);

    return (
        <div 
            className={`alert-message ${show ? "" : "closed"}`} 
            style={message.type == "Good" ? {border: "0.35vmin solid rgba(21, 182, 42, 0.7)", color: "rgba(21, 182, 42, 0.7)"} : {}}
        >
            <span>{message.msg}</span>
        </div>
    )
}

export default AlertMessage;