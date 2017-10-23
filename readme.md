# FlashJS
Flash.js is a simple JavaScript library allowing you to create and handle HTML flash messages.

### Installation :
You only have to include the flash.js script into your HTML. That's it !

```HTML
<script src="/path/to/flashjs.min.js"></script>

```
<br>

### Getting started :
Use flash.js is very easy. To display a success flash message, you just have to add this line below.
```JS
window.Flashjs.success('This is a successs flash message !');
```
By default, four verbs are availables : `success`, `warning`, `error` and `info`

You can add custom verbs with by call the static method addCustomTypes on the FlashMessage class :
```JS
window.FlashMessage.addCustomTypes('forbidden', 'example', 'custom');
window.Flashjs.forbidden('My custom forbidden flash message !');
```
In the example above, three custom verbs have been added. As you can see, you can now use thses verbs !

<br>

You can also create a flash message by instanciating the FlashMessage class :

```JS
new window.FlashMessage('This is a successs flash message !', 'success');
```

<br>

You can read the [documentation](https://betaweb.github.io/flashjs/) for more informations.