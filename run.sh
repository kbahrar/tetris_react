cd client;

npm i;

npm run build;

cd ../server;

rm -rf build;

cp -rf ../client/build .;

npm i;

npm run dev;