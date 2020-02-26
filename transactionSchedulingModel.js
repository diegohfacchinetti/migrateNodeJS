const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')

const TransactionSchedulingModelSchema = new dynamoose.Schema(
    {
        token: {
            type: String,
            hashKey: true,
            required: true
        },
        transactionDate: {
            type: Date,
            required: false,
            index: {
                global: true,
                name: 'transactionDateTransactionSchedulingIndex',
                rangeKey: 'createdAt',
                project: true, // ProjectionType: ALL
                throughput: 5 // read and write are both 5
            }
        },
        transactionId: {
            type: Number,
            required: true
        },
        lastReceivedStatus: {
            type: Number,
            required: true
        },
        payloadRequest: {
            type: String,
            required: true
        },
        postbackPayloads: {
            type: [{
                status: {
                    type: Number,
                    required: true
                },
                receivedAt: {
                    type: Date,
                    required: true
                },
                payload: {
                    type: String,
                    required: true
                }
            }],
            required: false,
            default: []
        },
        consumerId: {
            type: Number,
            required: true
        },
        appOrigin: {
            type: Number,
            required: false
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
        saveUnknown: true,
        useDocumentTypes: false
    }
)

const TransactionSchedulingModel = once(() => {
    const model = dynamoose.model(
        'TransactionScheduling',
        TransactionSchedulingModelSchema,
        {
            create: true,
            update: false
        }
    )
    createWrapper(model, TransactionSchedulingModelSchema)
    updateWrapper(model, TransactionSchedulingModelSchema)
    return model
})

module.exports = TransactionSchedulingModel
