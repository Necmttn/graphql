var getbabelRelayPlugin = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var graphqlHubUrl = 'https://www.GraphQLHub.com/graphql';
var response = request('GET', graphqlHubUrl, {
  qs: {
    query: introspectionQuery
  }
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = getbabelRelayPlugin(schema);
