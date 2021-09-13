// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin.css';

// Importing common files used in react
import React, { useEffect, useRef, useState, PureComponent } from "react";

// Importing 3rd party libraries
import * as V from 'victory';

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function AdminHome() {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0)

    // Regular varaible declaration
    const pageTitle = "Admin"

    // Chart data
        // Data for bar chart
        const chartData = [
            {quarter: 1, earnings: 13000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
        ];

        // Data for stacked bar chart
        const data2012 = [
            {quarter: 1, earnings: 13000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
        ];
      
        const data2013 = [
            {quarter: 1, earnings: 15000},
            {quarter: 2, earnings: 12500},
            {quarter: 3, earnings: 19500},
            {quarter: 4, earnings: 13000}
        ];
        
        const data2014 = [
            {quarter: 1, earnings: 11500},
            {quarter: 2, earnings: 13250},
            {quarter: 3, earnings: 20000},
            {quarter: 4, earnings: 15500}
        ];
        
        const data2015 = [
            {quarter: 1, earnings: 18000},
            {quarter: 2, earnings: 13250},
            {quarter: 3, earnings: 15000},
            {quarter: 4, earnings: 12000}
        ];

            // Data for pie chart
        const dataCourts = [
            {x: "Court 1", y: 27},
            {x: "Court 2", y: 11},
            {x: "Court 3", y: 32},
            {x: "Court 4", y: 24},
            {x: "Court 5", y: 19},
        ];

        // Color data for charts
        const colors = {
            verycold: "#42BAFF",
            cold: "#b3d667",
            cool: "#f7e543",
            warm: "#ffb921",
            hot: "#F4511E"
        };

    // Handling functions
    function handleAddButtonLocal() {
        localNumberRaw += 1;
        setLocalNumber(localNumberRaw);
    }

    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }

    // Chart Functions
    function exampleBarChart() {
        return (
            <V.VictoryChart
                theme={V.VictoryTheme.material}
                domainPadding={30}
                animate={{duration: 400, onLoad: {duration: 100}}}
                events={[
                    {
                        target: "data",
                        childName: "Bar-1",
                        eventHandlers: {
                            onMouseEnter: () => ({
                                target: "data",
                                mutation: () => ({
                                    style: {fill: "rgba(66, 186, 255, 1)", stroke: 0}
                                })
                            }),
                            onMouseLeave: () => ({
                                target: "data",
                                mutation: () => ({
                                    style: {fill: "rgba(66, 186, 255, 0.5)", stroke: 0},
                                })
                            })
                        }
                    }
                ]}
            >
                <V.VictoryAxis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={["Q1", "Q2", "Q3", "Q4"]}
                />
                <V.VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <V.VictoryBar
                    name="Bar-1"
                    data={chartData}
                    x="quarter"
                    y="earnings"
                    style={{ data: { fill: "rgba(66, 186, 255, 0.5)", stroke: 0 } }}
                    labels={({ datum }) => `$${(datum.earnings/1000).toFixed(2)}k`}
                    labelComponent={
                        <V.VictoryTooltip
                            dy={-5}
                            flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: "rgba(66, 186, 255,0.25)", strokeWidth: 2 }}
                            style={{ fill: "rgba(12, 153, 235,1)" }}
                            pointerLength={0}
                        />
                    }
                />
            </V.VictoryChart>
        )
    }

    function exampleStackedBarChart() {
        return (
            <V.VictoryChart
                theme={V.VictoryTheme.material}
                domainPadding={30}
                animate={{duration: 400, onLoad: {duration: 200}}}
            >
                <V.VictoryAxis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={["Q1", "Q2", "Q3", "Q4"]}
                />
                <V.VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <V.VictoryStack>
                    <V.VictoryBar
                        name="Bar-1"
                        data={data2012}
                        x="quarter"
                        y="earnings"
                        style={{ data: {fill: colors.cold, stroke: 0 } }}
                        labels={({ datum }) => `2012: $${(datum.earnings/1000).toFixed(2)}k`}
                        labelComponent={
                            <V.VictoryTooltip
                                dy={1}
                                flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: colors.cold, strokeWidth: 2 }}
                                style={{ fill: "rgba(255, 255, 255, 1)" }}
                                pointerLength={0}
                                cornerRadius={0}
                                flyoutPadding={8}
                            />
                        }
                    />
                    <V.VictoryBar
                        name="Bar-1"
                        data={data2013}
                        x="quarter"
                        y="earnings"
                        style={{ data: {fill: colors.cool, stroke: 0 } }}
                        labels={({ datum }) => `2013: $${(datum.earnings/1000).toFixed(2)}k`}
                        labelComponent={
                            <V.VictoryTooltip
                                dy={1}
                                flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: colors.cool, strokeWidth: 2 }}
                                style={{ fill: "rgba(255, 255, 255, 1)" }}
                                pointerLength={0}
                                cornerRadius={0}
                                flyoutPadding={8}
                            />
                        }
                    />
                    <V.VictoryBar
                        name="Bar-1"
                        data={data2014}
                        x="quarter"
                        y="earnings"
                        style={{ data: {fill: colors.warm, stroke: 0 } }}
                        labels={({ datum }) => `2014: $${(datum.earnings/1000).toFixed(2)}k`}
                        labelComponent={
                            <V.VictoryTooltip
                                dy={1}
                                flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: colors.warm, strokeWidth: 2 }}
                                style={{ fill: "rgba(255, 255, 255, 1)" }}
                                pointerLength={0}
                                cornerRadius={0}
                                flyoutPadding={8}
                            />
                        }
                    />
                    <V.VictoryBar
                        name="Bar-1"
                        data={data2015}
                        x="quarter"
                        y="earnings"
                        style={{ data: {fill: colors.hot, stroke: 0 } }}
                        labels={({ datum }) => `2015: $${(datum.earnings/1000).toFixed(2)}k`}
                        labelComponent={
                            <V.VictoryTooltip
                                dy={1}
                                flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: colors.hot, strokeWidth: 2 }}
                                style={{ fill: "rgba(255, 255, 255, 1)" }}
                                pointerLength={0}
                                cornerRadius={0}
                                flyoutPadding={8}
                            />
                        }
                    />
                </V.VictoryStack>
            </V.VictoryChart>
        )
    }

    function examplePieChart() {
        return (
            <V.VictoryPie
                colorScale={[colors.hot, colors.warm, colors.cool, colors.cold, colors.verycold ]}
                data={dataCourts}
                animate={{
                    duration: 400
                }}
                categories={{x: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5"]}}
                cornerRadius={10}
                innerRadius={35}
                labelRadius={({ innerRadius }) => 155 }
                padAngle={2}
                style={{ labels: { fill: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: "bold" }, data: {fillOpacity: 0.75} }}
                labelPlacement={({ index }) => "perpendicular"}
                events={[{
                    target: "data",
                    eventHandlers: {
                        onMouseEnter: () => {
                        return [
                            {
                            target: "data",
                            mutation: ({ style }) => {
                                return style.fillOpacity === 1 ? null : { style: { fillOpacity: 1, fill: style.fill, stroke: "#000000", strokeWidth: 3} };
                            }
                            }, {
                            target: "labels",
                            mutation: (props) => {
                                return props.text === props.datum.y ? null : { text: props.datum.y, style: {fontSize: 24}};
                            }
                            }
                        ];
                        },
                        onMouseLeave: () => {
                        return [
                            {
                            target: "data",
                            mutation: ({ style }) => {
                                return style.fillOpacity === 1 ? null : { style: { fillOpacity: 1, fill: style.fill, stroke: "#000000", strokeWidth: 3} };
                            }
                            }, {
                            target: "labels",
                            mutation: (props) => {
                                return props.text === props.datum.y ? null : { text: props.datum.y, style: {fontSize: 24}};
                            }
                            }
                        ];
                        }
                    }
                }]}
            />
        )
    }


    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-admin">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="test-container">
                    <span className="font-round-medium unselectable">Local Number: {localNumber}</span>
                    <div 
                        className="container-add unselectable" 
                        onClick={() => {
                            // Calling the appropriate handle function when the element has been clicked.
                            handleAddButtonLocal();
                        }}
                    ></div>
                </div>
                <div className="test-container">
                    <span className="font-round-medium unselectable">Global Number: {globalNumber}</span>
                    <div 
                        className="container-add unselectable" 
                        onClick={() => {
                            // Calling the appropriate handle function when the element has been clicked.
                            handleAddButtonGlobal();
                        }}
                    ></div>
                </div>
                <div className="row-container">
                    <div className="chart-container">
                    <div className="chart-title">Example - Quarterly Profits(1 Year)</div>
                        {exampleBarChart()}
                    </div>
                    <div className="chart-container">
                        <div className="chart-title">Example - Quarterly Profits(Multiple Years)</div>
                        {exampleStackedBarChart()}
                    </div>
                    <div className="chart-container">
                        <div className="chart-title">Example - Court Reservations</div>
                        {examplePieChart()}
                    </div>
                </div>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default AdminHome;