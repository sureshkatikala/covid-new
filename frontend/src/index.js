// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";

import MapChart from "./MapChart";

function App() {
    const [content, setContent] = useState("");
    const [CountriesData, setObj] = useState()
    let obj = {}

    useEffect(() => {
        fetch('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                "x-rapidapi-key": "a5459ef76emsha1ac71d39f2b86ap12c441jsn4644e84dc586"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then((response) => {
            response.data.covid19Stats.forEach(record => {
                if (obj[record.country]) {
                    obj[record.country] += record.confirmed;
                }
                else {
                    obj[record.country] = record.confirmed;
                }
            });
            return obj
        }).then(setObj)

            .catch(function (error) {
                console.log(error);
            });
    },[])
    return (
        <div>
            <MapChart setTooltipContent={setContent} CountriesData={CountriesData} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

