# FlashJS
Flash.js is a simple JavaScript library allowing you to create and handle HTML flash messages.
You can [try it yourself](https://betaweb.github.io/flashjs/#examples) here.

### Installation :
You only have to include the [flash.js](https://betaweb.github.io/flashjs/) script into your HTML. That's it !

```HTML
<script src="/path/to/flashjs.min.js"></script>

```
<br>

### Getting started :
#### Vanilla JS
Use [flash.js](https://betaweb.github.io/flashjs/) is very easy. To display a success flash message, you just have to add this line below.
```JS
window.FlashMessage.success('This is a successs flash message !');
```
By default, four verbs are availables : `success`, `warning`, `error` and `info`.

You can add custom verbs with by call the static method addCustomTypes on the FlashMessage class :
```JS
window.FlashMessage.addCustomTypes('forbidden', 'example', 'custom');
window.FlashMessage.forbidden('My custom forbidden flash message !');
```
In the example above, three custom verbs have been added. As you can see, you can now use thses verbs !

<br>

You can also create a flash message by instanciating the FlashMessage class :

```JS
new window.FlashMessage('This is a successs flash message !', 'success');
```

<br>

#### jQuery
However, you can easily use [flash.js](https://betaweb.github.io/flashjs/) with the jQuery plugin (by adding behavior on existing DOM elements) :
##### HTML
```HTML
<div class="flash-container">
  <div class="flash-message flash-success">My awesome success message !</div>
  <div class="flash-message flash-error">My sadly sad error message !</div>
</div>
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