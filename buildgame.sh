#!/bin/bash
echo "#facestrike"
echo "#LINUX - BUILD"
echo "# creating build tree"
if [ ! -d "build" ]; then
   mkdir build
fi
if [ ! -d "build/js" ]; then
   mkdir build/js
fi
echo "## compressing main src files ##"
echo "//facestrike game src" > build/js/game.js
echo "" > temp.js
for file in `ls src/js/*.js`
do
   cat $file >> temp.js
done
java -jar tools/yuicompressor/yuicompressor-2.4.2.jar temp.js > build/js/game.js
rm temp.js
echo "## exporting assets ##"
cp -rf assets build/assets
echo "## copying main html files ##"
cp src/html/*.html build