echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Reinstalling dependencies..."
npm install

echo "Done!"
