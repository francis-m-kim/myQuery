### myQuery

myQuery is a lightweight JavaScript library inspired by jQuery. It makes DOM traversal and element modification a cinch.

myQuery's main method `$m` is placed on the window when an HTML document is loaded. The `$m` method allows can take either a function, string, or an object as an argument:

```javascript
$m(alert("Document loaded"))

$m("p")

var newP = document.createElement("p");
newP.innerHTML("A new <p> tag.");
$m(newP);
```

`$m` registers functions as document-ready callbacks. If given a string, `$m` returns a `DOMNodeCollection` of elements matching that selector. Finally, an object passed into `$m` is wrapped in a `DOMNodeCollection` object.

The `DOMNodeCollection` class is the workhorse of the myQuery library. It features the following methods: 

* `each` — iterate over the `DOMNodeCollection`. Takes care of slicing the non-iterable items elicited by a document query selector search. 
* `on` – add a callback to the `DOMNodeCollection`. The parameters are `(eventName, callback)`.
* `off` – remove all callbacks associated with a particular `(eventName)`.
* `html` – if given a string, the method changes the inner HTML of every node in the `DOMNodeCollection` to that string. Otherwise, the inner HTML of the first node is returned.
* `empty` – empty the inner HTML of every node.
* `append` – the argument can be a plain HTML element, string, or `DOMNodeCollection`. In any case, the argument content will be appended to every node in the present `DOMNodeCollection`.
* `remove` – removes every node in the `DOMNodeCollection` from its parent.
* `attr` – get or set tt
* `addClass`
* `removeClass`
* `find`
* `children`
* `parent`

As `$m` returns a DOMNodeCollection, it is a simple step to chain any of these methods directly afterwards, e.g. `$m("li").find("a")`.
