define(['common/storage', 'options/constants'], function(
    {getSync}, {CONFIGURATION_STORE_KEY}
  ) {
   return {
     getConfiguration: function getConfiguration(key) {
       return new Promise((resolve, reject) => {
         getSync(CONFIGURATION_STORE_KEY).then(items => {
           if(_.isUndefined(items[key])) resolve(null);
           else resolve(items[key]);
         }).catch(reject);
       })
     }
   } 
});