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


cd $BASE_PATH/../../projects/firebug.next

cfx run \
  -o \
  --no-strip-xpi
#  -b C:/mozilla-dev/firefox/firefox-nightly/firefox.exe
#  --profiledir C:/Users/Honza/AppData/Roaming/Mozilla/Firefox/Profiles/ceg3h0r0.nightlyJSD2001

