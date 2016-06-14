function DOMNodeCollection(nodes) {
  this.nodes = [].slice.call(nodes);
}

DOMNodeCollection.prototype = {
  each: function(cb){
    this.nodes.forEach(cb);
  },

  on: function(eventName, callback) {
    this.each(function(node){
      node.addEventListener(eventName, callback);
      var eventKey = "myQueryEvents-" + eventName;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  },

  off: function(eventName) {
    this.each(function(node){
      var eventKey = "myQueryEvents-" + eventName;
      if (node[eventKey]) {
        node[eventKey].forEach(function(callback){
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  },

  html: function(html) {
    if (typeof html === "string") {
      this.each(function(node){
        node.innerHTML = html;
      });
    } else {
      if(this.nodes.length > 0){
        return this.nodes[0].innerHTML;
      }
    }
  },

  empty: function() {
    this.html('');
  },


  append: function(children){
    if (typeof children === 'object' &&
        !(children instanceof DOMNodeCollection)) {
      children = window.$m(children);
    }

    if (typeof children === "string") {
      this.each(function(node) {
        node.innerHTML += children;
      });

    } else if (children instanceof DOMNodeCollection) {

      this.each(function(node) {
        children.each(function (childNode) {
          node.innerHTML += childNode.outerHTML;
        });

      })
    }
  },


  remove: function() {
    this.each(function(node) {
      node.parentNode.removeChild(node);
    });
  },

  attr: function(key, val) {
    if (typeof val === "string") {
      this.each(function(node) {
        node.setAttribute(key, val);
      });
    } else {
      return this.nodes[0].getAttribute(key);
    }
  },

  addClass: function(newClass) {
    this.each(function(node) {
      node.classList.add(newClass);
    });
  },

  removeClass: function(oldClass) {
    this.each(function(node) {
      node.classList.remove(oldClass);
    });
  },

  find: function(selector) {
    var foundNodes = [];
    this.each(function(node) {
      var nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat([].slice.call(nodeList));
    });
    return new DOMNodeCollection(foundNodes);
  },

  children: function() {
    var childNodes = [];
    this.each(function(node) {
      var childNodeList = node.children;
      childNodes = childNodes.concat([].slice.call(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  },

  parent: function() {
    var parentNodes = [];
    this.each(function(node) {
      parentNodes.push(node.parentNode);
    });
    return new DomNodeCollection(parentNodes);
  }

}

module.exports = DOMNodeCollection;
