// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Reserve.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;
const dateToday = new Date();

// Main function for the specific 'page'
function Reserve(props) {
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(window.sessionStorage.getItem('current_user'));
    
    // Regular varaible declaration
    const pageTitle = "Reserve Your Court"
    var isMobile = props.isMobile;

    // Sample data
    const reservations = [
        {
            date: '10/7/2021',
            timeStart: '10:15am',
            duration: 3.5
        },
        {
            date: '10/9/2021',
            timeStart: '8:45am',
            duration: 2
        },
    ]

    var timeslotsJSON = [
        {
            time: '7:00am',
            status: 'open'
        },
            {
                time: '7:15am',
                status: 'open'
            },
            {
                time: '7:30am',
                status: 'open'
            },
            {
                time: '7:45am',
                status: 'open'
            },
        {
            time: '8:00am',
            status: 'open'
        },
            {
                time: '8:15am',
                status: 'open'
            },
            {
                time: '8:30am',
                status: 'open'
            },
            {
                time: '8:45am',
                status: 'open'
            },
        {
            time: '9:00am',
            status: 'open'
        },
            {
                time: '9:15am',
                status: 'open'
            },
            {
                time: '9:30am',
                status: 'open'
            },
            {
                time: '9:45am',
                status: 'open'
            },
        {
            time: '10:00am',
            status: 'open'
        },
            {
                time: '10:15am',
                status: 'open'
            },
            {
                time: '10:30am',
                status: 'open'
            },
            {
                time: '10:45am',
                status: 'open'
            },
        {
            time: '11:00am',
            status: 'open'
        },
            {
                time: '11:15am',
                status: 'open'
            },
            {
                time: '11:30am',
                status: 'open'
            },
            {
                time: '11:45am',
                status: 'open'
            },
        {
            time: '12:00pm',
            status: 'open'
        },
            {
                time: '12:15pm',
                status: 'open'
            },
            {
                time: '12:30pm',
                status: 'open'
            },
            {
                time: '12:45pm',
                status: 'open'
            },
        {
            time: '1:00pm',
            status: 'open'
        },
            {
                time: '1:15pm',
                status: 'open'
            },
            {
                time: '1:30pm',
                status: 'open'
            },
            {
                time: '1:45pm',
                status: 'open'
            },
        {
            time: '2:00pm',
            status: 'open'
        },
            {
                time: '2:15pm',
                status: 'open'
            },
            {
                time: '2:30pm',
                status: 'open'
            },
            {
                time: '2:45pm',
                status: 'open'
            },
        {
            time: '3:00pm',
            status: 'open'
        },
            {
                time: '3:15pm',
                status: 'open'
            },
            {
                time: '3:30pm',
                status: 'open'
            },
            {
                time: '3:45pm',
                status: 'open'
            },
        {
            time: '4:00pm',
            status: 'open'
        },
            {
                time: '4:15pm',
                status: 'open'
            },
            {
                time: '4:30pm',
                status: 'open'
            },
            {
                time: '4:45pm',
                status: 'open'
            },
        {
            time: '5:00pm',
            status: 'open'
        },
            {
                time: '5:15pm',
                status: 'open'
            },
            {
                time: '5:30pm',
                status: 'open'
            },
            {
                time: '5:45pm',
                status: 'open'
            },
        {
            time: '6:00pm',
            status: 'open'
        },
            {
                time: '6:15pm',
                status: 'open'
            },
            {
                time: '6:30pm',
                status: 'open'
            },
            {
                time: '6:45pm',
                status: 'open'
            },
        {
            time: '7:00pm',
            status: 'open'
        },
            {
                time: '7:15pm',
                status: 'open'
            },
            {
                time: '7:30pm',
                status: 'open'
            },
            {
                time: '7:45pm',
                status: 'open'
            },
        {
            time: '8:00pm',
            status: 'open'
        },
            {
                time: '8:15pm',
                status: 'open'
            },
            {
                time: '8:30pm',
                status: 'open'
            },
            {
                time: '8:45pm',
                status: 'open'
            },
        {
            time: '9:00pm',
            status: 'open'
        },
            {
                time: '9:15pm',
                status: 'open'
            },
            {
                time: '9:30pm',
                status: 'open'
            },
            {
                time: '9:45pm',
                status: 'open'
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
        var mainContainer = document.querySelector(".container-reserve");
        var fontLarge = document.querySelectorAll(".font-round-large");
        var fontMed = document.querySelectorAll(".font-round-medium");
        var addButton = document.querySelectorAll(".container-add");

        if(isMobile) {
            mainContainer.style.top = "15vmin"

            fontLarge.forEach(el => {
                el.style.fontSize = "8vmin"
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
            mainContainer.style.top = "7vmin"
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
    });

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
                    <div className="table-hours-item-container">
                        {slot.time}
                        <div className="table-break-highlight-container"></div>
                    </div>
                )
            }
            else {
                returnData.push(
                    <div className="table-hours-item-container"></div>
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
                    }
                })
            }

            reservations.forEach((reservation) => {
                if(reservation.date == day.date) {
                    var resStartTimeRaw = (reservation.timeStart).substring(0,(reservation.timeStart).length - 2);
                    var resAmOrPM = (reservation.timeStart).substring((reservation.timeStart).length - 2);

                    var resTimeHour = resStartTimeRaw.split(':')[0];
                    var resTimeMinutes = resStartTimeRaw.split(':')[1];

                    var startIndex = -1;
                    dayTimeslots.forEach((slot, index) => {
                        var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
                        var amOrPM = (slot.time).substring((slot.time).length - 2);
                        var timeHour = timeRaw.split(':')[0];
                        var timeMinutes = timeRaw.split(':')[1];
    
                        if(timeHour == resTimeHour && timeMinutes == resTimeMinutes && amOrPM == resAmOrPM ) {
                            slot.status = 'reserved';
                            startIndex = index;
                        }
                        
                        if(startIndex > -1 && (index - startIndex < reservation.duration * 4)) {
                            slot.status = 'reserved';
                        }
                    })
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

        slots.forEach((slot, index) => {
            var timeRaw = (slot.time).substring(0,(slot.time).length - 2);
            var amOrPM = (slot.time).substring((slot.time).length - 2);
            var timeHour = timeRaw.split(':')[0];
            var timeMinutes = timeRaw.split(':')[1];

            if(slot.status == 'open') {
                returnData.push(
                    <div key={index} className="table-column-item-container-open-2">
                        {(timeMinutes != '00') && <div className="table-hours-item-container-sub">{timeHour}:{timeMinutes}{amOrPM}</div>}
                        <div className="table-hours-highlight-container"></div>
                    </div>
                )
            }
            else if(slot.status == 'closed') {
                returnData.push(
                    <div key={index} className="table-column-item-container-closed-2"></div>
                )
            }
            else if(slot.status == 'reserved') {
                returnData.push(
                    <div key={index} className="table-column-item-container-reserved-2"></div>
                )
            }
        });

        return (returnData);
    }

    // Handling functions
    function checkReservationSlot(date, time) {
        return false;
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-reserve">
                {/* Variables can be inserted inside of brackets as shown below */}
                {/* <div className="page-title"><span className="font-round-large">{pageTitle}</span></div> */}

                <div className="reserve-form-container">
                    <div className="table-labels-container">
                        <div className="table-label">
                            {convertDate(dateToday.getDate())}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+1)}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+2)}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+3)}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+4)}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+5)}
                        </div>
                        <div className="table-label">
                            {convertDate(dateToday.getDate()+6)}
                        </div>
                    </div>
                    <div className="table-content-container">
                        <div className="table-hours-container">
                            {renderTimeColumn()}
                        </div>

                        {renderColumns()}
                    </div>
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser}</b>!</div>}
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Reserve;