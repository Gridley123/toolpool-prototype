import sinon from 'sinon';

const stub = sinon.stub();

const result = {
  json: {
    results: [
      {geometry: {
          location: {
            lat: 0,
            lng: 0
          }
        }}
    ]
  }
}

const gMapsClient = () => {
  return {
    geocode: stub.callsArgWithAsync(1, null, result),
  }
};

export default gMapsClient();
