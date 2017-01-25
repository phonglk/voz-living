define({
  ObjToObs: function ObjToObs(obj, conversionCallback = function(){}) {
    return Object.keys(obj).reduce((out, key) => {
      out[key] = ko.observable(obj[key]);
      conversionCallback(key, out[key]);
      return out;
    }, {});
  },
  assignObjToObs: function MapObjToObs(obj, obs) {
    Object.keys(obj).forEach((key, value) => {
      if(obs[key]) obs[key](obj[key]);
      else console.warn(`key ${key} is not avable in observable object`);
    });
  },
  ObsToObj: function ObsToObj(obs) {
    return Object.keys(obs).reduce((out, key) => {
      out[key] = obs[key]();
      return out;
    }, {});
  }
})