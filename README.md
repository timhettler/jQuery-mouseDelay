mouseDelay
================

This project was inspired by Brian Cherne's [hoverIntent plug-in](http://cherne.net/brian/resources/jquery.hoverIntent.html). I've applied the concept using [jQuery special events](http://benalman.com/news/2010/03/jquery-special-events/) instead of writing it as a jQuery plug-in. Special events have a few advantages over plug-ins for this type of functionality. Namely:

* Special events allow you to create new events, but they also allow you to augment default events. In this case, the behavior of the 'mouseover' & 'mouseout' events are changed so that there's a delay before they're triggered.

* Since we're changing existing events instead of creating new ones, you can add mouseDelay to any project and it will "just work" without having to convert all your mouse event handlers to a proprietary syntax.

* If the plug-in fails to load or you decide to remove it, the site won't break; events will just go back to firing immediately.

Instead of simply porting the hoverIntent plug-in to utilize special events, I've simplified the concept dramatically. hoverIntent uses mouse speed as the determining factor that triggers the enter & leave events. This works fine, but there is a lot of overhead involved with this. Mousemove events have to be bound & unbound each time a mouseenter or leave occurs in order to watch the cursor. This leads to some quirky behavior where a user could move their mouse within an element and the enter event suspends indefinitely. The functions associated with tracking and comparing mouse position also adds a considerable amount of code. For these reasons, I think the hoverIntent plug-in is over-engineered for most use-cases.

mouseDelay is built to solve a simple problem: *"When a cursor enters or leaves an element, wait a set amount of time. After that, if the cursor is still inside or outside the element, fire the appropriate event."*

Demo
====

http://timhettler.github.com/jQuery-mouseDelay/

Usage
=====

Include mouseDelay before the closing `</body>` element:

```html
<script src="/path/to/mouseDelay.min.js"></script>
```

Create `mouseover`, `mouseout`, `mouseenter`, or `mouseleave` event handlers as normal.

```javascript
$('.tab')
    .on('mouseenter', showTab)
    .on('mouseleave', hideTab);
```

By default, a delay of **150ms** is applied to all affected events. You can adjust this value globally by directly editing `$.fn.hover.defaultSettings`, or overwriting it in your code conditionally. To set a custom delay value for an individual event handler, supply the amount of delay in milliseconds as event data:

```javascript
$('.tab')
    .on('mouseenter', 250, showTab)
    .on('mouseleave', 500, hideTab);
```

mouseDelay also overwrites jQuery's default hover plug-in to allow for an extra "delay" argument.

```javascript
$('.tab').hover(
    showTab,
    hideTab,
    250
);
```

If you want different delay values for the over & out events, you can supply them as a JSON object:

```javascript
$('.tab').hover(
    showTab,
    hideTab,
    {
        'over' : 250,
        'out' : 500
    }
);
```

Requirements
============

This plug-in requires jQuery 1.4.2 or higher. It has been tested with jQuery 1.7.2.