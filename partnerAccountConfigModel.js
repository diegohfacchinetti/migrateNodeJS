const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')

const PartnerAccountConfigModelSchema = new dynamoose.Schema(
    {
        appOrigin: {
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
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        },
    },
      {
        timestamps: true,
        saveUnknown: true,
        useDocumentTypes: false
    }
)

const PartnerAccountConfigModel = once(() => {
    const model = dynamoose.model(
        'PartnerAccountConfig',
        PartnerAccountConfigModelSchema,
        {
            create: true,
            update: false
        }
    )
    createWrapper(model, PartnerAccountConfigModelSchema)
    updateWrapper(model, PartnerAccountConfigModelSchema)
    return model
})

module.exports = PartnerAccountConfigModel
