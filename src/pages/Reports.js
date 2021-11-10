import '../assets/styles/Reports.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Importing 3rd Party Dependencies
import ReactExport from "react-export-excel";
import { saveAs } from 'file-saver';

// Importing the components used in this page
import Loading from '../components/Loading';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Reports() {
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportModalTitle, setReportModalTitle] = useState('');
    const [reportModalCategory, setReportModalCategory] = useState('');
    const [reportModalItems, setReportModalItems] = useState([]);

    const reports = [
        {
            title: `Planned Event Reservations`,
            description: `This report shows all future special event reservations that have been made.`,
            category: `Reservation`,
            query: `
                SELECT USER.User_email, date_format(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y'), '%m/%e/%Y') AS Date, RESERVATION.Reservation_time, RESERVATION.Reservation_duration, RESERVATION.Reservation_note
                FROM RESERVATION
                JOIN USER ON USER.User_id = RESERVATION.Customer_id
                WHERE Reservation_type = 1
                ORDER BY UNIX_TIMESTAMP(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y')) ASC
            `,
        },
        {
            title: `Most Frequent Users`,
            description: `This report orders all users by the number of reservations they've made.`,
            category: `Reservation`,
            query: `
                SELECT USER.User_email, COUNT(RESERVATION.Customer_id) AS Total_Reservations
                FROM USER
                JOIN RESERVATION ON USER.User_id = RESERVATION.Customer_id
                GROUP BY USER.User_email
                ORDER BY total_reservations DESC
            `,
        },
        {
            title: `All Active Employees`,
            description: `All active employees in the database system`,
            category: `User`,
            query: `
                SELECT User_id, User_email, User_firstname, User_lastname, User_type, User_status
                FROM USER
                WHERE User_type = 1 
                OR User_type = 2
                AND User_status = 1
                ORDER BY User_id DESC
            `,
        },
        {
            title: `All Active Customers`,
            description: `All active customers in the database system`,
            category: `User`,
            query: `
                SELECT User_id, User_email, User_firstname, User_lastname, User_type, User_status
                FROM USER
                WHERE User_type = 0 
                AND User_status = 1
                ORDER BY User_id DESC
            `,
        },
        {
            title: `Upcoming Business Closures`,
            description: `Any business closures that have been planned over the next year`,
            category: `Closure`,
            query: `
                SELECT CLOSURE.Closure_id, date_format(STR_TO_DATE(CLOSURE.Closure_date, '%m/%e/%Y'), '%m/%d/%Y') AS Date
                FROM CLOSURE
                WHERE CLOSURE.Closure_date <= date_format(curdate(), '%m/%e/%Y')
                ORDER BY UNIX_TIMESTAMP(STR_TO_DATE(CLOSURE.Closure_date, '%m/%e/%Y')) ASC
            `,
        },
        {
            title: `Today's Reservations`,
            description: `This report will show the number of customer reservations at the end of the day`,
            category: `Reservation`,
            query: `
                SELECT date_format(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y'), '%m/%e/%Y') AS Date, COUNT(RESERVATION.Customer_id) AS Todays_Reservations
                FROM RESERVATION
                WHERE RESERVATION.Reservation_date = date_format(curdate(), '%m/%e/%Y')
            `,
        },
        {
            title: `Today's Reservations(New)`,
            description: `This report will show the number of customer reservations at the end of the day`,
            category: `Reservation`,
            query: `
                SELECT USER.User_firstname, USER.User_lastname, USER.User_phone, RESERVATION.Reservation_time, NOW() - INTERVAL 1 DAY AS Date
                FROM RESERVATION
                JOIN USER ON USER.User_id = RESERVATION.Customer_id
                WHERE RESERVATION.Reservation_date = date_format(NOW() - INTERVAL 1 DAY, '%m/%e/%Y')
            `,
        },
        {
            title: `Anticipated Reservations`,
            description: `This report will show the number of future customer reservations that have been made`,
            category: `Reservation`,
            query: `
                SELECT date_format(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y'), '%m/%d/%Y') AS Date, COUNT(RESERVATION.Customer_id) AS Todays_Reservations
                FROM RESERVATION
                WHERE RESERVATION.Reservation_date <= date_format(curdate(), '%m/%e/%Y')
                GROUP BY Date
                ORDER BY Date ASC
            `,
        },
        {
            title: `Number of Courts Used Today`,
            description: `This report will show the number of courts that were used for the day.`,
            category: `Reservation`,
            query: `
                SELECT 
                    date_format(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y'), '%m/%d/%Y') AS Date, 
                    SUM(JSON_LENGTH(RESERVATION.Court_id)) AS Total_Courts_Used
                    
                FROM RESERVATION
                WHERE RESERVATION.Reservation_date = date_format(curdate(), '%m/%e/%Y')
                ORDER BY UNIX_TIMESTAMP(STR_TO_DATE(RESERVATION.Reservation_date, '%m/%e/%Y')) ASC
            `,
        },
    ]

    // API functions
    async function reportDownload(query, category, title) {
        let response = await fetch("http://3.218.225.62:3040/report/download", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({report_query: query})
        });
        response = await response.json();
        downloadDocument(response.report, category, title);
    }

    async function reportOpen(query, category, title) {
        let response = await fetch("http://3.218.225.62:3040/report/download", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({report_query: query})
        });
        response = await response.json();
        setReportModalItems(response.report);
    }

    // Download excel document
    function downloadDocument(data, category, title) {
        const blob = new Blob(
            [
                Object.keys(data[0]).map(key => {
                    if(key.includes(category)) {
                        return (
                            key.substring(key.indexOf("_") + 1)
                        )
                    }
                    else {
                        return key;
                    }
                })
                + "\n" +
                data.map(item => {
                    if(item.Court_id) {
                        item.Court_id = `"${item.Court_id.join(',')}"`
                    }

                    return (
                        Object.values(item)
                    )
                }).join("\n")
            ],
            { type: "text/csv;charset=utf-8" }
        )
        
        var today = new Date();
        today = today.toLocaleDateString("en-US");
        today = today.replace(/\//g, "-");

        saveAs(blob, `${title.replace(" ", "_")}_${today}.csv`);
    }

    // Handling functions
    function handleReportOpen(query, category, title) {
        setReportModalOpen(true);
        setReportModalTitle(title);
        setReportModalCategory(category);
        reportOpen(query, category, title);
    }

    function handleReportDownload(query, category, title) {
        reportDownload(query, category, title);
    }

    function handleCloseReportModal() {
        setReportModalOpen(false);
        resetSelected();
    }

    function resetSelected() {
        setReportModalTitle('');
        setReportModalItems([]);
        setReportModalCategory('');
    }

    return (
        <>
            <div className="container-reports">
                <div className="reports-content">
                    {reports.map((report, index) => {
                        return (
                            <div className="report-item" key={index}>
                                <div className="report-title">
                                    {report.title}
                                </div>
                                <div className="report-description">
                                    {report.description}
                                </div>
                                <div className="report-footer">
                                    <div className="report-category">
                                        {report.category}
                                    </div>
                                    <div className="report-open"
                                        onClick={() => handleReportOpen(report.query, report.category, report.title)}
                                    >
                                        Open
                                    </div>
                                    <div className="report-download"
                                        onClick={() => handleReportDownload(report.query, report.category, report.title)}
                                    >
                                        Download
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={`modal-report ${reportModalOpen ? "active" : ""}`}>
                <div className={`modal-report-content ${reportModalOpen ? "active" : ""}`}>
                    <div className="modal-report-title">
                        {reportModalTitle}
                        <div className="modal-report-close"
                            onClick={() => handleCloseReportModal()}
                        />
                    </div>
                    {reportModalItems.length > 0 && <div className="modal-report-body">
                        <div className="modal-report-header">
                            {Object.keys(reportModalItems[0]).map((key, index) => {
                                return (
                                    <div 
                                        className="modal-report-text" 
                                        key={index}
                                        style={{
                                            minWidth: `${100 / Object.keys(reportModalItems[0]).length}%`,
                                            maxWidth: `${100 / Object.keys(reportModalItems[0]).length}%`,
                                        }}
                                    
                                    >
                                        {key.includes(reportModalCategory) ? key.substring(key.indexOf("_") + 1) : key}
                                    </div>
                                )
                            })}
                        </div>
                        {reportModalItems.map((item, index) => {
                            return (
                                <div className="modal-report-item" key={index}>
                                    {Object.values(item).map((value, vIndex) => {
                                        return (
                                            <div 
                                                className="modal-report-text" 
                                                key={vIndex}
                                                style={{
                                                    minWidth: `${100 / Object.keys(reportModalItems[0]).length}%`,
                                                    maxWidth: `${100 / Object.keys(reportModalItems[0]).length}%`,
                                                }}
                                            >
                                                
                                                {JSON.stringify(value)}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
            <Loading timeRange={[250, 500]} />
        </>
    )
}

export default Reports;