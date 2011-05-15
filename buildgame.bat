@echo off
echo #Facestrike html5 client
echo #Win - BUILD
echo #creating build tree
IF NOT EXIST build mkdir build
IF NOT EXIST build\js mkdir build\js
echo ## compressing main src files ##
IF EXIST temp.js del temp.js
for /f %%f in ( 'dir /b src\js\*.js' ) do type src\js\%%f >> temp.js
java -jar tools\yuicompressor\yuicompressor-2.4.2.jar temp.js > build\js\game.js
echo ## exporting assets ##
xcopy assets build\assets /s /i /Y
echo # copying main html files ##
copy src\html\*.html build\.