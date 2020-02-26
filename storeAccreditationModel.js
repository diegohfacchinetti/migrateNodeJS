const dynamoose = require('dynamoose')
const { once } = require('lodash')
const {
  createWrapper,
  updateWrapper
} = require('./dynamooseNullValuesTreatment')

const StoreAccreditationModelSchema = new dynamoose.Schema(
  {
    storeId: {
      type: Number,
      hashKey: true,
      required: true
    },
    merchantId: {
      type: Number,
      rangeKey: true,
      required: true
    },
    merchantAccountId: {
      type: Number,
      required: true
    },
    cnpj: {
      type: String,
      required: true,
      index: {
        global: true,
        name: 'CnpjStoreAccreditationIndex',
        project: true, // ProjectionType: ALL
        throughput: 5 // read and write are both 5
      }
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
    useDocumentTypes: false
  }
)

const StoreAccreditationModel = once(() => {
  const model = dynamoose.model(
    'StoreAccreditation',
    StoreAccreditationModelSchema,
    {
      create: true,
      update: false
    }
  )
  createWrapper(model, StoreAccreditationModelSchema)
  updateWrapper(model, StoreAccreditationModelSchema)
  return model
})

module.exports = StoreAccreditationModel
