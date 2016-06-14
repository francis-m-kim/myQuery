var DomNodeCollection = require("./dom_node_collection");

var _docReadyCallbacks = [], _docReady = false;

function $m(arg) {
  var returnValue;
  switch (typeof(arg)) {
    case "function":
      registerDocReadyCallback(arg);
      break;
    case "string":
      returnValue = getNodesFromDom(arg);
      break;
    case "object":
      if(arg instanceof HTMLElement) {
        returnValue = new DomNodeCollection([arg]);
      }
      break;
  }
  return returnValue;
}

$m.extend = function(base) {
  var otherObjs = [].slice.call(arguments, 1);
  otherObjs.forEach(function(obj) {
    for(var prop in obj){
      if (obj.hasOwnProperty(prop)) {
        base[prop] = obj[prop];
      }
    }
  });
  return base;
};

$m.ajax = function(options) {
  var request = new XMLHttpRequest();

  var defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: function() {},
    error: function() {},
    data: {},
  };
  options = $m.extend(defaults, options);

  if (options.method.toUpperCase() === "GET") {
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);

  request.onload = function(e) {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

function toQueryString(obj) {
  var result = "";
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

function registerDocReadyCallback(callback) {
  if (!_docReady) {
    _docReadyCallbacks.push(callback);
  } else {
    callback();
  }
}

function getNodesFromDom (selector){
  var nodes = [].slice.call(document.querySelectorAll(selector), 0);
  return new DomNodeCollection(nodes);
}

document.addEventListener('DOMContentLoaded', function () {
  _docReady = true;
  _docReadyCallbacks.forEach(function(callback) {
    callback();
  });
});



module.exports = $m;
