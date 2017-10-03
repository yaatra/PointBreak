var assign = require('object-assign')
var request = require('request-promise')
var moment = require('moment')
var FitbitClient = require('fitbit-client-oauth2')
var config = require('fitbit-client-oauth2/src/config')
var client = new FitbitClient(process.env.FITBIT_CLIENT_ID, process.env.FITBIT_CLIENT_SECRET)

// This method creates requests using request-promise library
function createRequestPromise (options, method, body) {
    var acceptLanguage = options.units === 'METRIC' ? 'es_ES' : 'en_US'
    options = assign({
        url: options.uri,
        method: method,
        json: true,
        headers: {
            Authorization: 'Bearer ' + options.access_token,
            'Accept-Language': acceptLanguage
        }
    }, options)

    if (body) options.form = body

    delete options.units

    return request(options).then(function (res) {
        if (options.resourcePath) {
            res.requestedResource = options.resourcePath.replace('/', '-')
        }
        return res
    }).then(null, function (error) {
        console.error(error)
    })
}

// The following are just helper functions
function buildDailyActivitySummaryOptions (options) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/activities/date/{date}.json'
    options = assign({
        userId: '-',
        date: moment().format('YYYY-MM-DD'),
        units: 'IMPERIAL'
    }, options)
    options.uri = uri.replace('{userId}', options.userId).replace('{date}', options.date)
    return options
}

function buildTimeSeriesOptions (options, period, typeOfData) {
    var url = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/{resourcePath}/date/{baseDate}/{period}.json'
    options = assign({
        userId: '-',
        resourcePath: 'activities/tracker/' + typeOfData,
        baseDate: 'today',
        period: period,
        units: 'IMPERIAL'
    }, options)
    options.url = url.replace('{userId}', options.userId)
        .replace('{resourcePath}', options.resourcePath)
        .replace('{baseDate}', options.baseDate)
        .replace('{period}', options.period)
    return options
}

// This function gets a summary of one day's activity
client.getDailyActivitySummary = function (token, options) {
    options = buildDailyActivitySummaryOptions(options)
    token = this.createToken(token)
    // TODO: improve this way of getting the token
    options.access_token = token.token.accessToken
    return createRequestPromise(options)
}

// This function gets a summary of a specific activity data (see routes/user.js) for a specified period of time
client.getActivityTimeSeries = function (token, options, periodOfTime, typeOfData) {
    options = buildTimeSeriesOptions(options, periodOfTime, typeOfData)
    token = this.createToken(token)
    options.access_token = token.token.accessToken
    return createRequestPromise(options, 'GET')
}

module.exports = client
