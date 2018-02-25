import React, {Component} from 'react';
import {Button, Form, Header, Image, Input, Message, Segment} from 'semantic-ui-react';
import {isLength} from 'validator';
//MOCKED
import staticMapURL from '../../stubs/staticmap.png';
import gMapsClient from '../../stubs/gMapsClient';


// const gMapsClient = require('@google/maps').createClient({
//   key: process.env.REACT_APP_GEOCODE_KEY,
//   loadingReq: false,
// })


class Geocoder extends Component {
  constructor(props, context) {
    super(props, context);
    this.defaultState = {
      submittedOnce: false,
      inputText: '',
      loading: false,
      loadingError: false,
      location: {},
      validationError: false,
    };
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.validate = this.validate.bind(this);
    this.confirm = this.confirm.bind(this);
    this.validate = this.validate.bind(this);
  }

  reset() {
    this.setState({
      ...this.defaultState
    })
  }

  confirm(bool) {
    if (bool) {
      this.props.setLocation(this.state.location, this.state.inputtedLocation);
    }
    else {
      this.reset()
    }
  }

  validate() {
    if (!isLength(this.state.inputText, { min: 2 })) {
      this.setState({ validationError: true });
      return false;
    } else {
      this.setState({ validationError: false });
      return true;
    }
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value,
    }, () => {
      this.validate();
    })
  }

  checkLocation() {
    if (this.validate()) {
      gMapsClient.geocode({
        address: this.state.inputText,
        components: { country: 'GB' }
      }, (err, data) => {
        this.setState({ loading: false });
        if (err) {
          this.setState({ loadingError: true, submittedOnce: true });
          return console.error(err);
        }
        const newGeoLocation = (data.json.results["0"].geometry.location);
        console.log(newGeoLocation);
        this.setState({
          inputtedLocation: this.state.inputText,
          location: newGeoLocation,
          submittedOnce: true,
        });
      });
      this.setState({ loading: true });
    }
    else return false
  }

  render() {
//MOCKED
    // const staticMapURL = this.state.location ?
    //   `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.location.lat},${this.state.location.lng}&zoom=10&size=300x300&key=${process.env.REACT_APP_STATIC_MAP_KEY}`
    //   : null;
    //

    const imageGroup =
      <Segment.Group horizontal>
        <Segment textAlign={"center"}>
          <Image size={"big"} rounded src={staticMapURL}/>
        </Segment>
        <Segment textAlign={"center"}>
          <Header as={"h3"}>
            Does the map show the correct approximate location?
          </Header>
          <Button.Group>
            <Button positive onClick={() => this.confirm(true)}>Yes</Button>
            <Button.Or/>
            <Button negative onClick={() => this.confirm(false)}>No</Button>
          </Button.Group>
        </Segment>
      </Segment.Group>;

    const valErr = this.state.validationError ? `The inputted location is missing or does not look correct` : null;
    const locationErr = this.state.loadingError ? `The location finder can not find your location.  You may not be connected to the internet or the location may not exist.  Please try a different location or again later` : null;
    const errMessage = [valErr, locationErr];
    return (
      <div>
        <Form.Field inline error={this.state.loadingError}>
          <label>Location </label>
          <Input value={this.state.inputText}
                 name="geolocation"
                 onChange={this.handleChange}
                 type='text' placeholder='Postcode/Town/City'
                 action={<Button loading={this.state.loading} content={'Check Location'}
                                 onClick={this.checkLocation}/>}/>
          {/**/}
        </Form.Field>
        <Message attached={"bottom"} negative
                 hidden={!this.state.loadingError && !this.state.validationError}
                 header='Location Finder Error'
                 list={errMessage}/>
        {this.state.location.lat !== undefined && imageGroup}
      </div>

    );
  }
}

Geocoder.propTypes = {};
Geocoder.defaultProps = {};

export default Geocoder;
