class CategorizedSeed {
    #seed;
    constructor() {
        console.debug('initialized')
        this.#seed = {}
    }
    lock(seedName) {
        if (this.hasMore(seedName) && !this.#seed[seedName].locked) {
            this.#seed[seedName].locked = true
            console.debug('locked')
        }
    }
    isLocked(seedName) {
        // console.debug(this.hasMore(seedName) && this.#seed[seedName].locked ? 'locked': 'unlocked')
        return this.hasMore(seedName) && this.#seed[seedName].locked
    }
    isUnLocked(seedName) {
        console.debug(this.hasMore(seedName) && !this.#seed[seedName].locked ? 'unlocked' : 'locked')
        return this.hasMore(seedName) && !this.#seed[seedName].locked
    }
    unlock(seedName) {
        if (this.hasMore(seedName) && this.#seed[seedName].locked) {
            this.#seed[seedName].locked = false
            console.debug('unlocked')
        }
    }
    insert(seedName, seedData) {
        if (!this.#seed[seedName]) {
            this.#seed[seedName] = {
                locked: false, current: 0, data: []
            };
            console.debug('new seed added')
        }
        this.#seed[seedName].data.push(seedData);
        console.debug('new data added to seed')
    }
    hasMore(seedName) {
        console.debug(Boolean(this.#seed[seedName] && this.#seed[seedName].data && this.#seed[seedName].data.length) ? 'seed has more data' : 'seed does not have more data')
        return Boolean(this.#seed[seedName] && this.#seed[seedName].data && this.#seed[seedName].data.length)
    }
    getCurrent(seedName) {
        console.debug('current seed found')
        return this.#seed[seedName].data[this.#seed[seedName].current]
    }
    getNext(seedName) {
        if (this.isUnLocked(seedName)) {
            if (this.#seed[seedName].current >= this.#seed[seedName].data.length) {
                this.#seed[seedName].current = 0
            }
            this.#seed[seedName].current++
            console.debug('next seed found')
            return this.#seed[seedName].data[this.#seed[seedName].current]
        } else {
            console.error('instance ', seedName, ' is locked. to get next data, unlock first.')
            return null
        }
    }
    removeCurrent(seedName) {
        if (this.isUnLocked(seedName)) {
            console.debug('removing data from seed')
            let current = this.#seed[seedName].current
            if (this.#seed[seedName].current > (this.#seed[seedName].data.length - 1)) this.#seed[seedName].current--;
            return (this.#seed[seedName].data.splice(current, 1))
        } else console.error('instance ', seedName, ' is locked. to remove, unlock first.')
    }
    get length() {
        return Object.keys(this.#seed).length
    }
}

var categorizeSeedGenerator = (function () {
    var instance;
    function createInstance() {
        let object = new CategorizedSeed()
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

module.exports = {
    categorizeSeedGenerator
}