import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';

// Path for horoscope assets `assets/zodiacs/`;
// local variable at the top level for full access
let userHoroscope;

// Get user horoscope data from database by wrapping axios request into function
// horoscopeUrl will be updated to include user id as props from app.js
let horoscopeUrl = `http://localhost:8080/horoscopes/2`;

const getHoroscope = () => {
  return axios.get(horoscopeUrl)
    .catch((err) => {
      console.log(err);
    });
}

class Aztro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {}
    }
  }

  componentDidMount() {
    Promise.all([getHoroscope()])
      .then((results) => {
        // console.log(results);
        userHoroscope = results[0].data.data[0].horoscope_sign;
        // console.log(userHoroscope);
        const URL = `https://aztro.sameerkumar.website/?sign=${userHoroscope}&day=today`;
        fetch(URL, {
          method: 'POST'
        }).then(response => response.json())
          .then(json => {
            this.setState({ json, userHoroscope });
          });
      });
  }

  render() {
    return (
      <>
        <Button type="hide" click={this.props.click} name="Aztro" />
        <div className='horoscope'>
          <div className='horoscope-info'>
            {/* Current Date: {this.state.json.current_date} <br /> */}
            Your Horoscope: {this.state.userHoroscope} <br />
            Highly Compatible With: {this.state.json.compatibility} <br />
            Lucky Number: {this.state.json.lucky_number} <br />
            Lucky Time: {this.state.json.lucky_time} <br />
            Color: {this.state.json.color} <br />
            Date Range: {this.state.json.date_range} <br />
            Mood: {this.state.json.mood} <br />
            Description: {this.state.json.description} <br />
          </div>
          <div className='horoscope-thumbnail'>
            <img src={`assets/zodiacs/${userHoroscope}.jpeg`} alt='zodiac' width="200" height="200" />
          </div>
        </div>
      </>
    );
  }
}

export default Aztro;