#!/bin/bash

# TODO: Relocate into helper module.
# @credit http://stackoverflow.com/a/246128/330439
SOURCE="${BASH_SOURCE[0]:-$0}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
BASE_PATH="$( cd -P "$( dirname "$SOURCE" )" && pwd )"



# TODO: Relocate this into dedicated service.
echo "[pio] Switching environment ..."
# TODO: Make all this configurable


ulimit -Sn 8192


if hash node 2>/dev/null; then
	echo "" > /dev/null
else
	# @see https://github.com/creationix/nvm
	. $HOME/.profile
	if hash nvm 2>/dev/null; then
		echo "nvm: $(which nvm) ($(nvm --version))"
	else
		# TODO: Ask user before installing nvm.
		echo "Installing nvm ..."
		curl https://raw.githubusercontent.com/creationix/nvm/v0.6.1/install.sh | sh
	fi
	. $HOME/.profile
	nvm use 0.10
fi
echo "node: $(which node) ($(node -v))"
echo "npm: $(which npm) ($(npm -v))"



# @see http://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html
# @see http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x329.html
PS1="\[\033[1;34m\]\[\033[47m\](OS)\[\033[0m\] \[\033[1;35m\]$(basename $(dirname $BASE_PATH))\[\033[0m\] \[\033[33m\]\u\[\033[1;33m\]$\[\033[0m\] "



if [ ! -d "node_modules" ]; then
	echo ""
	echo "ACTION: Run 'bin/install.sh' next!"
	echo ""
else
	bin/pio-ensure-credentials
fi

if [ -f "$BASE_PATH/../../$(basename $(dirname $BASE_PATH)).activate.sh" ]; then
	. $BASE_PATH/../../$(basename $(dirname $BASE_PATH)).activate.sh
fi


# Activate Mozilla specific components

cd $BASE_PATH/../services/lib/mozilla.addon-sdk

source bin/activate

cd $BASE_PATH/..


export PATH=$BASE_PATH:$BASE_PATH/../node_modules/.bin:$PATH
export JETPACK_ROOT=$BASE_PATH/../services/lib/mozilla.addon-sdk

alias run="$BASE_PATH/../services/tools/tools.cli.dev/run-firebug-next.sh"
alias profile="$BASE_PATH/../services/tools/tools.cli.dev/profile.sh"

