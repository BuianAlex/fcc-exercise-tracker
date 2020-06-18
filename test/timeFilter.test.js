const timeFilter = require('../utils/timeFilter');
var should = require('should');

const testArr = [
  { date: '2020-05-17T00:00:00.000+00:00' },
  { date: '2020-05-18T00:00:00.000+00:00' },
  { date: '2020-05-19T00:00:00.000+00:00' },
];
describe('Time Filter test', function () {
  describe('empty array', function () {
    it('should be same array', function () {
      timeFilter([]).should.eql([]);
    });
  });
  describe('no arguments - from and to', function () {
    it('should be same array', function () {
      timeFilter(testArr).should.eql(testArr);
    });
  });
  describe('with arguments - from', function () {
    it('argument "from" is not date type', function () {
      timeFilter(testArr, '4r4e3s3w3').should.be.equal('not walid date format');
    });
    it('argument "from" is date 2016-11-20', function () {
      const result = timeFilter(testArr, '2016-11-20');
      result.should.a.Array();
      result.should.eql(testArr);
      result.should.have.length(testArr.length);
    });
    it('argument "from" is date 2020-05-18', function () {
      const result = timeFilter(testArr, '2020-05-18');
      result.should.a.Array();
      result.should.eql([
        { date: '2020-05-18T00:00:00.000+00:00' },
        { date: '2020-05-19T00:00:00.000+00:00' },
      ]);
      result.should.have.length(2);
    });
  });
  describe('with arguments - to', function () {
    it('argument "to" is not date type', function () {
      timeFilter(testArr, undefined, 'kjgukytdy').should.be.equal(
        'not walid date format'
      );
    });
    it('argument "to" is  date 2020-05-19', function () {
      const result = timeFilter(testArr, undefined, '2020-05-19');
      result.should.a.Array();
      result.should.eql(testArr);
      result.should.have.length(testArr.length);
    });
    it('argument "to" is  date 2020-05-18', function () {
      const result = timeFilter(testArr, undefined, '2020-05-18');
      result.should.a.Array();
      result.should.eql([
        { date: '2020-05-17T00:00:00.000+00:00' },
        { date: '2020-05-18T00:00:00.000+00:00' },
      ]);
      result.should.have.length(2);
    });
  });
  describe('with arguments - from & to', function () {
    it('from = 2020-05-18 to = 2020-05-18', function () {
      const result = timeFilter(testArr, '2020-05-18', '2020-05-18');
      result.should.a.Array();
      result.should.eql([{ date: '2020-05-18T00:00:00.000+00:00' }]);
      result.should.have.length(1);
    });
  });
});
