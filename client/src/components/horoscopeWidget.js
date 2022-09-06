import React, { Component } from 'react';
import Button from './Button';
const userHoroscope = 'Taurus';

let userHoroscopeImage = `assets/zodiacs/`;

// Assign horoscope image to userHoroscopeImage from assets/zodiacs folder, based on userHoroscope
switch (userHoroscope) {
  case 'Aries':
    userHoroscopeImage += 'Aries.jpeg';
    break;
  case 'Taurus':
    userHoroscopeImage += 'Taurus.jpeg';
    break;
  case 'Gemini':
    userHoroscopeImage += 'Gemini.jpeg';
    break;
  case 'Cancer':
    userHoroscopeImage += 'Cancer.jpeg';
    break;
  case 'Leo':
    userHoroscopeImage += 'Leo.jpeg';
    break;
  case 'Virgo':
    userHoroscopeImage += 'Virgo.jpeg';
    break;
  case 'Libra':
    userHoroscopeImage += 'Libra.jpeg';
    break;
  case 'Scorpio':
    userHoroscopeImage += 'Scorpio.jpeg';
    break;
  case 'Sagittarius':
    userHoroscopeImage += 'Sagittarius.jpeg';
    break;
  case 'Capricorn':
    userHoroscopeImage += 'Capricorn.jpeg';
    break;
  case 'Aquarius':
    userHoroscopeImage += 'Aquarius.jpeg';
    break;
  case 'Pisces':
    userHoroscopeImage += 'Pisces.jpeg';
    break;
  default:
    userHoroscopeImage += '';
}

class Aztro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {}
    }
  }

  componentDidMount() {
    const URL = `https://aztro.sameerkumar.website/?sign=${userHoroscope}&day=today`;
    fetch(URL, {
      method: 'POST'
    }).then(response => response.json())
      .then(json => { this.setState({ json }); });
  }

  render() {
    return (
      <>
        <Button click={this.props.click} name="Aztro" />
      <div className='horoscope'>
        <div className='horoscope-info'>
          {/* Current Date: {this.state.json.current_date} <br /> */}
          Your Horoscope: {userHoroscope} <br />
          Highly Compatible With: {this.state.json.compatibility} <br />
          Lucky Number: {this.state.json.lucky_number} <br />
          Lucky Time: {this.state.json.lucky_time} <br />
          Color: {this.state.json.color} <br />
          Date Range: {this.state.json.date_range} <br />
          Mood: {this.state.json.mood} <br />
          Description: {this.state.json.description} <br />
        </div>
        <div className='horoscope-thumbnail'>
          <img src={userHoroscopeImage} alt='zodiac' width="200" height="200" />
        </div>
      </div>
      </>
    );
  }
}

export default Aztro;