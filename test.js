var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://developer.nrel.gov/api'),
    apiKey = 'SFmMYTnCYWyfu3jcVVCtWE5uE4n1YKDNFrPP4aOl',
    _ = require('lodash');

describe('ChargePoint Stations nearest Austin', function() {
    var stationId;
    this.timeout(10000);
    it('should contain HYATT AUSTIN', function(done) {
        api.get('/alt-fuel-stations/v1.json')
        .query({
            api_key: apiKey, 
            ev_network:'ChargePoint Network',
            state: 'TX'
        })
        .end(function(err, res) {
            var result = res.res.body;
            var hyattStation = _.find(result.fuel_stations, function(station) { 
                return station.station_name === 'HYATT AUSTIN';
            });
            //save for subsequent tests
            stationId = hyattStation.id;
            expect(hyattStation).to.not.be.undefined;
            done();
        });
    });

    it('should have an address of 208 Barton Springs Rd, Austin, Texas, USA, 78704', function(done) {
        api.get('/alt-fuel-stations/v1/id/' + stationId + '.json')
            .query({api_key: apiKey})
            .end(function(err, res) {
                console.log(res);
                done();
            });
    });
});

