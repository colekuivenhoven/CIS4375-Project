import React, { useEffect, useRef, useState } from "react";
import '../assets/styles/Reserve.css';

function Loading(props) {
    const [loading, setLoading] = useState(true);

    const loadingTimeRange = [props.timeRange[0], props.timeRange[1]];

    useEffect(() => {
        if (loading) {
            setTimeout(() => setLoading(false), getRandomRange(loadingTimeRange[0], loadingTimeRange[1]));
        }
        return () => { setLoading(false)};
    }, [loading]);

    // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    return (
        <div className={`adminreserve-loading ${!loading ? "": "active"}`}>
            <div className="loading-ball" />
            <div className="loading-ball" style={{animationDelay: "150ms"}} />
            <div className="loading-ball" style={{animationDelay: "250ms"}} />
        </div>
    )
}

export default Loading;