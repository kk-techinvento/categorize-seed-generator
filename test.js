const { categorizeSeedGenerator } = require("./index")

const categorizeSeed = categorizeSeedGenerator.getInstance()

categorizeSeed.insert(1, 'abc')
categorizeSeed.lock(1)
categorizeSeed.removeCurrent(1)
categorizeSeed.getNext(1)
categorizeSeed.insert(1, 'def')
categorizeSeed.unlock(1)
console.log('next', categorizeSeed.getNext(1))
categorizeSeed.lock(1)