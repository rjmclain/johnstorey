'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _responseLib = require('./libs/response-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(event, context, callback) {
  var data = JSON.parse(event.body);

  _awsSdk2.default.config.update({ region: data.region });

  var ec2 = new _awsSdk2.default.EC2();

  ec2.describeImages({
    Owners: ["self"],
    Filters: data.filters
  }, function (err, data) {
    if (err) {
      callback(null, (0, _responseLib.failure)({ status: false }));
    } else {
      callback(null, (0, _responseLib.success)(data));
    }
  });
}
