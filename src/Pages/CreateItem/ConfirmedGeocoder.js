import React, {Component} from 'react';
import {Button, Form, Input} from 'semantic-ui-react';

//MOCKED

// const gMapsClient = require('@google/maps').createClient({
//   key: process.env.REACT_APP_GEOCODE_KEY,
//   loadingReq: false,
// })


class ConfirmedGeocoder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.defaultState;
    this.changeLocation = this.changeLocation.bind(this);

  }

  changeLocation() {
    this.props.resetLocation();
  }

  render() {
//MOCKED
    // const staticMapURL = this.state.location ?
    //   `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.location.lat},${this.state.location.lng}&zoom=10&size=300x300&key=${process.env.REACT_APP_STATIC_MAP_KEY}`
    //   : null;
    //



    return (
      <div>
        <Form.Field inline>
          <label>Location </label>
          <Input disabled value={this.props.location}
                 name="geolocation"
                 type='text'
                 action={<Button active content={'Change Location'}
                                 onClick={this.changeLocation}/>}/>
          {/**/}
        </Form.Field>
        <div />
      </div>

    );
  }
}



export default ConfirmedGeocoder;
