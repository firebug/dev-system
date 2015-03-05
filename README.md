Firebug Development System
==========================

**Status: DEV**

This project integrates various Mozilla and specifically [Developer Tools](https://developer.mozilla.org/en-US/docs/Tools) & [Firebug](https://github.com/firebug) related projects into a cohesive development system.

The goal is to provide a super fast way for developers to get started with
the complete Firebug development stack, build applications using it and contribute to it.


Requirements
------------

  * OSX or Ubuntu workstation
  * NodeJS `0.10+`
  * One of the following VM Accounts:
	  * [Digital Ocean Account](http://digitalocean.com/)
	  * [Amazon AWS Account](http://aws.amazon.com/)
  * [Github Account](http://github.com)

NOTE: We recommend you use a **dedicated for testing** hosting account to play with this Firebug dev system at this time.


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

Make Changes
------------

	source bin/activate.sh
	pio open
	# NOTE: All 'Develop & Test' tools and commands below will eventually be integrated into this web interface

Update
------

	source bin/activate.sh
	pio clean
	git pull origin master
	bin/install.sh
	pio deploy

Develop & Test
--------------

Tools:

	profile list

	# https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm
	jpm -h

	# https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx
	cfx -h

Projects:

	# https://github.com/firebug/firebug.next
	profile run fbn-dev

	# https://github.com/firebug/firebug
	profile run fb2-release

	# https://github.com/firebug/devtools-extension-examples
	profile run devtools-extension-examples-HelloWorld

Containers:

	profile run fp-for-mozilla-extensions-dev
	profile run fp-for-mozilla-extensions-test

Libraries:

	profile run pinf-for-mozilla-addon-sdk-test
	profile run pinf-for-mozilla-addon-sdk-examples-HelloWorld-test
	profile run pinf-for-mozilla-addon-sdk-examples-HelloWorld-run

Extensions:

	# https://github.com/firephp/firephp-extension
	profile run fb2-release-firephp

	# https://github.com/firephp/firephp-for-firebug.next
	pio publish --local firephp-for-firebug.next
	pio run firephp-for-firebug.next --open
	profile run fbn-firephp
	profile run fbn-firephp-test


License
=======

Copyright (c) 2014, Mozilla Foundation

License: MPL

Original code donated to Mozilla Foundation by [Christoph Dorn](http://christophdorn.com).

