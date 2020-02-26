const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')

const RaizenAccountConfigModelSchema = new dynamoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            hashKey: true
        },
        mdrInPercentage: {
            type: Number,
            required: true
        },

        receivable: {
            previsionDays: {
                type: Number,
                required: true
            },
            bankAccountInfo: {
                bankNumber: {
                    type: String,
                    required: true
                },
                branchNumber: {
                    type: String,
                    required: true
                },
                branchDigit: {
                    type: String,
                    required: true
                },
                accountNumber: {
                    type: String,
                    required: true
                },
                accountDigit: {
                    type: String,
                    required: true
                }
            }
        },
        payable: {
            originAccountId: {
                type: String,
                required: true
            },
            destinationAccountId: {
                type: String,
                required: true
            },
            settlementDays: {
                type: Number,
                required: true
            }
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

const RaizenAccountConfigModel = once(() => {
    const model = dynamoose.model(
        'RaizenAccountConfig',
        RaizenAccountConfigModelSchema,
        {
            create: true,
            update: false
        }
    )
    createWrapper(model, RaizenAccountConfigModelSchema)
    updateWrapper(model, RaizenAccountConfigModelSchema)
    return model
})

module.exports = RaizenAccountConfigModel
