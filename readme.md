# FlashJS
Flash.js is a simple JavaScript library allowing you to create and handle HTML flash messages.
You can [try it yourself](https://betaweb.github.io/flashjs/#examples) here.

### Installation :
You only have to include the [flash.js](https://betaweb.github.io/flashjs/) script into your HTML. That's it !

```HTML
<script src="path/to/flashjs.min.js"></script>

```
<br>

### Getting started :
#### Vanilla JS
Use [flash.js](https://betaweb.github.io/flashjs/) is very easy. To display a success flash message, you just have to add this line below.
```JS
window.FlashMessage.success('This is a successs flash message !');
```
By default, four verbs are availables : `success`, `warning`, `error` and `info`.

You can add custom verbs with by call the static method [`addCustomVerbs`](https://github.com/betaWeb/flashjs/blob/master/src/FlashMessage.js#L33) on the FlashMessage class :
```JS
window.FlashMessage.addCustomVerbs('forbidden', 'example', 'custom');
window.FlashMessage.forbidden('My custom forbidden flash message !');
```
In the example above, three custom verbs have been added. As you can see, you can now use thses verbs !

<br>

You can also create a flash message by instanciating the FlashMessage class :

```JS
new window.FlashMessage('This is a successs flash message !', 'success');
```

Flash.js also allows you to simply add flash behavior on existing DOM elements (especially if HTML is rendered server-side) :
##### HTML
```HTML
<div class="flash-container">
  <div class="flash-message flash-success">My awesome success message !</div>
  <div class="flash-message flash-error">My sadly sad error message !</div>
</div
```

##### JS
```JS
new window.Flash('.flash-message');
```


<br>

#### jQuery
However, you can easily use [flash.js](https://betaweb.github.io/flashjs/) with the jQuery plugin (by adding behavior on existing DOM elements, when HTML is rendered server-side for example) :
##### HTML
```HTML
<div class="flash-container">
  <div class="flash-message flash-success">My awesome success message with the Flash.js jQuery plugin !</div>
  <div class="flash-message flash-error">My sadly sad error message with the Flash.js jQuery plugin !</div>
</div>

<!-- Don't forget to add flash.js jQuery plugin script right after the flash.js library ! -->
<script src="path/to/flashjs.min.js"></script>
<script src="path/to/flash.jquery.min.js"></script>
```

##### JS
```JS
$('document').ready(function () {

  $('.flash-message').flashjs({
    timeout: 5000
  });

});
```

<br>

You can read the [documentation](https://betaweb.github.io/flashjs/) for more informations.