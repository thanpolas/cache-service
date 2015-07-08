/**
 * cacheCollection constructor
 * @constructor
 * @param settings: {
 *   nameSpace:               {string | ''},
 *   verbose:                 {boolean | false}
 * }
 * @param cacheModules: [
 *    {cache module object}
 * ]
 */
function cacheCollection(settings, cacheModules){
  var self = this;

  /**
   * Initialize cacheCollection given the provided constructor params
   */
  function init(){
    if(!cacheModules || cacheModules.length < 1){
      throw new exception('NoCacheModulesException', 'No cacheModules object was provided.');
    }
    self.caches = [];
    for(var i = 0; i < cacheModules.length; i++){
      var cacheModule = cacheModules[i];
      if(isEmpty(cacheModule)){
        log(true, 'Cache module at index ' + i + ' is \'empty\'.');
        continue;
      }
      cacheModule = addSettings(cacheModule);
      self.caches.push(cacheModule);
    }
    if(self.caches.length < 1){
      throw new exception('NoCacheException', 'No caches were succesfully initialized.');
    }
  }

  /**
   * Adds cache-service config properties to each cache module
   * @param {object} cacheModule
   * @return {object} cacheModule
   */
  function addSettings(cacheModule){
    cacheModule.nameSpace = settings.nameSpace;
    cacheModule.verbose = settings.verbose;
    return cacheModule;
  }

  /**
   * Checks if a value is "empty"
   * @param {object | string | null | undefined} val
   * @return {boolean}
   */
  function isEmpty (val) {
    return (val === false || val === null || val === undefined || (typeof val == 'object' && Object.keys(val).length == 0));
  }

  /**
   * Instantates an exception to be thrown
   * @param {string} name
   * @param {string} message
   * @return {exception}
   */
  function exception(name, message){
    this.name = name;
    this.message = message;
  }

  /**
   * Logging utility function
   * @param {boolean} isError
   * @param {string} message
   * @param {object} data
   */
  function log(isError, message, data){
    var indentifier = 'cacheService: ';
    if(self.verbose || isError){
      if(data) console.log(indentifier + message, data);
      else console.log(indentifier + message);
    }
  }

  init();
}

module.exports = cacheCollection;