Firebug Development System
==========================

**Status: DEV**

This project integrates various Firebug sub-projects into a cohesive development system.

The goal is to provide a super fast way for new contributors to get started with
the Firebug development stack and contribute to it.


Requirements
------------

  * OSX or Ubuntu workstation
  * NodeJS `0.10+`
  * One of the following VM Accounts:
	  * [Digital Ocean Account](http://digitalocean.com/)
	  * [Amazon AWS Account](http://aws.amazon.com/)
  * [Github Account](http://github.com)

NOTE: We recommend you use a **dedicated** account to play with this Firebug dev system.


Install
-------

	git clone git@github.com:firebug/dev-system.git firebug-dev-system
	cd firebug-dev-system
	bin/install.sh

Deploy
------

	source bin/activate.sh
	pio deploy

NOTE: The first time you run `source bin/activate.sh` you will be asked for your VM account credentials.

Contibute
---------

	source bin/activate.sh
	pio open	

Update
------

	source bin/activate.sh
	pio clean
	git pull origin master
	bin/install.sh
	pio deploy


License
=======

Copyright (c) 2014, Mozilla Foundation

License: BSD License

Original code donated to Mozilla Foundation by [Christoph Dorn](http://christophdorn.com).

