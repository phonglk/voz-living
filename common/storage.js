define(function() {
  function _set(obj, storage = "sync") {
    return new Promise((resolve, reject) => {
      try{
        chrome.storage[storage].set(obj, () => {
          resolve()
        });
      } catch(e){
        reject(e);
      }
    });
  }

  function _get(obj = null, storage = "sync") {
    return new Promise((resolve, reject) => {
      try{
        chrome.storage[storage].get((items) => {
          resolve(items)
        });
      } catch(e){
        reject(e);
      }
    });
  }

  function get(key, storage) {
    return new Promise((resolve, reject) => {
      _get(null, storage).then((items) => {
        if (typeof items[key] != 'undefined') {
          resolve(items[key])
        } else {
          resolve(null)
        }
      }).catch(reject)
    })
  }

  function getSync(key) {
    return get(key, 'sync');
  }

  function set(key, value, storage) {
    return new Promise((resolve, reject) => {
      _get(null, storage).then((items) => {
        items[key] = value;
        _set(items, storage)
          .then(resolve)
          .catch(reject);
      }).catch(reject)
    });
  }

  function setSync(key, value) {
    return set(key, value, 'sync');
  }


  return {
    _set: _set,
    _get: _get,
    get: get,
    getSync: getSync,
    set: set,
    setSync: setSync
  }
})