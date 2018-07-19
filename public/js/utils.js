/** Gets the URL parameters in the form of an object. */
function getParameters() {
  const parameters = {};
  window.location.search.substr(1).split('&').forEach(
    function(parameterStr) {
      const parameter = parameterStr.split('=');
      parameters[parameter[0]] = parameter[1];
    });
  return parameters;
}

const _View = Object.freeze({
  TEAM: 'team',
  SPYMASTER: 'spymaster'
});
