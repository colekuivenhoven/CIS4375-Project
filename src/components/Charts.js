import React, { useEffect, useRef, useState, PureComponent } from "react";
import * as V from 'victory';

function Charts(props) {

    // Prop data
    const chartData = props.chartData;
    const chartType = props.chartType;

    // Color data for charts
    const colors = {
        verycold: "#42BAFF",
        cold: "#b3d667",
        cool: "#f7e543",
        warm: "#ffb921",
        hot: "#F4511E",
        black: "#000000"
    };

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
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={["Bob", "Sally", "Jane", "Jose", "John", "Rob", "Elli"]}
                />
                <V.VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x} hr`)}
                />
                <V.VictoryBar
                    name="Bar-1"
                    data={chartData}
                    x="user"
                    y="duration"
                    style={{ data: { fill: "rgba(66, 186, 255, 0.5)", stroke: 0 } }}
                    labels={({ datum }) => `${(datum.duration).toFixed(0)} hr`}
                    labelComponent={
                        <V.VictoryTooltip
                            dy={-5}
                            flyoutStyle={{ stroke: "rgba(0,0,0,0)", fill: "rgba(66, 186, 255,0.0)", strokeWidth: 2 }}
                            style={{ fill: "rgba(12, 153, 235,1)" }}
                            pointerLength={0}
                        />
                    }
                />
            </V.VictoryChart>
        )
    }

    function exampleLineChart() {
        return (
            <V.VictoryChart
                theme={V.VictoryTheme.material}
                domainPadding={30}
                animate={{duration: 400, onLoad: {duration: 100}}}
                events={[
                    {
                        target: "data",
                        childName: "Scatter-1",
                        eventHandlers: {
                            onMouseEnter: () => {
                                return [
                                    {
                                        target: "data",
                                        mutation: ({ style }) => {
                                            return style.fillOpacity === 1 ? null : { style: { fillOpacity: 1, fill: colors.hot, stroke: "#000000", strokeWidth: 4} };
                                        }
                                    }, 
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return props.text === props.datum.y ? null : { text: props.datum.y, style: {fontSize: 18}};
                                        }
                                    }
                                ];
                            },
                            onMouseLeave: () => {
                                return [
                                    {
                                        target: "data",
                                        mutation: ({ style }) => {
                                            return style.fillOpacity === 1 ? null : { style: { fillOpacity: 1, fill: style.fill, stroke: "#000000", strokeWidth: 2} };
                                        }
                                    }, 
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return props.text === props.datum.y ? null : { text: props.datum.y, style: {fontSize: 16}};
                                        }
                                    }
                                ];
                            }
                        }
                    }
                ]}
            >
                <V.VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    tickFormat={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
                />
                <V.VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <V.VictoryLine
                    name="Line-1"
                    interpolation="basis"
                    data={chartData}
                    x="month"
                    y="revenue"
                    style={{ data: { stroke: colors.warm, strokeWidth: 5 } }}
                    // labels={({ datum }) => `$${(datum.earnings/1000).toFixed(2)}k`}
                    // labelComponent={<V.VictoryLabel renderInPortal dy={-20}/>}
                />

                <V.VictoryScatter 
                    name="Scatter-1"
                    data={chartData}
                    x="month"
                    y="revenue"
                    size={7}
                    style={{ data: { fill: colors.warm, stroke: colors.black, strokeWidth: 2, opacity: "25%" } }}
                    labels={({ datum }) => `$${(datum.revenue/1000).toFixed(2)}k`}
                    labelComponent={<V.VictoryLabel renderInPortal dy={-15} style={{ fontSize: 16, fill: "rgba(0,0,0,0.0)" }}/>}
                />
            </V.VictoryChart>
        )
    }

    function examplePieChart() {
        return (
            <V.VictoryPie
                colorScale={[colors.hot, colors.warm, colors.cool, colors.cold, colors.verycold ]}
                data={chartData}
                animate={{
                    duration: 400
                }}
                sortKey="y"
                cornerRadius={10}
                innerRadius={85}
                labelRadius={({ innerRadius }) => 155 }
                padAngle={2}
                style={{ labels: { fill: "rgba(0,0,0,1)", fontSize: 18, fontWeight: "bold" }, data: {fillOpacity: 0.75} }}
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
                                return props.text === props.datum.y ? null : { text: props.datum.y.toFixed(0), style: {fontSize: 24}};
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
                                return props.text === props.datum.x ? null : { text: props.datum.x, style: {fontSize: 18}};
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
        <>
            { chartType == "pie" && examplePieChart()}
            { chartType == "bar" && exampleBarChart()}
            { chartType == "line" && exampleLineChart()}
        </>
    );
}

export default Charts;