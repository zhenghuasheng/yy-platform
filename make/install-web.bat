rd yy-web /S /Q
md yy-web
pushd yy-web
md bin
md lib
md jetty-config
md web


copy ..\..\..\thirdpart\thirdparty\dubbo\*.* bin\
copy ..\..\..\thirdpart\thirdparty\fastjson\*.* bin\
copy ..\..\..\thirdpart\thirdparty\log4j\*.* bin\
copy ..\..\..\thirdpart\thirdparty\spring\*.* bin\
copy ..\..\..\thirdpart\thirdparty\spring-mvc\*.* bin\
copy ..\..\..\thirdpart\ptResponse\yt-utility.jar bin\
copy ..\..\library\yy-orderPlatform-data.jar lib\
copy ..\..\library\yy-web-backend.jar lib\
copy ..\..\..\thirdpart\jetty-start\yt-dc-api.jar bin\

xcopy ..\..\yy-web-backend\jetty-config\*.* jetty-config\ /s
xcopy ..\..\yy-web-backend\jetty-config\*.* spring-config\ /s
xcopy ..\..\yy-web-backend\web\*.* web\ /s
copy ..\startup-web.bat startup.bat
popd