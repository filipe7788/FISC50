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
  const [sliderLastValue, setSliderLastValue] = React.useState(-480);
  const { useState, useEffect, useMemo } = React;

  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();

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
      value: 1590,
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

  const points = [
    {
      paisNome: "Greece",
      acontecimentos: [
        {
          nome: 'Anaxágoras',
          imageURL:'http://www.percepolegatto.com.br/wp-content/uploads/2012/02/Anax%C3%A1goras-1.jpg',
          tempo: -480,
          descricao: "Filósofo pré-socrático",
          local: 'Atenas',
          sobre: [
            "Descobriu a verdadeira causa dos eclipses.",
            "Afirmou que o Sol era uma pedra de fogo maior que o Peloponeso",
            "Iniciou a atitude questionadora que traria ao desenvolvimento do método ciêntifico"
          ],
          links: [
            'https://www.ebiografia.com/anaxagoras/'
          ]
        },
        {
          nome: 'Aristóteles',
          imageURL:'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTrSEc8OGf_Xs2IbGmlwZjSW19Q9HHXwEQHIIIxx7xHw_c8u_QFdoOHj9DQvNQyNUtZ',
          tempo: -384,
          descricao: "Filósofo",
          local: 'Atenas',
          sobre: [
            "Desenvolve a fisica e cosmologia aristotélica",
          ],
          links: [
            'https://drive.google.com/file/d/15hDnarP39SSUzdeITifTPFujKL8K9Fm_/view',
            'https://www.ebiografia.com/aristoteles/'
          ]
        }
      ]
    },
    {
      paisNome: "Germany",
      acontecimentos: [
        {
          nome: 'Tycho Brahe',
          imageURL:'https://upload.wikimedia.org/wikipedia/commons/2/2b/Tycho_Brahe.JPG',
          tempo: 1550,
          descricao: "Astronomo",
          local: 'Berlin',
          sobre: [
            "Mapeou a posição de 777 estrelas e dos 5 planetas.",
            "Atuou com rigor e método na astronomia observacional",
          ],
          links: [
            "https://www3.unicentro.br/petfisica/2015/12/22/tycho-brahe-1546-1601/",
            "https://drive.google.com/file/d/14oUU7n8jnTT_pkRG76roYGz1BJUvrLIy/view"
          ]
        },
        {
          nome: 'Johannes Kepler',
          imageURL:'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTAmDPW6atg9H2W88joHvHvgXnS-6qu9LWmI4sLYmN72sdu-oLGKQeVBJMlPWhbDtVh',
          tempo: 1590,
          descricao: "Astronomo",
          local: 'Berlin',
          sobre: [
            "Desenvolveu o método de análise de orbitas",
          ],
          links: [
            "https://www.ebiografia.com/johannes-kepler/",
            "https://drive.google.com/file/d/1bAEGYbhfZIDawl_bYrszMovhzaPT_XSw/view"
          ]
        } 
      ]
    },
    {
      paisNome: "Egypt",
      acontecimentos: [
        {
          nome: 'Eratóstenes',
          imageURL:'https://www.suapesquisa.com/uploads/site/erastostenes_de_cirene.jpg',
          tempo: -235,
          descricao: "Filósofo",
          local: 'Alexandria',
          sobre: [
            "Fez a primeira medida de circunferência da terra"
          ],
          links: [
            'https://www.suapesquisa.com/quemfoi/eratostenes.htm'
          ]   
        },
        {
          nome: 'Ptolomeu',
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Ptolemy_16century.jpg',
          tempo: -200,
          descricao: "Matemático, Filósofo",
          local: 'Alexandria',
          sobre: [
            'Desenvolvimento de trabalhos matemáticos e astronomicos'
          ],
          links: [
            'https://drive.google.com/file/d/147jzzDT2ubp67Qt_snQUbe-FgHDzQeEl/view',
            'https://www.infoescola.com/biografias/ptolomeu/'
          ]
        }
      ]
    },
    {
      paisNome: "Poland",
      acontecimentos: [
        {
          nome: 'Copérnico',
          imageURL: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTk3MLLhpqomzQbMxNAuWdG2vmlHmNwAmOCkDY6ungMBw1uuQSGHS3tZHAqimvFLhlk',
          tempo: 1473,
          descricao: "Filósofo",
          local: 'Torún',
          sobre: [
            'Desenvolvimento da teoria heliocêntrica do sistema solar'
          ],
          links: [
            'https://drive.google.com/file/d/14oUU7n8jnTT_pkRG76roYGz1BJUvrLIy/view?usp=drive_web&authuser=2'
          ]
        }
      ]
    },
    {
      paisNome: "Italy",
      acontecimentos: [
        {
          nome: 'Giordano Bruno',
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Giordano_Bruno.jpg',
          tempo: 1600,
          descricao: "Filósofo e Matemático",
          local: 'Nola',
          sobre: [
            "Cosmologia do universo infinito"
          ],
          links: [
            "https://drive.google.com/file/d/1zTQFW2Uv9caCiQOUbKgFC_ordDXmzOdx/view"
          ]
        },
        {
          nome: 'Galileo',
          imageURL: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTDKMVgF10wstCLHgZzHmLeG89LEz6Z9iGJmFK-xtZ4Q09-OU0gLUfFuWr6mUV7z9Rd',
          tempo: 1590,
          descricao: "Astronomo",
          local: 'Roma',
          sobre: [
            'Pai da astronomia observacional',
            'Pai do método ciêntifico'
          ],
          links: [
            'https://www.ebiografia.com/galileu_galilei/',
            'https://drive.google.com/file/d/1fFvjrKNWugyhDe4spcw7K-gRoY8Z92A-/view?usp=drive_web&authuser=2'
          ]
        }
      ]
    },
    {
      paisNome: "France",
      acontecimentos: [
        {
          nome: 'René Descartes',
          tempo: 1628,
          descricao: "Filósofo e Matemático",
          local: 'Paris',
          sobre: [
            'Penso, logo existo',
            'Desenvolvimento do método analitico na busca pela verdade',
            "O Discurso sobre o Método"
          ],
          links: [
            'https://drive.google.com/file/d/1zTQFW2Uv9caCiQOUbKgFC_ordDXmzOdx/view',
            'https://www.todamateria.com.br/descartes/'
          ]
        }
      ]
    },
    {
      paisNome: "United Kingdom",
      acontecimentos: [
        {
          nome: 'Isaac Newton',
          tempo: 1642,
          descricao: "Filósofo e Matemático",
          local: 'Londres',
          sobre: [
            'Desenvolvimento do cálculo e da física newtoniana',
          ],
          links: [
            "https://drive.google.com/file/d/1mtDOykU2hf8wFzZVO135rB6LunHIPOPT/view?usp=drive_web&authuser=2"
          ]
        }
      ]
    },
  ]

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


  useEffect(() => {
    // load data
    fetch(data, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    }).then(res => res.json()).then(setCountries);
  }, []);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

  const givenTimeGetAcontecimentos = (name, time) => {
    const acontecimentos = [];
    points.forEach(point => {
      point.acontecimentos.forEach(acontecimento => {
        if (acontecimento.tempo === time) {
          if(point.paisNome === name){
            acontecimentos.push(acontecimento);
          }
        }
      })
    }
    )
    return acontecimentos;
  }

  const decideColor = (d) => {
    const dHasTempo = givenTimeGetAcontecimentos(d.properties.GEOUNIT, sliderLastValue)
    if(dHasTempo.length > 0) {
      return colorScale(getVal(d));
    }
    return 'steelblue'
  }

  const getAcontecimentoFromTimeAndPais = (pais) => {
    var time = sliderLastValue;
    const acontecimentos = [];
    points.forEach(point => {
      point.acontecimentos.forEach(acontecimento => {
        if (acontecimento.tempo === time) {
          if(point.paisNome === pais){
            acontecimentos.push(acontecimento);
          }
        }
      })
    }
    )


    return acontecimentos;
  }

  const getPopUpContentFromAcontecimentos = (acontecimentos) => {
    
    var contentWithBlackBackgrund = '<div style="border-radius:10px; background-color: #ED8975; color: white; padding-right: 10px; padding-left: 10px; padding-bottom: 1px; padding-top: 1px;">';
    //space between items is 10px
    acontecimentos.forEach(acontecimento => {
      // colocar nome ao lado de imageURL
      contentWithBlackBackgrund += '<div style="display: flex; justify-content: flex-start; align-items:center "><img src="' + acontecimento.imageURL + '" style="width: 100px; height: 100px; border-radius: 50%"><h2 style="margin-left: 10px;">' + acontecimento.nome + '</h2></div>';
      // // add nome and round imageURL from acontecimento 
      // contentWithBlackBackgrund += '<h3 style="padding-bottom: 6px;"><b>' + acontecimento.nome + '</b></h3>';
      // contentWithBlackBackgrund += '<div style="padding-bottom: 10px;"><img src="' + acontecimento.imageURL + '" style="border-radius:50%; width: 50px; height: 50px;"></div>';

      // Title Ocupação
      contentWithBlackBackgrund += "<h4>Ocupação</h4>";
      contentWithBlackBackgrund += "<p>" + acontecimento.descricao + "</p>";

      // Title Local
      contentWithBlackBackgrund += "<h4>Local</h4>";
      contentWithBlackBackgrund += "<p>" + acontecimento.local + "</p>";
      
      // Title Sobre
      contentWithBlackBackgrund += "<h4>Sobre</h4>";
      // bullet list with sobre
      contentWithBlackBackgrund += "<ul>";
      acontecimento.sobre.forEach(sobre => {
        contentWithBlackBackgrund += "<li>" + sobre + "</li>";
      })
      contentWithBlackBackgrund += "</ul>";

      // Title Links
      contentWithBlackBackgrund += "<h4>Links</h4>";
      //bullet list with links to acontecimentos
      contentWithBlackBackgrund += "<ul>";
      acontecimento.links.forEach(link => {
        contentWithBlackBackgrund += "<li><a href=\"" + link + "\">" + link + "</a></li>";
      })
      }
    )
    contentWithBlackBackgrund += "</div>";
    return contentWithBlackBackgrund;
  }

  const makePopUpToShowInfoAboutAcontecimentos = (pais) => {
    var acontecimentos = getAcontecimentoFromTimeAndPais(pais.properties.GEOUNIT);
    if(acontecimentos.length > 0) {
 
      return getPopUpContentFromAcontecimentos(acontecimentos)
    }
  }

  const decideElevation = (d) => {
    const dHasTempo = givenTimeGetAcontecimentos(d.properties.GEOUNIT, sliderLastValue)
    if(dHasTempo.length > 0) {
      return d === hoverD ? 0.12 : 0.01
    }
    return 0.01
  }

  return (
    <div className="App">   
      <div className="slider">
        <p href='time_line'><b>Linha do tempo</b></p>
        <Slider
          min={-480}
          step={null}
          max={1642}
          aria-label="Temperature"
          valueLabelDisplay="auto"
          defaultValue={-480}
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
          polygonAltitude={decideElevation}
          polygonCapColor={decideColor}//d => d !== hoverD ? 'steelblue' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
          polygonStrokeColor={() => '#111'}
          polygonLabel={makePopUpToShowInfoAboutAcontecimentos}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
        />
      </div>
    </div>
  );
}

export default App;
