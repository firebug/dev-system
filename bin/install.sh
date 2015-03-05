#!/bin/bash

# @credit http://stackoverflow.com/a/246128/330439
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
BASE_PATH="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

BASE_PATH="$( dirname "$BASE_PATH" )"
cd $BASE_PATH



. $BASE_PATH/bin/activate.sh



# Only initialize once in the beginning.
if [ ! -d "node_modules" ]; then
	git submodule update --init --recursive --rebase
fi



npm install

mkdir -p bin || true
rm bin/smi || true
ln -s ../node_modules/.bin/smi bin/smi



# For dev when working on `smi` tooling.
if [ -d "/genesis/os.inception" ]; then
	rm -Rf node_modules/smi.cli
	ln -s /genesis/os.inception/services/0-sm/smi.cli node_modules/smi.cli
elif [ -d "/genesis/devcomp" ]; then
	rm -Rf node_modules/smi.cli
	ln -s /genesis/devcomp/_upstream/os-inception/smi.cli/source node_modules/smi.cli
fi



bin/smi install

rm bin/pio-ensure-credentials || true
ln -s ../_upstream/os-inception/pio.cli/source/pio-ensure-credentials.sh bin/pio-ensure-credentials
chmod u+x bin/pio-ensure-credentials

rm bin/pio || true
ln -s ../_upstream/os-inception/pio.cli/source/pio.sh bin/pio
chmod u+x bin/pio

rm -Rf node_modules/smi.cli
ln -s ../_upstream/os-inception/smi.cli/source node_modules/smi.cli

rm bin/jpm || true
ln -s ../services/tools/jpm/bin/jpm bin/jpm
chmod u+x bin/jpm


echo ""
echo "ACTION: Now run 'source bin/activate.sh' next!"
echo ""
