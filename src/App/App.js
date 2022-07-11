import * as React from 'react';
import './App.css';
import Globe from 'react-globe.gl';
import Slider from '@mui/material/Slider';

function App() {
  const globeImageUrl = "https://unpkg.com/three-globe@2.24.5/example/img/earth-blue-marble.jpg"
  const backgroundColor = "#e0e0e0"

  const globeEl = React.useRef();
  const [sliderLastValue, setSliderLastValue] = React.useState(0);

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

  return (
    <div className="App">   
      <div className="slider">
        <Slider
          min={0}
          aria-label="Temperature"
          defaultValue={0}
          color="secondary"
          onChange={(event, value) => rotateGlobeBasedOnPreviousValue(value)}
          onChangeCommitted={(event, value) => stopGlobeRotation(value)}
        />
      </div>
      <div className="globe">
        <Globe 
          width={'100%'}
          height={'40%'}
          ref={globeEl}
          backgroundColor={backgroundColor} 
          globeImageUrl={globeImageUrl}
          animateInitially={true}
          animateIn={true}
        />
      </div>
    </div>
  );
}

export default App;
