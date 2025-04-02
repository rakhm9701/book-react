#!/bin/bash

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm i  yarn -g
yarn global add serve
yarn
yarn run build
pm2 start "yarn run start:prod"  --name=BOOKSAW-REACT
pm2 stop BOOKSAW-REACT # Agar allaqachon ishga tushirilgan bo'lsa
pm2 start "serve -s build -l 1004 --single" --name=BOOKSAW-REACT




