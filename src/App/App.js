import * as React from 'react';
import './App.css';
import Globe from 'react-globe.gl';
import Slider from '@mui/material/Slider';
import {scaleSequentialSqrt} from 'd3-scale'
import {interpolateYlOrRd} from 'd3-scale-chromatic'
import data from './assets/countries.geojson';

function App() {
  const globeImageUrl = "https://unpkg.com/three-globe@2.24.5/example/img/earth-day.jpg"
  const backgroundColor = "#e0e0e0"

  const globeEl = React.useRef();
  const [sliderLastValue, setSliderLastValue] = React.useState(0);

  const marks = [
    {
      value: -480,
      label: '',
    },
    {
      value: -384,
      label: '',
    },
    {
      value: -235,
      label: '',
    },
    {
      value: -200,
      label: '',
    },
    {
      value: 0,
      label: '',
    },
    {
      value: 1473,
      label: '',
    },
    {
      value: 1550,
      label: '',
    },
    {
      value: 1591,
      label: '',
    },
    {
      value: 1600,
      label: '',
    },
    {
      value: 1628,
      label: '',
    },
    {
      value: 1642,
      label: '',
    }
  ]


  const pointsData = []

  const rotateGlobeBasedOnPreviousValue = (value) => {
    if (sliderLastValue > value) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = -100;
      globeEl.current.pointOfView(-5000);
    } else {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 100;
      globeEl.current.pointOfView(5000);
    }    
    setSliderLastValue(value);
  }

  const stopGlobeRotation = (value) => {
      globeEl.current.controls().autoRotate = false;
      setSliderLastValue(value);
  }

  const getAriaValueText = (value) => {
    if (value < 0) {
      return "ano " + value + " a.C.";
    }
    return "ano " + value
  }

  const { useState, useEffect, useMemo } = React;

  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // load data
    fetch(data, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    }).then(res => res.json()).then(setCountries);
      
    console.log(countries)
  }, []);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

  return (
    <div className="App">   
      <div className="slider">
        <Slider
          min={-480}
          step={null}
          max={1642}
          aria-label="Temperature"
          valueLabelDisplay="auto"
          defaultValue={0}
          color="secondary"
          valueLabelFormat={getAriaValueText}
          marks={marks}
          onChange={(event, value) => rotateGlobeBasedOnPreviousValue(value)}
          onChangeCommitted={(event, value) => stopGlobeRotation(value)}
        />
      </div>
      <div className="globe">
        <Globe 
          ref={globeEl}
          backgroundColor={backgroundColor} 
          globeImageUrl={globeImageUrl}
          animateInitially={true}
          animateIn={true}
          lineHoverPrecision={0}
          
          polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
          polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
          polygonStrokeColor={() => '#111'}
          polygonLabel={({ properties: d }) => `

          `}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
        />
      </div>
    </div>
  );
}

export default App;
