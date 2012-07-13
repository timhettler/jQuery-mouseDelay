Hover With Delay
================

This project was inspired by Brian Cherne's [hoverIntent plug-in](http://cherne.net/brian/resources/jquery.hoverIntent.html). I've applied the concept using [jQuery special events](http://benalman.com/news/2010/03/jquery-special-events/) instead of writing it as a jQuery plug-in. Special events have a few advantages over plug-ins for this type of functionality. Namely:

* Special events not only allow you to create new events, they also allow you to augment default events. In this case, I'm changing the behavior of the 'mouseover' & 'mouseout' events so that they delay triggering for a set amount of time.

* Since we're changing existing events instead of creating new ones, you can add the special event code to any project and it will "just work" without having to convert all your mouse events to function declarations.

* Conversely, if the plug-in fails to load or you decide to remove it, the site won't break; events will just go back to firing immediately.

In addition to rewriting the plug-in to utilize special events, I've also simplified the concept considerably. HoverIntent uses mousespeed as the determining factor that triggers the enter & leave events. This works fine, but there is a lot of overhead involved with this. Mousemove events have to be bound & unbound each time a mouseenter or leave occurs in order to watch the cursor. This actually leads to some quirky behavior where a user could move their mouse within an element and the enter event suspends indefinitely. It's something only a bored web developer would do, sure, but I think it illustrates that the HoverIntent plug-in is over-engineered. What we really want to do is: "When a cursor enters an element, wait a set amount of time. After that, if the cursor is still inside the element, fire the event."