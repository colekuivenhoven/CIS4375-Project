// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Reserve.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import reactDom from 'react-dom';

// Importing the components used in this page
import Loading from '../components/Loading';

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;
const dateToday = new Date();
const totalCourts = 16;

var resArray = [];
var resBuffer = [];
var gotReservationData = false;
var editing = false;

// Main function for the specific 'page'
function Reserve(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [currentCourt, setCurrentCourt] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState(0.75);
    const [note, setNote] = useState('');
    const [numCourts, setNumCourts] = useState(1);
    const [selectedID, setSelectedID] = useState(-1);
    const [reservations, setReservations] = useState([]);
    const [customerReservations, setCustomerReservations] = useState([]);
    
    // Regular varaible declaration
    var isMobile = props.isMobile;

    var timeslotsJSON = [
        {
            time: '7:00am',
            status: 'open',
            reservation: null
        },
            {
                time: '7:15am',
                status: 'open'
            },
            {
                time: '7:30am',
                status: 'open',
                reservation: null
            },
            {
                time: '7:45am',
                status: 'open',
                reservation: null
            },
        {
            time: '8:00am',
            status: 'open',
            reservation: null
        },
            {
                time: '8:15am',
                status: 'open',
                reservation: null
            },
            {
                time: '8:30am',
                status: 'open',
                reservation: null
            },
            {
                time: '8:45am',
                status: 'open',
                reservation: null
            },
        {
            time: '9:00am',
            status: 'open',
            reservation: null
        },
            {
                time: '9:15am',
                status: 'open',
                reservation: null
            },
            {
                time: '9:30am',
                status: 'open',
                reservation: null
            },
            {
                time: '9:45am',
                status: 'open',
                reservation: null
            },
        {
            time: '10:00am',
            status: 'open',
            reservation: null
        },
            {
                time: '10:15am',
                status: 'open',
                reservation: null
            },
            {
                time: '10:30am',
                status: 'open',
                reservation: null
            },
            {
                time: '10:45am',
                status: 'open',
                reservation: null
            },
        {
            time: '11:00am',
            status: 'open',
            reservation: null
        },
            {
                time: '11:15am',
                status: 'open',
                reservation: null
            },
            {
                time: '11:30am',
                status: 'open',
                reservation: null
            },
            {
                time: '11:45am',
                status: 'open',
                reservation: null
            },
        {
            time: '12:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '12:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '12:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '12:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '1:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '1:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '1:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '1:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '2:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '2:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '2:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '2:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '3:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '3:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '3:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '3:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '4:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '4:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '4:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '4:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '5:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '5:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '5:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '5:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '6:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '6:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '6:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '6:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '7:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '7:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '7:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '7:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '8:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '8:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '8:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '8:45pm',
                status: 'open',
                reservation: null
            },
        {
            time: '9:00pm',
            status: 'open',
            reservation: null
        },
            {
                time: '9:15pm',
                status: 'open',
                reservation: null
            },
            {
                time: '9:30pm',
                status: 'open',
                reservation: null
            },
            {
                time: '9:45pm',
                status: 'open',
                reservation: null
            }
    ]

    const columnDays = [
        {
            date: convertDate(dateToday.getDate()),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+1),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+2),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+3),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+4),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+5),
            slots: timeslotsJSON
        },
        {
            date: convertDate(dateToday.getDate()+6),
            slots: timeslotsJSON
        }
    ]

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotReservationData) {
            getReservationData();
            getCustomerReservationData();
        }

        return () => {
            gotReservationData = false;
        }
    }, []);

    // Server functions
    async function getReservationData() {
        let response = await fetch("http://3.218.225.62:3040/reservation/getall");
        response = await response.json();
        resArray = response.reservations;
        resBuffer = [];

        if(!gotReservationData) {
            convertReservations();
        }
    }

    async function getCustomerReservationData() {
        let response = await fetch("http://3.218.225.62:3040/reservation/get-user/"+currentUser.User_id);
        response = await response.json();
        setCustomerReservations(response.reservations);
    }

    function convertReservations() {
        resArray.forEach(res => {
            resBuffer.push(
                {
                    id: res.Reservation_id,
                    type_id: res.Reservation_type,
                    status_id: res.Reservation_status,
                    date: res.Reservation_date,
                    timeStart: res.Reservation_time,
                    duration: parseFloat(res.Reservation_duration),
                    court_id: res.Court_id,
                    customer_id: res.Customer_id
                }
            )
        });

        setReservations(resBuffer);

        gotReservationData = true;
    }

    function addReservation(data) {
        fetch("http://3.218.225.62:3040/reservation/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => {
            gotReservationData = false;
            getReservationData();
        })
    }

    function editReservation(data) {
        fetch("http://3.218.225.62:3040/reservation/edit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => {
            gotReservationData = false;
            getReservationData();
        })
    }

    function deleteReservation(rid) {
        fetch("http://3.218.225.62:3040/reservation/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: rid})
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => {
            gotReservationData = false;
            getReservationData();
        })
    }

    // Formatting functions
    function convertDate(day) {
        return (
            dateToday.getMonth()+1+"/"+day+"/"+dateToday.getFullYear()
        )
    }

    function formatDate(date) {
        return (
            date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear()
        )
    }

    function getFormattedDate(dayOffset) {
        var newDate = new Date();
        newDate.setDate(newDate.getDate()+dayOffset);
        return formatDate(newDate);
    }

    function convertToDateFromString(str) {
        var dateParts = str.split('/');
        var dateRaw = new Date(dateParts[2],dateParts[0]-1,dateParts[1]);

        return dateRaw;
    }

    // Rendering functions
    function renderTimeColumn() {
        var returnData = [];
        timeslotsJSON.forEach((slot, index) => {
            var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
            var amOrPM = (slot.time).substring((slot.time).length - 2);
            var timeHour = timeRaw.split(':')[0];
            var timeMinutes = timeRaw.split(':')[1];
            
            if(timeMinutes == '00') {
                returnData.push(
                    <div key={index} className="table-hours-item-container">
                        {slot.time}
                        {/* <div className="table-break-highlight-container"></div> */}
                    </div>
                )
            }
            else {
                returnData.push(
                    <div key={index} className="table-hours-item-container"></div>
                )
            }
        })

        return (returnData);
    }

    function renderColumns() {
        var returnData = [];

        columnDays.forEach((day, index) => {
            var dateRaw = convertToDateFromString(day.date);
            var dateRawDay = dateRaw.toLocaleString('en-us', {  weekday: 'short' });
            var dayTimeslots = timeslotsJSON;

            if(dateRawDay == 'Sat' || dateRawDay == 'Sun') {
                dayTimeslots.forEach((slot) => {
                    var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
                    var amOrPM = (slot.time).substring((slot.time).length - 2);
                    var timeHour = timeRaw.split(':')[0];
                    var timeMinutes = timeRaw.split(':')[1];

                    if(timeHour >= 6 && timeHour != 12 && amOrPM == 'pm') {
                        slot.status = 'closed'
                    }
                    else if(timeHour == 7 && timeMinutes < 30 && amOrPM == 'am') {
                        slot.status = 'closed'
                    }
                    else {
                        slot.status = 'open'
                        slot.reservation = null;
                    }
                })
            }
            else {
                dayTimeslots.forEach((slot) => {
                    var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
                    var amOrPM = (slot.time).substring((slot.time).length - 2);
                    var timeHour = timeRaw.split(':')[0];
                    var timeMinutes = timeRaw.split(':')[1];

                    if(timeHour >= 9 && timeHour != 12 && amOrPM == 'pm') {
                        slot.status = 'closed'
                    }
                    else if(timeHour == 7 && timeMinutes < 30 && amOrPM == 'am') {
                        slot.status = 'closed'
                    }
                    else {
                        slot.status = 'open'
                        slot.reservation = null;
                    }
                })
            }

            reservations.forEach((reservation) => {
                if(reservation.date == day.date) {
                    var resStartTimeRaw = (reservation.timeStart).substring(0,(reservation.timeStart).length - 2);
                    var resAmOrPM = (reservation.timeStart).substring((reservation.timeStart).length - 2);

                    var resTimeHour = resStartTimeRaw.split(':')[0];
                    var resTimeMinutes = resStartTimeRaw.split(':')[1];

                    var resIdBuffer = -1;
                    var startIndex = -1;
                    if(reservation.court_id == currentCourt) {
                        dayTimeslots.forEach((slot, index) => {
                            var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
                            var amOrPM = (slot.time).substring((slot.time).length - 2);
                            var timeHour = timeRaw.split(':')[0];
                            var timeMinutes = timeRaw.split(':')[1];
        
                            if(timeHour == resTimeHour && timeMinutes == resTimeMinutes && amOrPM == resAmOrPM) {
                                slot.status = 'reserved';
                                slot.reservation = reservation.id;
                                resIdBuffer = reservation.id;
                                startIndex = index;
                            }
                            
                            if(startIndex > -1 && (index - startIndex < reservation.duration * 4)) {
                                slot.status = 'reserved';
                                slot.reservation = resIdBuffer;
                            }
                        });
                    }
                }
            })

            returnData.push(
                <div key={index} className="table-content-column">
                    {renderColumnItems(
                        day.date,
                        dayTimeslots
                    )}
                </div>
            )
        })
        return (returnData);
    }

    function renderColumnItems(date, slots) {
        var returnData = [];
        var dateRaw = convertToDateFromString(date);
        var dateRawDay = dateRaw.toLocaleString('en-us', {  weekday: 'short' });

        var startIndex = -1;

        slots.forEach((slot, index) => {
            var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
            var amOrPM = (slot.time).substring((slot.time).length - 2);
            var timeHour = timeRaw.split(':')[0];
            var timeMinutes = timeRaw.split(':')[1];
            var blockRadius = '1vmin';
            var borderWidth = '0.25vmin';
            var borderColor = 'rgba(255,255,255,1)';

            if(slot.status == 'open') {
                returnData.push(
                    <div key={index} className={timeMinutes == '00' ? "table-column-item-container-open-2 darker" : "table-column-item-container-open-2"}
                        style={
                            (slots[index-1].status != 'open' && slots[index+1].status == 'open') ? 
                                {borderTopRightRadius: blockRadius, borderTopLeftRadius: blockRadius, 
                                    borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderTop: borderWidth+' solid '+borderColor} : 
                                (slots[index+1].status != 'open' && slots[index-1].status == 'open') ? 
                                    {borderBottomRightRadius: blockRadius, borderBottomLeftRadius: blockRadius,
                                        borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderBottom: borderWidth+' solid '+borderColor} :
                                    (slots[index+1].status != 'open' && slots[index-1].status != 'open') ? 
                                        {borderBottomRightRadius: blockRadius, borderBottomLeftRadius: blockRadius, borderTopRightRadius: blockRadius, borderTopLeftRadius: blockRadius,
                                            borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderBottom: borderWidth+' solid '+borderColor, borderTop: borderWidth+' solid '+borderColor} :
                                        {borderBottomRightRadius: '0.0vmin', borderBottomLeftRadius: '0.0vmin', 
                                            borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor}
                        }
                        onClick={() => {
                            if(loggedIn) {
                                editing = false;
                                handleToggleModal();
                                setSelectedDate(date);
                                setSelectedTime(slot.time);
                            }
                            else {
                                window.location.pathname = "/login"
                            }
                        }}
                    >
                        {(timeMinutes != '00') && <div className="table-hours-item-container-sub">{timeHour}:{timeMinutes}{amOrPM}</div>}
                        <div className="table-hours-highlight-container"></div>
                        {slot.reservation}
                    </div>
                )
            }
            else if(slot.status == 'closed') {
                returnData.push(
                    <div key={index} className="table-column-item-container-closed-2"
                        style={
                            slots[index-1] != null && slots[index-1].status != 'closed' ? 
                                {borderTopRightRadius: blockRadius, borderTopLeftRadius: blockRadius, 
                                    borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderTop: borderWidth+' solid '+borderColor} : 
                                slots[index+1] != null && slots[index+1].status != 'closed' ? 
                                    {borderBottomRightRadius: blockRadius, borderBottomLeftRadius: blockRadius,
                                        borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderBottom: borderWidth+' solid '+borderColor} :
                                    (index == 0) ?
                                        {borderTopRightRadius: blockRadius, borderTopLeftRadius: blockRadius,
                                            borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor} : 
                                        (slots[index+1] == null) ?
                                            {borderBottomRightRadius: blockRadius, borderBottomLeftRadius: blockRadius,
                                                borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor} :
                                            {borderBottomRightRadius: '0.0vmin', borderBottomLeftRadius: '0.0vmin', 
                                                borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor}
                        }
                    ></div>
                )
            }
            else if(slot.status == 'reserved') {
                if(slots[index-1].reservation != slots[index].reservation) {
                    startIndex = index;
                }
                returnData.push(
                    <div 
                        key={index} 
                        className={(currentUser) && (currentUser.User_id == reservations.find(el => el.id == slots[startIndex].reservation).customer_id) 
                            ? (reservations.find(el => el.id == slots[startIndex].reservation).type_id == 1)
                                ? "table-column-item-container-reserved-2_userevent"
                                : "table-column-item-container-reserved-2_user"
                            : (reservations.find(el => el.id == slots[startIndex].reservation).type_id == 1)
                                ? "table-column-item-container-reserved-2_event"
                                : "table-column-item-container-reserved-2"
                        } 
                        id={startIndex}
                        style={
                            (slots[index-1].reservation != slots[index].reservation) ? 
                                {borderTopRightRadius: blockRadius, borderTopLeftRadius: blockRadius, 
                                    borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderTop: borderWidth+' solid '+borderColor} : 
                                    (slots[index+1].reservation != slots[index].reservation) ? 
                                    {borderBottomRightRadius: blockRadius, borderBottomLeftRadius: blockRadius,
                                        borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor, borderBottom: borderWidth+' solid '+borderColor} :
                                    {borderBottomRightRadius: '0.0vmin', borderBottomLeftRadius: '0.0vmin', 
                                        borderLeft: borderWidth+' solid '+borderColor, borderRight: borderWidth+' solid '+borderColor}
                        }
                    >
                        {(slots[index-1].reservation != slots[index].reservation) 
                        ? 
                        <>
                            <span className="res-text" style={{marginLeft: '1.5vmin'}}>
                                {reservations.find(el => el.id == slots[index].reservation).timeStart + " - "+reservations.find(el => el.id == slots[index].reservation).duration+" hour(s)"}
                            </span>
                            <span className="res-text" id="ref-res" style={{marginRight: '0.75vmin', color: 'rgba(0,0,0,0.35)', opacity: '0%', pointerEvents: 'none'}}>
                                {reservations.find(el => el.id == slots[index].reservation).id}
                            </span>
                        </>
                        : ''}

                        {(slots[index+1].reservation != slots[index].reservation) 
                        ? 
                        <>
                            {(currentUser) && (currentUser.User_id == reservations.find(el => el.id == slots[startIndex].reservation).customer_id) && <span className="res-text-button" style={{marginRight: '0.75vmin', marginLeft: '0.75vmin', color: 'rgba(0,0,0,0.75)'}}
                                onClick={(e) => {
                                    editing = true;
                                    var parentElement = returnData[e.currentTarget.parentNode.id];
                                    var testRootId = parentElement.props.children[0].props.children[1].props.children;

                                    var testRootTimeStart = reservations.find(el => el.id == testRootId).timeStart;
                                    var testRootDate = reservations.find(el => el.id == testRootId).date;
                                    var testRootDuration = reservations.find(el => el.id == testRootId).duration;
                                    var testRootID = reservations.find(el => el.id == testRootId).id;
                                    var testRootType = reservations.find(el => el.id == testRootId).type_id;

                                    if(loggedIn) {
                                        handleToggleModal();
                                        setSelectedDate(testRootDate);
                                        setSelectedTime(testRootTimeStart);
                                        setSelectedDuration(testRootDuration);
                                        setSelectedID(testRootID);
                                        setSelectedType(testRootType);
                                    }
                                    else {
                                        window.location.pathname = "/login"
                                    }
                                }}
                            >
                                Edit
                            </span>}
                            {(currentUser) && (currentUser.User_id == reservations.find(el => el.id == slots[startIndex].reservation).customer_id) && <span className="res-text-button" style={{marginRight: '0.75vmin', color: 'rgba(0,0,0,0.45)'}}
                                onClick={(e) => {
                                    var parentElement = returnData[e.currentTarget.parentNode.id];
                                    var testRootId = parentElement.props.children[0].props.children[1].props.children;
                                    var testRootDuration = reservations.find(el => el.id == testRootId).duration;
                                    var adjustedDuration = (testRootDuration - 0.25) * 4;

                                    handleButtonDelete(testRootId);
                                }}
                            >
                                Delete
                            </span>}
                        </>
                        : ''}
                    </div>
                )
            }
        });

        return (returnData);
    }

    function renderCustomerReservationDays() {
        var returnData = [];

        for(var i = 0; i < 7; i++) {
            const key = i;
            returnData.push(
                <div key={key} className="lite-day-label"
                    onClick={() => {
                        if(loggedIn) {
                            let amOrPM = dateToday.getHours() >= 12 ? "pm" : "am";
                            editing = false;
                            handleToggleModal();

                            setSelectedDate(getFormattedDate(key));
                            setSelectedTime("7:30am");
                        }
                        else {
                            window.location.pathname = "/login"
                        }
                    }}
                >
                    {getFormattedDate(key)}
                    <div className="lite-day-button">Reserve</div>
                </div>
            );
        }

        return returnData;
    }

    function renderCustomerReservations() {
        var returnData = [];

        customerReservations.map((reservation, index) => {
            returnData.push(
                <div key={index} className="lite-day-label" style={{height: "5vmin", fontSize: "1.5vmin"}}>
                    {reservation.Reservation_date}, Starting at {reservation.Reservation_time} - {reservation.Reservation_duration} hour(s)
                    <span className="customer-reservation-button" style={{marginLeft: "auto"}}>Edit</span>
                    <span className="customer-reservation-button">Delete</span>
                </div>
            );
        });

        return returnData;
    }

    // Handling functions
    function handleCourtNext() {
        if(currentCourt < 16) {
            setCurrentCourt(currentCourt + 1);
        }
    }

    function handleCourtBack() {
        if(currentCourt > 1) {
            setCurrentCourt(currentCourt - 1);
        }
    }

    function handleToggleModal() {
        document.querySelector(".reserve-modal-main-container").classList.toggle("active");
        document.querySelector(".reserve-modal-window-container").classList.toggle("active");
    }

    function handleDurationAdd() {
        if(selectedDuration < 5) {
            setSelectedDuration(selectedDuration + 0.25);
        }
    }

    function handleDurationSubtract() {
        if(selectedDuration > 0.75) {
            setSelectedDuration(selectedDuration - 0.25);
        }
    }

    function handleCourtsAdd() {
        if(numCourts < 2) {
            setNumCourts(numCourts + 1);
        }
    }

    function handleCourtsSubtract() {
        if(numCourts > 1) {
            setNumCourts(numCourts - 1);
        }
    }

    function handleStartTimeAdd() {
        
    }

    function handleStartTimeSubtract(){
        
    }

    function handleButtonSubmit() {
        var courtArray = [];
        var earliestCourt = 1;

        for(var j = 0; j <= numCourts-1; j++) {
            for(var i = earliestCourt; i <= totalCourts; i++) {
                if(courtArray.length < numCourts) {
                    var reservationData = {
                        type_id: selectedType,
                        status_id: 0,
                        date: selectedDate,
                        timeStart: selectedTime,
                        duration: selectedDuration,
                        note: note,
                        court_id: i,
                        customer_id: currentUser.User_id
                    }
    
                    if(checkValidReservation(reservationData)) {
                        courtArray.push(i);
                        if(j == 0) {
                            earliestCourt = i;
                        }
                    }
                    else {
                        console.log("Invalid Reservation on Court "+i);
                    }
                }
            }
        }

        console.log("Selected Courts: "+courtArray);

        // var reservationData = {
        //     type_id: selectedType,
        //     status_id: 0,
        //     date: selectedDate,
        //     timeStart: selectedTime,
        //     duration: selectedDuration,
        //     note: note,
        //     court_id: currentCourt,
        //     customer_id: currentUser.User_id
        // }

        // if(checkValidReservation(reservationData)) {
        //     addReservation(reservationData);
        //     resetSelectedInfo();
        //     handleToggleModal();
        // }
        // else {
        //     document.querySelector(".reserve-modal-window-error").textContent = 'Invalid Reservation: Your reservation overlaps another, or is scheduled outside of business hours!';
        // }
    }

    function handleButtonEdit(rid) {
        var reservationData = {
            id: rid,
            type_id: selectedType,
            status_id: 0,
            date: selectedDate,
            timeStart: selectedTime,
            duration: selectedDuration,
            court_id: currentCourt,
            customer_id: currentUser.User_id
        }

        if(checkValidReservationEdit(reservationData)) {
            editReservation(reservationData);
            resetSelectedInfo();
            handleToggleModal();
        }
        else {
            document.querySelector(".reserve-modal-window-error").textContent = 'Invalid Reservation: Your reservation overlaps another, or is scheduled outside of business hours!';
        }
    }

    function handleButtonDelete(rid) {
        deleteReservation(rid);
    }

    function checkValidReservation(reservationData) {
        var valid = true;

        var startTimeRaw = (reservationData.timeStart).substring(0,(reservationData.timeStart).length - 2);
        var startTimeAmOrPM = (reservationData.timeStart).substring((reservationData.timeStart).length - 2);
        var startTimeHour = startTimeRaw.split(':')[0];
        var startTimeMinutes = startTimeRaw.split(':')[1];
        var durationHours = parseInt(reservationData.duration.toString().split('.')[0]);
        var durationMinutes = parseInt(parseFloat("."+reservationData.duration.toString().split('.')[1]) * 60);

        var endTimeAmOrPM = startTimeAmOrPM;
        var endTimeHour = parseInt(startTimeHour) + parseInt(durationHours);
        var endTimeMinutes = parseInt(startTimeMinutes) + parseInt(durationMinutes);

        if(endTimeMinutes >= 60) {
            endTimeHour += parseInt(endTimeMinutes / 60);
            endTimeMinutes = parseInt(parseFloat("."+parseFloat(endTimeMinutes / 60).toString().split('.')[1]) * 60);

            if(isNaN(endTimeMinutes)) {
                endTimeMinutes = '00';
            }
        }

        if(endTimeHour > 12) {
            endTimeHour -= 12;
            endTimeAmOrPM = 'pm'
        }

        reservations.forEach((res) => {
            var resStartTimeRaw = (res.timeStart).substring(0,(res.timeStart).length - 2);
            var resAmOrPM = (res.timeStart).substring((res.timeStart).length - 2);
            var resTimeHour = resStartTimeRaw.split(':')[0];
            var resTimeMinutes = resStartTimeRaw.split(':')[1];
            var resDurationHours = parseInt(res.duration.toString().split('.')[0]);
            var resDurationMinutes = parseInt(parseFloat("."+res.duration.toString().split('.')[1]) * 60);

            var resEndTimeAmOrPM = resAmOrPM;
            var resEndTimeHour = parseInt(resTimeHour) + parseInt(resDurationHours);
            var resEndTimeMinutes = parseInt(resTimeMinutes) + parseInt(resDurationMinutes);

            if(resEndTimeMinutes >= 60) {
                resEndTimeHour += parseInt(resEndTimeMinutes / 60);
                resEndTimeMinutes = parseInt(parseFloat("."+parseFloat(resEndTimeMinutes / 60).toString().split('.')[1]) * 60);

                if(isNaN(resEndTimeMinutes)) {
                    resEndTimeMinutes = '00';
                }
            }

            if(resEndTimeHour > 12) {
                resEndTimeHour -= 12;
                resEndTimeAmOrPM = 'pm'
            }

            if(res.date == reservationData.date) {
                if(res.court_id == reservationData.court_id) {
                    var resBufferStart = convertTo24Hour(res.timeStart);
                    var resBufferStartHours = parseInt(resBufferStart.split(':')[0]);
                    var resBufferStartMinutes = parseInt(resBufferStart.split(':')[1]);

                    var resBufferEnd = convertTo24Hour(resEndTimeHour+":"+resEndTimeMinutes+resEndTimeAmOrPM);
                    var resBufferEndHours = parseInt(resBufferEnd.split(':')[0]);
                    var resBufferEndMinutes = parseInt(resBufferEnd.split(':')[1]);

                    var reqBufferStart = convertTo24Hour(reservationData.timeStart);
                    var reqBufferStartHours = parseInt(reqBufferStart.split(':')[0]);
                    var reqBufferStartMinutes = parseInt(reqBufferStart.split(':')[1]);

                    var reqBufferEnd = convertTo24Hour(endTimeHour+":"+endTimeMinutes+endTimeAmOrPM);
                    var reqBufferEndHours = parseInt(reqBufferEnd.split(':')[0]);
                    var reqBufferEndMinutes = parseInt(reqBufferEnd.split(':')[1]);

                    var existingStart = parseFloat(resBufferStartHours+parseFloat(resBufferStartMinutes/60));
                    var existingEnd = existingStart + res.duration;

                    var requestStart = parseFloat(reqBufferStartHours+parseFloat(reqBufferStartMinutes/60));
                    var requestEnd = requestStart + reservationData.duration;

                    if(existingStart < requestEnd && existingEnd > requestStart) {
                        valid = false;
                    }
                }
            }
        });

        if(isWeekday(reservationData.date)) {
            if(endTimeHour >= 9 && endTimeAmOrPM == "pm") {
                if(endTimeMinutes == "00" && endTimeHour == 9) {
                    valid = true;
                }
                else {
                    valid = false;
                }
            }
        }
        else {
            if(endTimeHour >= 6 && endTimeAmOrPM == "pm") {
                if(endTimeMinutes == "00" && endTimeHour == 6) {
                    valid = true;
                }
                else {
                    valid = false;
                }
            }
        }

        return valid;
    }

    function checkValidReservationEdit(reservationData) {
        var valid = true;

        var startTimeRaw = (reservationData.timeStart).substring(0,(reservationData.timeStart).length - 2);
        var startTimeAmOrPM = (reservationData.timeStart).substring((reservationData.timeStart).length - 2);
        var startTimeHour = startTimeRaw.split(':')[0];
        var startTimeMinutes = startTimeRaw.split(':')[1];
        var durationHours = parseInt(reservationData.duration.toString().split('.')[0]);
        var durationMinutes = parseInt(parseFloat("."+reservationData.duration.toString().split('.')[1]) * 60);

        var endTimeAmOrPM = startTimeAmOrPM;
        var endTimeHour = parseInt(startTimeHour) + parseInt(durationHours);
        var endTimeMinutes = parseInt(startTimeMinutes) + parseInt(durationMinutes);

        if(endTimeMinutes >= 60) {
            endTimeHour += parseInt(endTimeMinutes / 60);
            endTimeMinutes = parseInt(parseFloat("."+parseFloat(endTimeMinutes / 60).toString().split('.')[1]) * 60);

            if(isNaN(endTimeMinutes)) {
                endTimeMinutes = '00';
            }
        }

        if(endTimeHour > 12) {
            endTimeHour -= 12;
            endTimeAmOrPM = 'pm'
        }

        reservations.forEach((res) => {
            var resStartTimeRaw = (res.timeStart).substring(0,(res.timeStart).length - 2);
            var resAmOrPM = (res.timeStart).substring((res.timeStart).length - 2);
            var resTimeHour = resStartTimeRaw.split(':')[0];
            var resTimeMinutes = resStartTimeRaw.split(':')[1];
            var resDurationHours = parseInt(res.duration.toString().split('.')[0]);
            var resDurationMinutes = parseInt(parseFloat("."+res.duration.toString().split('.')[1]) * 60);

            var resEndTimeAmOrPM = resAmOrPM;
            var resEndTimeHour = parseInt(resTimeHour) + parseInt(resDurationHours);
            var resEndTimeMinutes = parseInt(resTimeMinutes) + parseInt(resDurationMinutes);

            if(resEndTimeMinutes >= 60) {
                resEndTimeHour += parseInt(resEndTimeMinutes / 60);
                resEndTimeMinutes = parseInt(parseFloat("."+parseFloat(resEndTimeMinutes / 60).toString().split('.')[1]) * 60);

                if(isNaN(resEndTimeMinutes)) {
                    resEndTimeMinutes = '00';
                }
            }

            if(resEndTimeHour > 12) {
                resEndTimeHour -= 12;
                resEndTimeAmOrPM = 'pm'
            }

            if(res.id != reservationData.id) {
                if(res.date == reservationData.date) {
                    if(res.court_id == reservationData.court_id) {
                        var resBufferStart = convertTo24Hour(res.timeStart);
                        var resBufferStartHours = parseInt(resBufferStart.split(':')[0]);
                        var resBufferStartMinutes = parseInt(resBufferStart.split(':')[1]);
    
                        var resBufferEnd = convertTo24Hour(resEndTimeHour+":"+resEndTimeMinutes+resEndTimeAmOrPM);
                        var resBufferEndHours = parseInt(resBufferEnd.split(':')[0]);
                        var resBufferEndMinutes = parseInt(resBufferEnd.split(':')[1]);
    
                        var reqBufferStart = convertTo24Hour(reservationData.timeStart);
                        var reqBufferStartHours = parseInt(reqBufferStart.split(':')[0]);
                        var reqBufferStartMinutes = parseInt(reqBufferStart.split(':')[1]);
    
                        var reqBufferEnd = convertTo24Hour(endTimeHour+":"+endTimeMinutes+endTimeAmOrPM);
                        var reqBufferEndHours = parseInt(reqBufferEnd.split(':')[0]);
                        var reqBufferEndMinutes = parseInt(reqBufferEnd.split(':')[1]);
    
                        var existingStart = parseFloat(resBufferStartHours+parseFloat(resBufferStartMinutes/60));
                        var existingEnd = existingStart + res.duration;
    
                        var requestStart = parseFloat(reqBufferStartHours+parseFloat(reqBufferStartMinutes/60));
                        var requestEnd = requestStart + reservationData.duration;
    
                        if(existingStart < requestEnd && existingEnd > requestStart) {
                            valid = false;
                        }
                    }
                }
            }
        });

        if(isWeekday(reservationData.date)) {
            if(endTimeHour >= 9 && endTimeAmOrPM == "pm") {
                if(endTimeMinutes == "00" && endTimeHour == 9) {
                    valid = true;
                }
                else {
                    valid = false;
                }
            }
        }
        else {
            if(endTimeHour >= 6 && endTimeAmOrPM == "pm") {
                if(endTimeMinutes == "00" && endTimeHour == 6) {
                    valid = true;
                }
                else {
                    valid = false;
                }
            }
        }

        return valid;
    }

    // Borrowed from https://stackoverflow.com/a/17555888
    function convertTo24Hour(time) {
        var hours = parseInt(time.substr(0, 2));
        if(time.indexOf('am') != -1 && hours == 12) {
            time = time.replace('12', '0');
        }
        if(time.indexOf('pm')  != -1 && hours < 12) {
            time = time.replace(hours, (hours + 12));
        }
        return time.replace(/(am|pm)/, '');
    }

    function isWeekday(date) {
        var returnValue = true;
        var dateRaw = convertToDateFromString(date);
        var dateDay = dateRaw.toLocaleString('en-us', {  weekday: 'short' });

        if(dateDay == 'Sat' || dateDay == 'Sun') {
            returnValue = false;
        }

        return returnValue;
    }

    function resetSelectedInfo() {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDuration(0.75);
        setSelectedID(-1);
        setSelectedType(0);
        setNumCourts(1);
        setNote('');
        document.querySelector(".reserve-modal-window-error").textContent = '';
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-reserve-lite">
                <div className="container-option-lite">
                    <span style={{marginBottom: "2vmin", marginTop: "2vmin", color: "rgb(0,0,0,0.5)"}}>Create a New Reservation</span>
                    {renderCustomerReservationDays()}
                </div>
                <div className="container-option-lite" style={{marginTop: "2vmin"}}>
                    Edit an Existing Reservation
                    <div className="lite-edit-label">
                        {loggedIn ? "Select your reservation" : "Please login to edit a reservation"}
                    </div>
                    <br/>
                    {renderCustomerReservations()}
                </div>
                <div className="lite-warning-label">
                    ⚠️ If you are trying to schedule a tournament, or any event where you'll need 
                    multiple courts simultaneously, you'll need to contact us directly so that
                    a manager can properly schedule your event.
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
            </div>
            <div className="reserve-modal-main-container">
                <div className="reserve-modal-window-container">
                    <div className="reserve-modal-window-title-container">
                        <div className="reserve-modal-window-title-text">{editing ? "Edit" : "Create"} Reservation</div>
                        <div className="reserve-modal-window-button-close"
                            onClick={() => {
                                handleToggleModal();
                                resetSelectedInfo();
                            }}
                        ></div> 
                    </div>
                    <div className="reserve-modal-window-body-container">
                        <div className="reserve-modal-window-body-text">Date: {selectedDate}</div>
                        <div className="reserve-modal-window-body-text">Time: 
                            <div className="reserve-modal-window-button-duration-sub"
                                onClick={() => {
                                    // handleCourtsSubtract();
                                }}
                            ></div>
                            {selectedTime}
                            <div className="reserve-modal-window-button-duration-add"
                                onClick={() => {
                                    // handleCourtsAdd();
                                }}
                            ></div>
                        </div>
                        <div className="reserve-modal-window-body-text">Courts: 
                            <div className="reserve-modal-window-button-duration-sub"
                                onClick={() => {
                                    handleCourtsSubtract();
                                }}
                            ></div>
                            {numCourts}
                            <div className="reserve-modal-window-button-duration-add"
                                onClick={() => {
                                    handleCourtsAdd();
                                }}
                            ></div>
                        </div>
                        <div className="reserve-modal-window-body-text">Duration: 
                            <div className="reserve-modal-window-button-duration-sub"
                                onClick={() => {
                                    handleDurationSubtract();
                                }}
                            ></div>
                            {selectedDuration.toFixed(2).split('.')[0]} hour(s) {parseFloat('.'+selectedDuration.toFixed(2).split('.')[1]) * 60} minute(s)
                            <div className="reserve-modal-window-button-duration-add"
                                onClick={() => {
                                    handleDurationAdd();
                                }}
                            ></div>
                        </div>
                        <div className="reserve-modal-window-body-text">
                            Type: 
                            <span className={selectedType == 0 ? "reserve-modal-window-button-type active" : "reserve-modal-window-button-type"}
                                onClick={() => {
                                    setSelectedType(0);
                                }}
                            >
                                Standard
                            </span>
                            <span className={selectedType == 1 ? "reserve-modal-window-button-type active" : "reserve-modal-window-button-type"}
                                onClick={() => {
                                    setSelectedType(1);
                                }}
                            >
                                Event
                            </span>
                        </div>
                        <div className="reserve-modal-window-body-text">Note: </div>
                        <div className="reserve-modal-window-body-text" style={{width: "100%"}}>
                            <textarea 
                                className="reserve-modal-window-textarea"
                                placeholder="Enter any special requests or additional information here"
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div className="reserve-modal-window-button-submit"
                            onClick={() => {
                                if(editing) {
                                    handleButtonEdit(selectedID);
                                }
                                else {
                                    handleButtonSubmit();
                                }
                            }}
                        >
                            {editing ? "Change" : "Reserve"}
                        </div>
                        <div className="reserve-modal-window-error"></div>
                    </div>
                 </div>      
            </div>
            <Loading timeRange={[400, 800]} />
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Reserve;