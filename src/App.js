import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import './App.css';
import 'tachyons';

const particlesoptions = {
  "particles": {
    "number": {
      "value": 150,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const app = new Clarifai.App({
  apiKey: 'efb0af56f12b4450b8c812de90ffcd29'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation =(data)=>{
       const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);
       return {
         leftCol: clarifaiface.left_col * width,
         topRow: clarifaiface.top_row * height,
         rightCol: width - (clarifaiface.right_col * width),
         bottomRow: height - (clarifaiface.bottom_row* height)
       }
  }
 


  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
   
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {

        this.displayFaceBox(this.calculateFaceLocation(response));
      }
    )
    .catch(err => console.log(err))


    // app.models.initModel({id: Clarifai.COLOR_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    // .then(generalModel => {
    //   return generalModel.predict(this.state.input);
    // })
    // .then(response => {
    //   // let concepts = response['outputs'][0]['data']['concepts']
    //   console.log(response)
    // })


  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesoptions}
        />
        <Navigation />
        { this.state
        <Signin />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>}
      </div>
    );
  }

}

export default App;
