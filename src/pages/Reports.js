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
            title: `All Customers`,
            description: `This report shows all customers that are registered.`,
            category: `Customer`,
            query: `SELECT * FROM CUSTOMER`,
        },
        {
            title: `All Reservations`,
            description: `This report shows all reservations that have ever been made.`,
            category: `Reservation`,
            query: `SELECT * FROM RESERVATION`,
        },
        {
            title: `Reservations by Duration`,
            description: `This report shows all reservations ordered by duration of the reservation.`,
            category: `Reservation`,
            query: `SELECT * FROM RESERVATION`,
        },
        {
            title: `Users by Number of Reservations`,
            description: `This report shows all users ordered by the number of reservations they've made`,
            category: `User`,
            query: `SELECT * FROM RESERVATION`,
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
                                    <div className="modal-report-text" key={index}>
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
                                            <div className="modal-report-text" key={vIndex}>
                                                
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