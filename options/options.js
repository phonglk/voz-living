// Saves options to chrome.storage.sync.
const CONFIGURATION_STORE_KEY = 'configuration';
const defaultConfiguration = {
  removeAds: true,
  enableFullScreen: false,
  enableLinkProcessYoutube: true,
  enableLinkProcessImage: true,
  quickAccess: '17,33'
}
require(['common/storage', 'common/ko-utils'], function({getSync, setSync}, {ObsToObj, ObjToObs, assignObjToObs}) {
  const vm = window._vm /* debug purpose */ ={}

  function onChange() {
    _.debounce(() => {
      const updated = ObsToObj(vm.configuration);
      vm.isSaveButtonEnabled(!_.isEqual(updated, vm.lastConfiguration));
    }, 300)();
  }

  function checkRestoreCondition(configuration){
    return !_.isEqual(configuration, defaultConfiguration)
  }

  function restoreOptions() {
    getSync(CONFIGURATION_STORE_KEY).then((_configuration) => {
      const configuration = Object.assign({}, defaultConfiguration, _configuration);
      Object.assign(vm, {
        configuration: ObjToObs(configuration, (key, obs) => obs.subscribe(onChange)),
        lastConfiguration: configuration,
        isSaveButtonEnabled: ko.observable(false),
        isRestoreButtonEnable: ko.observable(checkRestoreCondition(configuration)),
      });
      ko.applyBindings(vm, document.querySelector("#main"));
    })
  }

  function saveOptions() {
    const newConfiguration = ObsToObj(vm.configuration);
    setSync(CONFIGURATION_STORE_KEY, newConfiguration).then(() => {
      vm.lastConfiguration = newConfiguration;
      vm.isRestoreButtonEnable(checkRestoreCondition(newConfiguration));
      onChange();
    })
  }

  function restore() {
    assignObjToObs(defaultConfiguration, vm.configuration);
  }

  restoreOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('restore').addEventListener('click', restore);
});