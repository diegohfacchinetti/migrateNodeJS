const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')

const StoreAccountConfigModelSchema = new dynamoose.Schema(
    {
        storeId: {
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

const StoreAccountConfigModel = once(() => {
    const model = dynamoose.model(
        'StoreAccountConfig',
        StoreAccountConfigModelSchema,
        {
            create: true,
            update: false
        }
    )
    createWrapper(model, StoreAccountConfigModelSchema)
    updateWrapper(model, StoreAccountConfigModelSchema)
    return model
})

module.exports = StoreAccountConfigModel
