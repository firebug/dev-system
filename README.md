DeveloperCompanion Sibling Workspace
====================================

**Status: DEV**

This project contains a sample workspace with instructions on how to set it up as a sibling of [devcomp](https://github.com/devcomp-io/devcomp).

The following workspace structure is expected:

	~/dev.workspaces
	  /devcomp
	  /<This Project>

Features:

  * [devcomp](https://github.com/devcomp-io/devcomp) can be used as a reference implementation and to verify upstream changes.
  * This sibling project will locally link dependencies from the cloned [devcomp](https://github.com/devcomp-io/devcomp) project
    so that they do not need to be downloaded every time `pio clean` is run.
  * Deployment of an instance derived from [devcomp](https://github.com/devcomp-io/devcomp).

**NOTE: This project currently does not contain the devcomp services and only the upstream services.
This will be rectified as soon as we can publish catalogs from the devcomp instance.**


Setup Workspace
===============

Requirements:

  * OSX
  * NodeJS `0.10+`
  * One of the following VM Accounts:
	  * [Digital Ocean](http://digitalocean.com/)
	  * [Amazon AWS Account](http://aws.amazon.com/)

NOTE: We recommend you use a **dedicated** account to play with devcomp.

Locate workspaces:

	mkdir ~/dev.workspaces
	cd ~/dev.workspaces


1. Setup [devcomp](https://github.com/devcomp-io/devcomp)
---------------------------------------------------------

	git clone git@github.com:devcomp-io/devcomp.git devcomp
	cd devcomp

	bin/install.sh

    source bin/activate.sh

    pio deploy

    pio open


2. Setup Sibling Workspace
--------------------------

Pick a name: `<NAME>` and clone:

	git clone git@github.com:devcomp-io/devcomp.workspace.sibling.git <NAME>
	cd <NAME>

Set your own values in `pio.json`:

	{
	    "uuid": "04782e3e-33ad-40af-ad02-495b2fbba392",
	    "config": {
	        "pio": {
	            "domain": "vm.devcomp.io",
	            "namespace": "devcomp-ws-sibling"
	        }
	    }
	}

Install:

	bin/install.sh

Activate:

    source bin/activate.sh

Provision instance and deploy services:

    pio deploy


License
=======

Copyright 2014 Christoph Dorn

License: MIT

