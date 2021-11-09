// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Reserve.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

// Importing the components used in this page
import Loading from '../components/Loading';
import bg_redo from '../assets/images/svgs/icons/solid/redo.svg';
import bg_back from '../assets/images/svgs/icons/solid/angle-double-left.svg';

var dateToday;

if(!sessionStorage.getItem("adminGlobalDate")) {
    sessionStorage.setItem("adminGlobalDate", 0);
}
var newDate = new Date();
newDate.setDate(newDate.getDate()+(7 * sessionStorage.getItem("adminGlobalDate")));

const totalCourts = 16;
const maxCourtReservations = 16;
const daysArray = [0,1,2,3,4,5,6];
const courtsNumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const ballMachineCourts = [1,4,5,11,12,13,16];

var resArray = [];
var resBuffer = [];
var gotReservationData = false;
var editing = false;

function ReserveAdmin(props) {
    dateToday = newDate;
    // let bufferDate = new Date();
    // bufferDate.setDate(bufferDate.getDate()+(adminCurrentWeek*7));
    // var dateToday = bufferDate;

    // const [dateBuffer, setDateBuffer] = useState(window.sessionStorage.getItem("adminGlobalDate"));
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [userArray, setUserArray] = useState([]);
    const [currentCourt, setCurrentCourt] = useState(1);
    const [currentArrayCourt, setCurrentArrayCourt] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const [note, setNote] = useState('');
    const [numCourts, setNumCourts] = useState(1);
    const [selectedDuration, setSelectedDuration] = useState(0.75);
    const [selectedID, setSelectedID] = useState();
    const [selectedCustomerID, setSelectedCustomerID] = useState(1);
    const [reservations, setReservations] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedEquipment, setSelectedEquipment] = useState({
        racket: false,
        hopper: false,
        ballmachine: false
    });
    const [selectedReseervationToDelete, setSelectedReservationToDelete] = useState(null);
    const history = useHistory();
    
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

    const [columnDays, setColumnDays] = useState([
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 0),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 1),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 2),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 3),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 4),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 5),
            slots: timeslotsJSON,
            closed: false
        },
        {
            date: getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 6),
            slots: timeslotsJSON,
            closed: false
        }
    ])

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotReservationData) {
            getReservationData();
        }

        getAllClosures();
        getAllUsers();

        return () => {
            gotReservationData = false;
        }
    }, []);

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

    function handleWeekNext() {
        sessionStorage.setItem("adminGlobalDate", parseInt(sessionStorage.getItem("adminGlobalDate"))+1);
        fastRefresh() 
    }

    function handleWeekPrev() {
        sessionStorage.setItem("adminGlobalDate", parseInt(sessionStorage.getItem("adminGlobalDate"))-1);
        fastRefresh() 
    }

    function handleWeekReset() {
        sessionStorage.setItem("adminGlobalDate", 0);
        fastRefresh() 
    }

    function fastRefresh() {
        history.push("/temp");
        history.goBack();
    }

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

    async function getAllUsers() {
        let response = await fetch("http://3.218.225.62:3040/user/getall");
        response = await response.json();
        setUserArray(response.users);
    }

    async function getAllClosures() {
        let response = await fetch("http://3.218.225.62:3040/closure/getall");
        response = await response.json();
        // setClosures(response.closures);

        let closureArray = response.closures.map(closure => closure.Closure_date);
        let newColumnDays = columnDays;

        Object.values(columnDays).map((day,idx) => {
            if(closureArray.includes(day.date)) {
                newColumnDays[idx].closed = true;
            }
        });

        setColumnDays(newColumnDays);

        gotReservationData = false;
        getReservationData();
    }

    async function addClosure(date) {
        let response = await fetch("http://3.218.225.62:3040/closure/add/"+date);
        response = await response.json();
        fastRefresh()
    }

    async function removeClosure(date) {
        let response = await fetch("http://3.218.225.62:3040/closure/remove/"+date);
        response = await response.json();
        fastRefresh()
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
                    note: res.Reservation_note,
                    court_id: res.Court_id,
                    equipment_id: res.Equipment_id,
                    customer_id: res.Customer_id,
                    people: res.Reservation_people
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
        .then(() => {
            let user = userArray.find(user => user.User_id == data.customer_id);

            let alertData = {
                start: data.timeStart,
                date: data.date,
                court: data.court_id,
                email: user.User_email
            }

            fetch("http://3.218.225.62:3040/alert/send/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alertData)
            })
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
        .then(() => {
            let user = userArray.find(user => user.User_id == data.customer_id);

            let alertData = {
                start: data.timeStart,
                date: data.date,
                court: data.court_id,
                email: user.User_email
            }

            fetch("http://3.218.225.62:3040/alert/edit/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alertData)
            })
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
            setSelectedReservationToDelete(null);
        })
        .then(() => {
            let alertData = {
                date: reservations.find(res => res.id == rid).date,
                email: userArray.find(user => user.User_id == reservations.find(res => res.id == rid).customer_id).User_email
            }

            fetch("http://3.218.225.62:3040/alert/delete/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alertData)
            })
            .then(() => {
                gotReservationData = false;
                getReservationData();
                setSelectedReservationToDelete(null);
                setSelectedDate(null);
            })
        })
    }

    // Formatting functions
    function convertDate(day) {
        return (
            dateToday.getMonth()+1+"/"+day+"/"+dateToday.getFullYear()
        )
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

            if(day.closed) {
                dayTimeslots.forEach((slot) => {
                    slot.status = 'closed'
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
                    if(reservation.court_id.includes(currentCourt)) {
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
                            {<span className="res-text-button" style={{marginRight: '0.75vmin', marginLeft: '0.75vmin', color: 'rgba(0,0,0,0.75)'}}
                                onClick={(e) => {
                                    editing = true;
                                    var parentElement = returnData[e.currentTarget.parentNode.id];
                                    var testRootId = parentElement.props.children[0].props.children[1].props.children;

                                    var testRootTimeStart = reservations.find(el => el.id == testRootId).timeStart;
                                    var testRootDate = reservations.find(el => el.id == testRootId).date;
                                    var testRootDuration = reservations.find(el => el.id == testRootId).duration;
                                    var testRootID = reservations.find(el => el.id == testRootId).id;
                                    var testRootType = reservations.find(el => el.id == testRootId).type_id;
                                    var testRootNote = reservations.find(el => el.id == testRootId).note;
                                    var testRootNumCourts = reservations.find(el => el.id == testRootId).court_id;
                                    var testRootEquipment = reservations.find(el => el.id == testRootId).equipment_id;
                                    var testRootCustomer = reservations.find(el => el.id == testRootId).customer_id;
                                    var testRootPeople = reservations.find(el => el.id == testRootId).people;

                                    if(loggedIn) {
                                        handleToggleModal();
                                        setSelectedDate(testRootDate);
                                        setSelectedTime(testRootTimeStart);
                                        setSelectedDuration(testRootDuration);
                                        setSelectedID(testRootID);
                                        setSelectedType(testRootType);
                                        setNumCourts(testRootNumCourts.length);
                                        setCurrentArrayCourt(testRootNumCourts);
                                        setSelectedEquipment({
                                            racket: testRootEquipment.includes(0),
                                            hopper: testRootEquipment.includes(1),
                                            ballmachine: testRootEquipment.includes(2),
                                        });
                                        setNote(testRootNote);
                                        setSelectedPeople(testRootPeople);
                                        setSelectedCustomerID(testRootCustomer);
                                    }
                                    else {
                                        window.location.pathname = "/login"
                                    }
                                }}
                            >
                                Edit
                            </span>}
                            {/* (currentUser) && (currentUser.User_id == reservations.find(el => el.id == slots[startIndex].reservation).customer_id) &&  */}
                            {<span className="res-text-button" style={{marginRight: '0.75vmin', color: 'rgba(0,0,0,0.45)'}}
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

    // Handling functions
    function handlePeopleAdd() {
        if(selectedPeople < 4) {
            setSelectedPeople(selectedPeople + 1);
        }
    }

    function handlePeopleSubtract() {
        if(selectedPeople > 1) {
            setSelectedPeople(selectedPeople - 1);
        }
    }

    function handleCourtSelect(value, e) {
        let position = {
            x: e.currentTarget.getBoundingClientRect().x,
            y: e.currentTarget.getBoundingClientRect().top
        }
        let follower = document.querySelector('.court-follower');
        follower.style.left = position.x + 'px';
        follower.style.top = position.y + 'px';
        // follower.style.width = Math.abs(follower.style.left + position.x) + 'px';

        setCurrentCourt(value);
    }

    function handleCourtsAdd() {
        if(numCourts < maxCourtReservations) {
            setNumCourts(numCourts + 1);
        }
    }

    function handleCourtsSubtract() {
        if(numCourts > 1) {
            setNumCourts(numCourts - 1);
        }
    }

    function handleToggleModal() {
        document.querySelector(".reserve-modal-main-container").classList.toggle("active");
        document.querySelector(".reserve-modal-window-container").classList.toggle("active");
    }

    function handleToggleDeleteModal() {
        document.querySelector(".reserve-modal-delete").classList.toggle("active");
        document.querySelector(".reserve-modal-delete-window").classList.toggle("active");
    }

    function handleDurationAdd() {
        if(selectedDuration < 12) {
            setSelectedDuration(selectedDuration + 0.25);
        }
    }

    function handleDurationSubtract() {
        if(selectedDuration > 0.75) {
            setSelectedDuration(selectedDuration - 0.25);
        }
    }

    function handleButtonSubmit() {
        var courtArray = [];
        var equipmentArray = [];
        var earliestCourt = currentCourt;
        var errorBox = document.querySelector(".reserve-modal-window-error");

        Object.values(selectedEquipment).forEach((val, idx) => {
            if(val) {
                equipmentArray.push(idx);
            }
        });

        for(var j = 0; j <= numCourts-1; j++) {
            for(var i = earliestCourt; i <= totalCourts; i++) {
                if(courtArray.length < numCourts) {
                    var reservationData = {
                        type_id: selectedType,
                        status_id: 0,
                        date: selectedDate,
                        timeStart: selectedTime,
                        duration: selectedDuration,
                        note: note.replace(/"/g, '\''),
                        court_id: i,
                        equipment_id: "["+equipmentArray.toString()+"]",
                        customer_id: selectedCustomerID,
                        people: selectedPeople
                    }
    
                    if(checkValidReservation(reservationData)) {
                        courtArray.push(i);
                        if(j == 0) {
                            earliestCourt = i;
                        }
                    }
                }
            }
        }

        if(courtArray.length == 0 || courtArray.length != numCourts || hasDuplicates(courtArray)) {
            errorBox.textContent = 'Invalid Reservation: There are no available reservations for the requested date and time!';
        }
        else {
            var reservationData = {
                type_id: selectedType,
                status_id: 0,
                date: selectedDate,
                timeStart: selectedTime,
                duration: selectedDuration,
                note: note.replace(/"/g, '\''),
                court_id: "["+courtArray.toString()+"]",
                equipment_id: "["+equipmentArray.toString()+"]",
                customer_id: selectedCustomerID,
                people: selectedPeople
            }
    
            addReservation(reservationData);
            resetSelectedInfo();
            handleToggleModal();
        }
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
        var courtArray = [];
        var equipmentArray = [];
        var earliestCourt = currentArrayCourt[0];
        var errorBox = document.querySelector(".reserve-modal-window-error");

        Object.values(selectedEquipment).forEach((val, idx) => {
            if(val) {
                equipmentArray.push(idx);
            }
        });

        for(var j = 0; j <= numCourts-1; j++) {
            for(var i = earliestCourt; i <= totalCourts; i++) {
                if(courtArray.length < numCourts) {
                    var reservationData = {
                        id: rid,
                        type_id: selectedType,
                        status_id: 0,
                        date: selectedDate,
                        timeStart: selectedTime,
                        duration: selectedDuration,
                        note: note.replace(/"/g, '\''),
                        court_id: i,
                        equipment_id: "["+equipmentArray.toString()+"]",
                        customer_id: selectedCustomerID,
                        people: selectedPeople
                    }
    
                    if(checkValidReservationEdit(reservationData)) {
                        courtArray.push(i);
                        if(j == 0) {
                            earliestCourt = i;
                        }
                    }
                }
            }
        }

        if(courtArray.length == 0 || courtArray.length != numCourts || hasDuplicates(courtArray)) {
            errorBox.textContent = 'Invalid Reservation: There are no available reservations for the requested date and time!';
        }
        else {
            var reservationData = {
                id: rid,
                type_id: selectedType,
                status_id: 0,
                date: selectedDate,
                timeStart: selectedTime,
                duration: selectedDuration,
                note: note.replace(/"/g, '\''),
                court_id: "["+courtArray.toString()+"]",
                equipment_id: "["+equipmentArray.toString()+"]",
                customer_id: selectedCustomerID,
                people: selectedPeople
            }
    
            editReservation(reservationData);
            resetSelectedInfo();
            handleToggleModal();
        }

        // var reservationData = {
        //     id: rid,
        //     type_id: selectedType,
        //     status_id: 0,
        //     date: selectedDate,
        //     timeStart: selectedTime,
        //     duration: selectedDuration,
        //     note: note,
        //     court_id: numCourts.length,
        //     customer_id: currentUser.User_id
        // }

        // if(checkValidReservationEdit(reservationData)) {
        //     editReservation(reservationData);
        //     resetSelectedInfo();
        //     handleToggleModal();
        // }
        // else {
        //     document.querySelector(".reserve-modal-window-error").textContent = 'Invalid Reservation: Your reservation overlaps another, or is scheduled outside of business hours!';
        // }
    }

    function handleButtonDelete(rid) {
        handleToggleDeleteModal();
        setSelectedReservationToDelete(rid);
    }

    function handleDateCloseOpen(index) {
        var dateString = columnDays[index].date;

        if(columnDays[index].closed) {
            removeClosure(dateString);
        }
        else {
            addClosure(dateString);
        }
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
                if(res.court_id.includes(reservationData.court_id)) {
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
                    if(res.court_id.includes(reservationData.court_id)) {
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

    // Borrowed from https://stackoverflow.com/a/7376645/17127255
    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    function resetSelectedInfo() {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDuration(0.75);
        setSelectedID();
        setSelectedType(0);
        setSelectedCustomerID(1);
        setNote('');
        setCurrentArrayCourt([]);
        setNumCourts(1);
        setSelectedPeople(1);
        document.querySelector(".reserve-modal-window-error").textContent = '';
        setSelectedEquipment({
            racket: false,
            hopper: false,
            ballmachine: false
        });
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-reserve">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="reservation-content-title">
                    {/* <div className="court-back-button"
                        onClick={() => {
                            handleCourtBack();
                        }}
                    ></div> */}
                    {courtsNumberArray.map((val, idx) => {
                        return (
                            <span
                                key={idx}
                                id={`court-item-id-${idx}`}
                                className={`court-list-item ${currentCourt == val ? "active" : ""}`}
                                onClick={(e) => {
                                    handleCourtSelect(val, e);
                                }}
                            >
                                Court {val}
                            </span>
                        )
                    })}
                    {/* <div className="court-next-button"
                        onClick={() => {
                            handleCourtNext();
                        }}
                    ></div> */}
                </div>
                <div className="reserve-form-container">
                    <div className="table-labels-container">
                        {daysArray.map((day, index) => {
                            return (
                                <div className="table-label" key={index} style={columnDays[index].closed ? {backgroundColor: "#D9D9D9", color: "rgba(0,0,0,0.5)"} : {}}>
                                    {/* {day == 0 ? "Today" : convertDate(dateToday.getDate()+day)} */}
                                    {/* {convertDate(dateToday.getDate()+day)} */}
                                    {getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + day)}
                                    <div className="table-label-date-close"
                                        onClick={() => {
                                            handleDateCloseOpen(index);
                                        }}
                                    >
                                        <div className="table-label-date-close-btn" style={columnDays[index].closed ? {backgroundColor: "#8AA2FF"} : {}}>
                                            {columnDays[index].closed == false ? "Close" : "Open"}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="table-content-container">
                        <div className="table-hours-container">
                            {renderTimeColumn()}
                        </div>

                        {renderColumns()}
                    </div>
                    <div className="reservation-legend">
                        <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(165, 216, 161)'}}></div>Open</span>
                        <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(217, 217, 217)'}}></div>Closed</span>
                        <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(179, 194, 255)'}}></div>Reserved</span>
                        {/* <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(138, 162, 255)'}}></div>My Reservation</span> */}
                        <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(255, 219, 128)'}}></div>Reserved - Event</span>
                        {/* <span className="legend-item"><div className="legend-item-color" style={{backgroundColor: 'rgb(255, 200, 60)'}}></div>My Event Reservation</span> */}
                    </div>
                </div>
                <div className="week-selector-container">
                    <button className="week-selector-btn"
                        onClick={() => {
                            handleWeekNext();
                        }}
                    >
                        <div className="week-btn-label">
                            {getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 7).substring(0,getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 7).lastIndexOf('/'))}
                            &nbsp;-&nbsp;
                            {getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 13).substring(0,getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) + 13).lastIndexOf('/'))}
                        </div>
                    </button>
                    <button className="week-selector-btn" 
                        style={{ 
                            backgroundImage: `url("${bg_redo}")`,

                        }}
                        onClick={() => {
                           handleWeekReset();
                        }}
                    >
                        <div className="week-btn-label">Reset</div>
                    </button>
                    <button className="week-selector-btn"
                        style={{ 
                            backgroundImage: `url("${bg_back}")`,

                        }}
                        onClick={() => {
                            handleWeekPrev();
                        }}
                    >
                        <div className="week-btn-label">
                        {getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) - 7).substring(0,getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) - 7).lastIndexOf('/'))}
                            &nbsp;-&nbsp;
                            {getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) - 1).substring(0,getFormattedDate((7 * sessionStorage.getItem("adminGlobalDate")) - 1).lastIndexOf('/'))}
                        </div>
                    </button>
                </div>
                {/* {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>} */}
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
                        <div className="reserve-modal-window-body-row">
                            <div className="reserve-modal-window-body-text">Date: {selectedDate}</div>
                            <div className="reserve-modal-window-body-text">Time: {selectedTime}</div>
                        </div>
                        <div className="reserve-modal-window-body-row">
                            {editing && <div className="reserve-modal-window-body-text">Court List: {currentArrayCourt.toString()}</div>}
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
                            {!editing && <div className="reserve-modal-window-body-text">
                                Customer:
                                <select className="reserve-customer-select" value={selectedCustomerID}
                                    onChange={(e) => {
                                        setSelectedCustomerID(e.target.value);
                                    }}
                                >
                                    {userArray.map((user, idx) => {
                                        return (
                                            <option key={idx} value={user.User_id}>{user.User_email}</option>
                                        )
                                    })}
                                </select>
                            </div>}
                            
                        </div>
                        {/* <a href="#" style={{marginLeft: "auto"}}>User Link</a> */}
                        {editing && <div className="reserve-modal-window-body-row">
                            <div className="reserve-modal-window-body-text" style={{opacity: "50%"}}>
                                Reservation ID: {selectedID}
                            </div>
                            <div className="reserve-modal-window-body-text">
                                Customer: 
                                <select className="reserve-customer-select" value={selectedCustomerID}
                                    onChange={(e) => {
                                        setSelectedCustomerID(e.target.value);
                                    }}
                                >
                                    {userArray.map((user, idx) => {
                                        return (
                                            <option key={idx} value={user.User_id}>{user.User_email}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>}

                        <div className="reserve-modal-window-body-linebreak" />
                        
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
                        <div className="reserve-modal-window-body-text">
                            Equipment: 
                            <span className={`reserve-modal-window-button-equipment ${selectedEquipment.racket == true ? "active" : ""}`}
                                onClick={() => {
                                    if(selectedEquipment.racket ==  false) {
                                        setSelectedEquipment({...selectedEquipment, racket: true});
                                    }
                                    else {
                                        setSelectedEquipment({...selectedEquipment, racket: false});
                                    }
                                }}
                            >
                                Racket
                            </span>
                            <span className={`reserve-modal-window-button-equipment ${selectedEquipment.hopper == true ? "active" : ""}`}
                                onClick={() => {
                                    if(selectedEquipment.hopper ==  false) {
                                        setSelectedEquipment({...selectedEquipment, hopper: true});
                                    }
                                    else {
                                        setSelectedEquipment({...selectedEquipment, hopper: false});
                                    }
                                }}
                            >
                                Hopper
                            </span>
                            {(ballMachineCourts.includes(currentCourt)) && <span className={`reserve-modal-window-button-equipment ${selectedEquipment.ballmachine == true ? "active" : ""}`}
                                onClick={() => {
                                    if(selectedEquipment.ballmachine ==  false) {
                                        setSelectedEquipment({...selectedEquipment, ballmachine: true});
                                    }
                                    else {
                                        setSelectedEquipment({...selectedEquipment, ballmachine: false});
                                    }
                                }}
                            >
                                Ball Machine
                            </span>}
                        </div>
                        <div className="reserve-modal-window-body-text">Number of People: 
                            <div className="reserve-modal-window-button-duration-sub"
                                onClick={() => {
                                    handlePeopleSubtract();
                                }}
                            />
                            {selectedPeople}
                            <div className="reserve-modal-window-button-duration-add"
                                onClick={() => {
                                    handlePeopleAdd();
                                }}
                            />
                        </div>

                        <div className="reserve-modal-window-body-linebreak" />

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
                            style={{
                                height: "4vmin",
                                width: "100%",
                            }}
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
            <div className="reserve-modal-delete">
                <div className="reserve-modal-delete-window">
                    <div className="reserve-modal-delete-title">Are you sure you want to delete this reservation?</div>
                    <div className="reserve-modal-delete-row">
                        <div className="reserve-modal-delete-button"
                            style={{backgroundColor: "rgba(255, 0,0, 0.55)", color: "rgba(255,255,255,1)", height: "4vmin"}}
                            onClick={() => {
                                deleteReservation(selectedReseervationToDelete);
                                handleToggleDeleteModal();
                            }}
                        >
                            Delete
                        </div>
                        <div className="reserve-modal-delete-button"
                            style={{backgroundColor: "rgba(0, 0, 0, 0.1)", height: "4vmin"}}
                            onClick={() => {
                                setSelectedReservationToDelete(null);
                                handleToggleDeleteModal();
                            }}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
            {/* <Loading timeRange={[1000,2000]}/> */}
            {document.getElementById('court-item-id-0') && 
                <div className="court-follower" style={{
                    left: document.getElementById('court-item-id-0').getBoundingClientRect().x + "px",
                    top: document.getElementById('court-item-id-0').getBoundingClientRect().top + "px",
                }}>
                    <div className="court-follower-bar" />
                </div>
            }
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default ReserveAdmin;