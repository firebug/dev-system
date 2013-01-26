Firebug Development System
==========================

*Status: DEV - Not Yet Functional*

One place from which to hack on the whole Firebug toolchain and write extensions.

For background see: [Firebug Working Group Post: New repo for Firebug Dev System](https://groups.google.com/d/topic/firebug-working-group/GBlhWy3DYFc/discussion)

This project is currently maintained by [Christoph Dorn](http://github.com/cadorn) as a reference implementation
on how to structure toolchain workspaces using [Sourcemint](http://sourcemint.org).


Requirements
------------

  * Github Account
  * OSX
  * NodeJS 0.6.19 & npm (use [Node Version Manager](https://github.com/creationix/nvm))


Installation
------------

	npm install -g sm
	
	# Run the command you are given to put `sm` on your `PATH`.
    
	sm try github.com/firebug/dev-system/~0.1.0-pre.1 --verbose
    
	# If all goes well a window will open to get you started.


Support
-------

Firebug related:

  * [groups.google.com/group/firebug-working-group](http://groups.google.com/group/firebug-working-group)

`sm` related:

  * [groups.google.com/group/sourcemint](http://groups.google.com/group/sourcemint)
