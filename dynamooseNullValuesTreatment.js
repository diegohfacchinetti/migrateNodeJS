const removeNulls = (obj, schema) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] == undefined || obj[key] == null) {
        Reflect.deleteProperty(obj, key)
      } else if (
        typeof obj[key] === 'object' &&
        !(obj[key] instanceof Array) &&
        !Object.keys(schema).includes(key)
      ) {
        try {
          obj[key] = JSON.stringify(obj[key])
        } catch (err) {
          console.log('removeNulls: ', err)
        }
      }
    })
    return obj
  }
  
  function createWrapper (model, schema) {
    const oldCreate = model.create
  
    if (oldCreate.wrapped) {
      return
    }
  
    function create (item, optionsOrCallback, callback) {
      const newItem = removeNulls(item, schema)
      if (optionsOrCallback instanceof Function) {
        return oldCreate(newItem, optionsOrCallback)
      } else {
        return oldCreate(newItem, optionsOrCallback, callback)
      }
    }
    create.wrapped = true
    model.create = create
  }
  
  function updateWrapper (model, schema) {
    const oldUpdate = model.update
  
    if (oldUpdate.wrapped) {
      return
    }
  
    function update (key, update, optionsOrCallback, callback) {
      const newUpdate = removeNulls(update, schema)
      if (optionsOrCallback instanceof Function) {
        return oldUpdate(key, newUpdate, optionsOrCallback)
      } else {
        return oldUpdate(key, newUpdate, optionsOrCallback, callback)
      }
    }
    update.wrapped = true
    model.create = update
  }
  
  module.exports = {
    createWrapper,
    updateWrapper
  }