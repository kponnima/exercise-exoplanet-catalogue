/*
 *  Mocha Unit Tests.
 *  UNIT TEST - app.js
 */
const app = require('../app.js');
const request = require('request');
// import the test data stored in external json file here
let sampleTestData = require('./fixtures/exoplanetdata.json');

describe('application unit tests:', function () {

  it('modules should be declared', function () {
    expect(app).to.be.an('object');
    expect(app.fetchData).to.be.an('function');
    expect(app.displayNoStarData).to.be.an('function');
    expect(app.displayHottestStarData).to.be.an('function');
    expect(app.displayTimelineData).to.be.an('function');
    expect(app.app).to.be.an('function');
  });

  describe('fetch data set scenarios', function () {
    var responseObject, responseBody;
    beforeEach(() => {
      responseObject = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      };
      responseBody = {
        status: 'success',
        data: [
          {
            PlanetIdentifier: "KOI-1843.03",
            TypeFlag: 0,
            RadiusJpt: 0.054,
            DiscoveryYear: 2012,
            HostStarTempK: 3584,
          },
          {
            PlanetIdentifier: "KOI-1843.01",
            TypeFlag: 3,
            RadiusJpt: 0.114,
            DiscoveryYear: "",
            HostStarTempK: 3584,
          },
          {
            PlanetIdentifier: "KOI-1843.02",
            TypeFlag: 1,
            RadiusJpt: "",
            DiscoveryYear: 2018,
            HostStarTempK: 3584,
          }
        ]
      };
      this.get = sinon.stub(request, 'get'); //Stub the request GET method to fetch mocked data instead of making actual backend call
    });

    afterEach(() => {
      request.get.restore(); // restore the stubbed method
    });
    
    it('should return response - for EMPTY url', async () => {
      const result = await app.fetchData('');

      expect(result).to.deep.equal(null);
    });

    it('should return response - for valid url', (done) => {
      this.get.yields(null, responseObject, JSON.stringify(responseBody));
      request.get(`http://localhost:3000/api/v1/exoplanets`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // the JSON response body should have objects and count should match
        body.data.length.should.eql(3);
        // the first object in the data array should have the right keys
        body.data[0].should.include.keys(
          'PlanetIdentifier', 'TypeFlag', 'RadiusJpt', 'DiscoveryYear', 'HostStarTempK'
        );
        // the first object should have the right value for name
        body.data[0].PlanetIdentifier.should.eql('KOI-1843.03');
        done();
      });
    });
  });

  describe('no star scenarios', function () {
    it('should return ZERO matching stars response - for empty data set', () => {
      let emptyTestData = [];
      const result = app.displayNoStarData(emptyTestData);

      expect(result).to.deep.equal(0);
    });

    it('should return ZERO matching stars response - for valid data set with 0 TypeFlag=3', () => {
      let newTestData = [{ PlanetIdentifier: 'Kepler-63 b', TypeFlag: 0 }, {
        PlanetIdentifier: 'HD 100546 b',
        TypeFlag: 1
      }, { PlanetIdentifier: 'HD 3651.02', TypeFlag: 2 }];
      const result = app.displayNoStarData(newTestData);

      expect(result).to.deep.equal(0);
    });

    it('should return TWO matching stars response - for valid data set', () => {
      const result = app.displayNoStarData(sampleTestData);

      expect(result).to.deep.equal(2);
    });
  });

  describe('hottest star scenarios', function () {
    it('should return empty PlanetIdentifier name - for empty data set', () => {
      let emptyTestData = [];
      const result = app.displayHottestStarData(emptyTestData);

      expect(result).to.deep.equal("");
    });

    it('should return FIRST matching PlanetIdentifier name - for valid data set with mutiple stars having same value for HostStarTempK', () => {
      let newTestData = [{ PlanetIdentifier: 'Kepler-63 b', HostStarTempK: 3584 }, {
        PlanetIdentifier: 'HD 100546 b', HostStarTempK: 3584
      }, { PlanetIdentifier: 'HD 3651.02', HostStarTempK: 3584 }];
      const result = app.displayHottestStarData(newTestData);

      expect(result).to.deep.equal("Kepler-63 b");
    });

    it('should return matching PlanetIdentifier name - for valid data set', () => {
      const result = app.displayHottestStarData(sampleTestData);

      expect(result).to.deep.equal("Kepler-9 b");
    });
  });

  describe('timeline data scenarios', function () {
    it('should return empty response data - for empty data set', async () => {
      let emptyTestData = [];
      const result = await app.displayTimelineData(emptyTestData);

      expect(result).to.deep.equal([]);
    });

    it('should not increment planet count in response data - for EMPTY RadiusJpt or DiscoveryYear', async () => {
      let expectedResponse = [
        2010, 1, 0, 0,
        2012, 1, 0, 0,
        2018, 0, 0, 0
      ];
      const result = await app.displayTimelineData(sampleTestData);

      expect(result).to.not.contain(expectedResponse); // for 2018 the count is 0
    });

    it('should return TWO matching stars response - for valid data set', async () => {
      let expectedResponse = [
        2010, 1, 0, 0,
        2012, 1, 0, 0,
        2018, 0, 0, 0
      ];
      var result = [];
      result = await app.displayTimelineData(sampleTestData);

      expect(result).to.deep.equal(expectedResponse);
    });
  });
});