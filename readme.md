# FlashJS
## A JavaScript plugin to create flash messages (with jQuery)
Flashjs provides tools to create flash messages or add flash behavior on existing DOM elements.

### Basic example :
```JS
$('document').ready(function () {

  window.Flashjs.success('This is a successs flash message !');

});
```
Flashjs provides a global variable named `FlashJS` on JavaScript `window` object.
<br>
<br>
<br>
### Add flash behavior on existing HTML element :
```HTML
<body>
  <div class="flash-container">
    <div class="flash flash-error">An error has occurred !</div>
  </div>
</body>
```

```JS
$('document').ready(function () {

  var options = {
    timeout: 5000
  };

  $('.flash').flashjs(options);

  // OR

  $('.flash').each(function () {
    var message = new window.Flash($(this), options); // add flashjs behavior on DOM element
  });

});
```
