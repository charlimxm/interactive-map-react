import React, { Component } from 'react'
import './style/App.css'
import MapboxGl from 'mapbox-gl'
import logo from './style/logo.jpeg'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      lng: 103.8484,
      lat: 1.2966,
      zoom: 18
    }
  }

  componentDidMount () {
    MapboxGl.accessToken = 'pk.eyJ1IjoiY2hhcmxpbXhtIiwiYSI6ImNqZW1lb3o2NTRtMXQzMmxuc2luOHUxaDkifQ.K-v81OGj0rBni3VV3hdgQA'

    const { lng, lat, zoom } = this.state

    const map = new MapboxGl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      pitch: 30,
      zoom
    })

    const marker = [
      [103.8489447, 1.2967604],
      [103.8489447, 1.2967604],
      [103.8487056, 1.2969979],
      [103.8479691, 1.2962727]
    ]

    const popupText = [
      'XYZ technologies',
      'Bras Basah station:  Walk West 300m on Bras Basah road and turn left',
      'SMU Bus Stop:  Walk South 50m on Bencoolen street',
      'Singapore Management University:  Walk West on Stamford road for 250m'
    ]

    for (var i = 0; i < marker.length; i++) {
      new MapboxGl.Marker()
        .setLngLat(marker[i])
        .setPopup(new MapboxGl.Popup()
          .setText(popupText[i]))
        .addTo(map)
    }

    map.on('move', () => {
      const { lng, lat } = map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4)
      })
    })
  }

  render () {
    const { lng, lat } = this.state

    return (
      <div>
        <h1><img src={logo} alt='Logo' height='35' /> XYZ Technologies</h1>

        <ul>
          <li><a href=''>Home</a></li>
          <li><a href=''>About</a></li>
          <li><a href=''>Product</a></li>
          <li><a href=''>Contact Us</a></li>
          <li><a href=''>Getting Here</a></li>
        </ul>

        <div>
          <h2>Getting Here</h2>
          <div id='map' ref={el => this.mapContainer = el} />
          <div id='currentLngLat'>{`Longitude: ${lng} Latitude: ${lat}`}</div>
        </div>

        <p id='instruction'>*Click on markers get directions</p>

        <div id='container1'>
          <h3>XYZ Technologies Headquarters</h3>
          <p>8 Queen St<br />#20-01<br />Singapore 189555</p>
        </div>
      </div>
    )
  }
}

export default App
