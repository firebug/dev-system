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
  * **DEDICATED** [Amazon AWS Account](http://aws.amazon.com/)

Locate workspaces:

	mkdir ~/dev.workspaces
	cd ~/dev.workspaces


1. Setup [devcomp](https://github.com/devcomp-io/devcomp)
---------------------------------------------------------

Credentials:

	echo '
	#!/bin/bash -e
	# IAM credentials for AWS account
	export AWS_USER_NAME="<Your Username>"
	export AWS_ACCESS_KEY="<Your Access Key>"
	export AWS_SECRET_KEY="<Your Secret Key>"
	# pinf.io credentials (generate your own UUIDs)
	export PIO_EPOCH_ID="<Insert UUID>"
	export PIO_SEED_SALT="<Insert UUID>"
	export PIO_SEED_KEY="<Insert UUID>"
	export PIO_USER_ID="<Insert UUID>"
	export PIO_USER_SECRET="<Insert UUID>"
	' > devcomp.activate.sh

Clone:

	git clone git@github.com:devcomp-io/devcomp.git devcomp
	cd devcomp

Install:

	./install.sh

Activate:

    source bin/activate.sh

Provision instance and deploy services:

    pio deploy


2. Setup Sibling Workspace
--------------------------

Pick a name: `<NAME>`

Credentials:

	echo '
	#!/bin/bash -e
	# IAM credentials for AWS account
	export AWS_USER_NAME="<Your Username>"
	export AWS_ACCESS_KEY="<Your Access Key>"
	export AWS_SECRET_KEY="<Your Secret Key>"
	# pinf.io credentials (generate your own UUIDs)
	export PIO_EPOCH_ID="<Insert UUID>"
	export PIO_SEED_SALT="<Insert UUID>"
	export PIO_SEED_KEY="<Insert UUID>"
	export PIO_USER_ID="<Insert UUID>"
	export PIO_USER_SECRET="<Insert UUID>"
	' > <NAME>.activate.sh

Clone:

	git clone git@github.com:devcomp-io/devcomp.workspace.sibling.git <NAME>
	cd <NAME>

Set your own values in `pio.json`:

	{
	    "uuid": "04782e3e-33ad-40af-ad02-495b2fbba392",
	    "config": {
	        "pio": {
	            "domain": "vm.cadorn.github.pinf.me",
	            "namespace": "devcomp-ws-sibling",
	            "keyPath": "~/.ssh/io.devcomp_rsa",
	            "serviceRepositoryUri": "https://s3.amazonaws.com/dev.genesis.pio.service.repository/{{config.pio.namespace}}"
	        },
	        "pio.dns": {
	            "adapters": {
	                "dnsimple": {
	                    "email": "{{env.DNSIMPLE_EMAIL}}",
	                    "token": "{{env.DNSIMPLE_TOKEN}}"
	                }
	                // or
	                "aws": {
	                    "accessKeyId": "{{env.AWS_ACCESS_KEY}}",
	                    "secretAccessKey": "{{env.AWS_SECRET_KEY}}",
	                    "region": "us-east-1"
	                }
	            }
	        }
	    }
	}

Install:

	./install.sh

Activate:

    source bin/activate.sh

Provision instance and deploy services:

    pio deploy


License
=======

Copyright 2014 Christoph Dorn

License: MIT

