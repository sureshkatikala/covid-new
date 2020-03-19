import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

// const getCases = (name) => {
//     let obj = {}
//     return fetch( 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
// 	      "x-rapidapi-key": "a5459ef76emsha1ac71d39f2b86ap12c441jsn4644e84dc586"
//         },
//         credentials: "same-origin"
//       }).then(function(response) {
//         console.log(response)
//         return response.json()
//       }).then((response) => {
//         response.data.covid19Stats.map(record=>{
//             if(obj[record.country]) {
//                 obj[record.country] += record.confirmed
//             } else {
//                 obj[record.country] = record.confirmed
//             }
//         })
//       }).then(() => {
//           console.log(obj)
//           return obj[name]
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
// }

const MapChart =  ({ setTooltipContent, CountriesData }) => {
    console.log(CountriesData)
    let obj = CountriesData
    console.log(obj)
    
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={async () => {
                    const { NAME, POP_EST } = geo.properties;
                    // let getCurrentCases = await getCases(NAME)
                    // console.log(getCurrentCases)
                    // setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                    setTooltipContent(`${NAME} — ${obj[NAME]}`);

                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
