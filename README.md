### myQuery

myQuery is a lightweight JavaScript library inspired by jQuery. It makes DOM traversal and element modification a cinch.

myQuery's main method `$m` is placed on the window when an HTML document is loaded. The `$m` method allows can take either a function, string, or an object as an argument:

```javascript
$m(alert("Document loaded"))

$m("p")

var newP = document.create("p");
newP.innerHTML("A new <p> tag.");
$m(newP);
```

`$m` registers functions as document-ready callbacks. If given a string, `$m` returns a `DOMNodeCollection` of elements matching that selector. Finally, an object passed into `$m` is wrapped in a `DOMNodeCollection` object.

The `DOMNodeCollection` class is the workhorse of the myQuery library. It features the following methods: 

* `each` — iterate over the `DOMNodeCollection`. Takes care of slicing the non-iterable items elicited by a document query selector search. 
* `on` – add a callback to the `DOMNodeCollection`. The parameters are `(eventName, callback)`.
* `off` – remove all callbacks associated with a particular `(eventName)`.
* `html`
* `empty`
* `append`
* `remove`
* `attr`
* `addClass`
* `removeClass`
* `find`
* `children`
* `parent`

As `$m` returns a DOMNodeCollection, it is a simple step to chain any of these methods directly afterwards, e.g. `$m("li").find("a")`.
