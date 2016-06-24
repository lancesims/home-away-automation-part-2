var expect = require('chai').expect,
    supertest = require('supertest'),
    shared = require('./shared'),
    api = supertest(shared.developerGovAddress),
    _ = require('lodash');

describe('ChargePoint Stations nearest Austin', function() {
    var stationId;
    this.timeout(10000);
    it('should contain HYATT AUSTIN', function(done) {
        api.get('/alt-fuel-stations/v1.json')
        .query({
            api_key: shared.apiKey, 
            ev_network:'ChargePoint Network',
            state: 'TX'
        })
        .end(function(err, res) {
            var result = res.body;
            var hyattStation = _.find(result.fuel_stations, function(station) { 
                return station.station_name === 'HYATT AUSTIN';
            });
            //save for subsequent tests
            stationId = hyattStation.id;
            expect(hyattStation).to.not.be.undefined;
            done();
        });
    });

    it('should have an address of 208 Barton Springs Rd, Austin, Texas, 78704', function(done) {
        api.get('/alt-fuel-stations/v1/' + stationId + '.json?')
            .query({api_key: shared.apiKey})
            .end(function(err, res) {
                var result = res.body.alt_fuel_station;
                expect(result.street_address).to.equal('208 Barton Springs Rd');
                expect(result.city).to.equal('Austin');
                expect(result.state).to.equal('TX');
                expect(result.zip).to.equal('78704');
                done();
            });
    });
});

