const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
    createWrapper,
    updateWrapper
} = require('./dynamooseNullValuesTreatment')

const PaylyAccountConfigModelSchema = new dynamoose.Schema(
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

const PaylyAccountConfigModel = once(() => {
    const model = dynamoose.model(
        'PaylyAccountConfig',
        PaylyAccountConfigModelSchema,
        {
            create: true,
            update: false
        }
    )
    createWrapper(model, PaylyAccountConfigModelSchema)
    updateWrapper(model, PaylyAccountConfigModelSchema)
    return model
})

module.exports = PaylyAccountConfigModel
