const dynamo = require('dynamoose')
const partnerConfig = require('./partnerAccountConfigModel')
const paylyConfig = require('./paylyAccountConfigModel')
const raizenConfig = require('./raizenAccountConfigModel')
const storeConfig = require('./storeAccountConfigModel')
const storeAccreditation = require('./storeAccreditationModel')
const transactionScheduling = require('./transactionSchedulingModel')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')


const configDB = function (access, secret, region) {
    console.log('init configure collection')
    dynamo.AWS.config.update({
        accessKeyId: access,
        secretAccessKey: secret,
        region: region
    })
    console.log('end configure')
}



const init = async function (access, secret, region) {
    configDB(access, secret, region)
    console.log("inite create tables")
    await new partnerConfig().get(1)
    console.log("partnerConfig create table")
    await new paylyConfig().get(1)
    console.log("paylyConfig create table")
    await new raizenConfig().get(1)
    console.log("raizenConfig create table")
    await new storeConfig().get(1)
    console.log("storeConfig create table")
    await new storeAccreditation().get({storeId:1, merchantId: 1})
    console.log("storeAccreditation create table")
    await new transactionScheduling().get(1)
    console.log("transactionScheduling create table")
    console.log('end execution')
}

require('yargs') // eslint-disable-line
    .command('migrate [access,secret,region]', 'start the migrate', (yargs) => {
        yargs
            .positional('access', {
                describe: 'access key',
                default: undefined
            })
        yargs
            .positional('secret', {
                describe: 'secret key',
                default: undefined
            })
        yargs
            .positional('region', {
                describe: 'region',
                default: undefined
            })
    }, (argv) => {
        console.info(`start migrate with params: ${argv.access}, ${argv.secret}, ${argv.region}`)
        init(argv.access, argv.secret, argv.region)
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .argv



