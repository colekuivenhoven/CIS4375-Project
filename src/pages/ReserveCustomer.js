// All imports must be done before the main function
    // Importing this page's CSS file
    import '../assets/styles/Reserve.css';
    import 'antd/dist/antd.css';
    
    // Importing common files used in react
    import React, { useEffect, useRef, useState } from "react";
    import ReactDOM from 'react-dom';
    import { TimePicker } from 'antd';
    import moment from 'moment';
    
    // Importing the components used in this page
    import Loading from '../components/Loading';
    
    // Variables declared that will persist even if page is changed
    var localNumberRaw = 0;
    const dateToday = new Date();
    const totalCourts = 16;
    const maxCourtReservations = 14;
    const daysArray = [0,1,2,3,4,5,6];
    const ballMachineCourts = [1,4,5,11,12,13,16];
    const format = 'H:mm a';
    
    var timeOpen = moment('7:30am', 'H:mm a');
    var timeClosedWeek = moment('9:00pm', 'H:mm a');
    var timeClosedWeekend = moment('6:00pm', 'H:mm a');
    
    var resArray = [];
    var resBuffer = [];
    var gotReservationData = false;
    var editing = false;
    
    // Main function for the specific 'page'
    function ReserveCustomer(props) {
        // 'Reactive' variables that will cause the page to update when their values change
            // 'useState' at the end of each describes their initial value
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
        const [selectedPeople, setSelectedPeople] = useState(1);
        const [reservations, setReservations] = useState([]);
        const [selectedEquipment, setSelectedEquipment] = useState({
            racket: false,
            hopper: false,
            ballmachine: false
        });
        const [selectedReseervationToDelete, setSelectedReservationToDelete] = useState(null);
        const [customerReservations, setCustomerReservations] = useState([]);
        const [timeValue, setTimeValue] = useState("7:30am");
        const socket = props.socket;
    
        const timePickerRef = useRef(null);
    
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
                date: convertDate(dateToday.getDate()),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+1),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+2),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+3),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+4),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+5),
                slots: timeslotsJSON,
                closed: false
            },
            {
                date: convertDate(dateToday.getDate()+6),
                slots: timeslotsJSON,
                closed: false
            }
        ])
    
        // 'useEffect' runs once for every render of the page
        useEffect(() => {
            if(!gotReservationData) {
                getReservationData();
                getCustomerReservationData();
            }
    
            getAllClosures();
            getAllUsers();
            
    
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
                        people: res.Reservation_people,
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
                getCustomerReservationData();
            })
            .then(() => {
                let alertData = {
                    start: data.timeStart,
                    date: data.date,
                    court: data.court_id,
                    email: currentUser.User_email
                }
    
                if(currentUser.User_getAnnouncements != 0) {
                    fetch("http://3.218.225.62:3040/alert/send/", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(alertData)
                    })
                }
            })
            .then(() => {
                socket.emit('add-reservation');
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
                getCustomerReservationData();
            })
            .then(() => {
                let alertData = {
                    start: data.timeStart,
                    date: data.date,
                    court: data.court_id,
                    email: currentUser.User_email
                }
    
                if(currentUser.User_getAnnouncements != 0) {
                    fetch("http://3.218.225.62:3040/alert/edit/", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(alertData)
                    })
                }
            })
            .then(() => {
                socket.emit('edit-reservation');
            })
        }
    
        function deleteReservation(rid) {
            fetch("http://3.218.225.62:3040/reservation/delete/perm", {
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
                getCustomerReservationData();
            })
            .then(() => {
                let alertData = {
                    date: selectedDate,
                    email: currentUser.User_email
                }
    
                if(currentUser.User_getAnnouncements != 0) {
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
                        getCustomerReservationData();
                        setSelectedDate(null);
                    })
                }
            })
            .then(() => {
                socket.emit('delete-reservation');
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
    
        // Rendering functions
        function renderCustomerReservationDays() {
            var returnData = [];
    
            for(var i = 0; i < 7; i++) {
                const key = i;
                returnData.push(
                    <div key={key} className={`lite-day-label ${columnDays[i].closed ? "closed" : ""}`}
                        onClick={() => {
                            if(loggedIn) {
                                let amOrPM = dateToday.getHours() >= 12 ? "pm" : "am";
                                editing = false;
                                handleToggleModal();
                                setSelectedCustomerID(currentUser.User_id);
    
                                setSelectedDate(getFormattedDate(key));
                                setSelectedTime("7:30am");
                            }
                            else {
                                window.location.pathname = "/login"
                            }
                        }}
                    >
                        {getFormattedDate(key)} {columnDays[i].closed ? " - CLOSED" : ""}
                        {!columnDays[i].closed && <div className="lite-day-button">Reserve</div>}
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
                        <span className="customer-reservation-button" style={{marginLeft: "auto"}}
                            onClick={() => {
                                if(loggedIn) {
                                    editing = true;
                                    setSelectedID(reservation.Reservation_id);
                                    setSelectedCustomerID(currentUser.User_id);
                                    setSelectedDate(reservation.Reservation_date);
                                    setSelectedTime(reservation.Reservation_time);
                                    setTimeValue(reservation.Reservation_time);
                                    setNumCourts(reservation.Court_id.length);
                                    setCurrentArrayCourt(reservation.Court_id);
                                    setSelectedType(reservation.Reservation_type);
                                    setSelectedPeople(reservation.Reservation_people);
                                    setSelectedEquipment({
                                        racket: reservation.Equipment_id.includes(0),
                                        hopper: reservation.Equipment_id.includes(1),
                                        ballmachine: reservation.Equipment_id.includes(2),
                                    });
                                    setNote(reservation.Reservation_note);
                                    setSelectedDuration(parseFloat(reservation.Reservation_duration));
                                    handleToggleModal();
                                }
                                else {
                                    window.location.pathname = "/login"
                                }
                            }}
                        >
                            Edit
                        </span>
                        <span className="customer-reservation-button"
                            onClick={() => {
                                if(loggedIn) {
                                    handleButtonDelete(reservation.Reservation_id, reservation.Reservation_date);
                                }
                                else {
                                    window.location.pathname = "/login"
                                }
                            }}
                        >
                            Delete
                        </span>
                    </div>
                );
            });
    
            return returnData;
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
    
        function handleToggleModal() {
            document.querySelector(".reserve-modal-main-container").classList.toggle("active");
            document.querySelector(".reserve-modal-window-container").classList.toggle("active");
        }
    
        function handleToggleDeleteModal() {
            document.querySelector(".reserve-modal-delete").classList.toggle("active");
            document.querySelector(".reserve-modal-delete-window").classList.toggle("active");
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
                            status_id: 1,
                            date: selectedDate,
                            timeStart: selectedTime,
                            duration: selectedDuration,
                            note: note.replace(/"/g, '\''),
                            court_id: i,
                            equipment_id: "["+equipmentArray.toString()+"]",
                            customer_id: selectedCustomerID,
                            people: selectedPeople
                        }
        
                        if(checkValidReservation(reservationData, false)) {
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
                    status_id: 1,
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
                            status_id: 1,
                            date: selectedDate,
                            timeStart: selectedTime,
                            duration: selectedDuration,
                            note: note.replace(/"/g, '\''),
                            court_id: i,
                            equipment_id: "["+equipmentArray.toString()+"]",
                            customer_id: selectedCustomerID,
                            people: selectedPeople
                        }
        
                        if(checkValidReservation(reservationData, true)) {
                            courtArray.push(i);
                            if(j == 0) {
                                earliestCourt = i;
                            }
                        }
                    }
                }
            }
    
            if(courtArray.length == 0 || courtArray.length != numCourts || hasDuplicates(courtArray)) {
                console.log(courtArray);
                errorBox.textContent = 'Invalid Reservation: There are no available reservations for the requested date and time!';
            }
            else {
                var reservationData = {
                    id: rid,
                    type_id: selectedType,
                    status_id: 1,
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
        }
    
        function handleButtonDelete(rid, date) {
            handleToggleDeleteModal();
            setSelectedReservationToDelete(rid);
            setSelectedDate(date);
        }
    
        function checkValidReservation(reservationData, editing) {
            let valid = true;
    
            let time_start = moment(reservationData.timeStart, 'H:mm a');
            let duration = moment.duration(reservationData.duration, 'hours');
            let time_end = moment(time_start).add(duration);
    
            // console.log("Start: "+time_start.format('H:mm')+", End: "+time_end.format('H:mm'));
    
            if(isWeekday(reservationData.date)) {
                if(!time_start.isBetween(timeOpen,timeClosedWeek) || !time_end.isBetween(timeOpen,timeClosedWeek)) {
                    if(!time_start.isSame(timeOpen) && !time_end.isSame(timeClosedWeek)) {
                        return false;
                    }
                }
            }
            else {
                if(!time_start.isBetween(timeOpen,timeClosedWeekend) || !time_end.isBetween(timeOpen,timeClosedWeekend)) {
                    if(!time_start.isSame(timeOpen) && !time_end.isSame(timeClosedWeekend)) {
                        return false;
                    }
                }
            }
    
            // Make sure the reservation doesn't overlap with any other reservations
            reservations.forEach((res, idx) => {
                if(!editing) {
                    if(res.date == reservationData.date) {
                        if(res.court_id.includes(reservationData.court_id)) {
                            var resStartTime = moment(res.timeStart, 'H:mm a');
                            var resDuration = moment.duration(res.duration, 'hours');
                            var resEndTime = moment(resStartTime).add(resDuration);
        
                            if(time_start.isBetween(resStartTime,resEndTime) || time_end.isBetween(resStartTime,resEndTime)) {
                                valid = false;
                            }
        
                            if(time_start.isSame(resStartTime) || time_end.isSame(resEndTime)) {
                                valid = false;
                            }
                        }
                    }
                }
                else {
                    if(res.id != reservationData.id) {
                        if(res.date == reservationData.date) {
                            if(res.court_id.includes(reservationData.court_id)) {
                                var resStartTime = moment(res.timeStart, 'H:mm a');
                                var resDuration = moment.duration(res.duration, 'hours');
                                var resEndTime = moment(resStartTime).add(resDuration);
            
                                if(time_start.isBetween(resStartTime,resEndTime) || time_end.isBetween(resStartTime,resEndTime)) {
                                    valid = false;
                                }
            
                                if(time_start.isSame(resStartTime) || time_end.isSame(resEndTime)) {
                                    valid = false;
                                }
                            }
                        }
                    }
                } 
            })
    
            return valid;
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
            setSelectedPeople(1);
            setNumCourts(1);
            document.querySelector(".reserve-modal-window-error").textContent = '';
            setSelectedEquipment({
                racket: false,
                hopper: false,
                ballmachine: false
            });
            setTimeValue('7:30am');
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
                            <div className="reserve-modal-window-body-row">
                                <div className="reserve-modal-window-body-text">Date: {selectedDate}</div>
                                <div className="reserve-modal-window-body-text">Time: 
                                    <TimePicker 
                                        ref={timePickerRef}
                                        classList="time-picker"
                                        use12Hours
                                        defaultValue={moment('7:30 AM', "h:mm A")} 
                                        format="h:mm A"
                                        allowClear={false}
                                        minuteStep={15}
                                        popupStyle={{
                                            zIndex: '9999',
                                        }}
                                        value={moment(timeValue, "h:mm A")} 
                                        size="large"
                                        // bordered={false}
                                        onChange={(time, timeString) => { 
                                            let formatted_time = timeString.replace(' ', '').toLowerCase();
                                            setSelectedTime(formatted_time);
                                            setTimeValue(formatted_time);
    
                                        }}
                                        style={{
                                            marginLeft: '0.5vmin',
                                            borderRadius: '0.5vmin',
                                            boxShadow: '0 2px 0.2vmin 0 rgb(0,0,0,0.1)',
                                            border: 'none',
                                            fontSize: '1.25vmin',
                                            width: '12vmin'
                                        }}
                                    />
                                </div>
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
                            </div>
    
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
                            <div className="reserve-modal-window-body-text" 
                                style={{
                                    width: "100%"
                                }}>
                                <textarea 
                                    className="reserve-modal-window-textarea"
                                    placeholder="Enter any special requests or additional information here"
                                    value={note}
                                    onChange={(e) => {
                                        setNote(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                            
                            <div 
                                className="reserve-modal-window-button-submit"
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
                <Loading timeRange={[400, 800]} />
            </>
        )
    }
    
    // Function must be 'exposed' to rest of the application at the end of the file as shown below.
    export default ReserveCustomer;