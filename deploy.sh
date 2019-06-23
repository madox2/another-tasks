#!/bin/bash

echo "Deploying to ftp.poriadne.sk (websupport.sk)"

cd build

sftp madox2.poriadne.sk@ftp.poriadne.sk <<EOF
cd sub/tasks
pwd
rm static/js/*
rm static/css/*
rmdir static/js
rmdir static/css
rmdir static
rm ./*
rm .htaccess

mkdir static
mkdir static/css
mkdir static/js

put .htaccess
put *
cd static/js
put static/js/*
cd ../css
put static/css/*
ls
bye
EOF
