rd yy-orderPlatdorm /S /Q
md yy-orderPlatdorm
pushd yy-orderPlatdorm
md bin
md lib
md config

copy ..\..\..\thirdpart\thirdparty\dubbo\*.* bin\
copy ..\..\..\thirdpart\thirdparty\log4j\*.* bin\
copy ..\..\..\thirdpart\thirdparty\mybatis\*.* bin\
copy ..\..\..\thirdpart\thirdparty\spring\*.* bin\
copy ..\..\..\thirdpart\thirdparty\ssm\*.* bin\
copy ..\..\..\thirdpart\thirdparty\druid\*.* bin\
copy ..\..\..\thirdpart\thirdparty\mysql\*.* bin\
copy ..\..\..\thirdpart\yt-sm-data\yt-data.jar bin\
copy ..\..\..\thirdpart\ptResponse\yt-utility.jar bin\

copy ..\..\library\yy-orderPlatform-data.jar lib\
copy ..\..\..\thirdpart\thirdparty\mybatis-spring\*.* lib\
copy ..\..\..\thirdpart\thirdparty\jose4j\*.* lib\

copy ..\..\yy-orderPlatform-data\config\*.* config\
copy ..\startup-data.bat startup.bat
popd