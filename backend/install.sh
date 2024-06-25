#!/bin/sh

if ! command -v node &> /dev/null; then
    echo "Install Node.js and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Install npm and try again."
    exit 1
fi

REQUIRED_NPM_VERSION="10.8.1"
CURRENT_NPM_VERSION=$(npm -v)

if [ "$CURRENT_NPM_VERSION" != "$REQUIRED_NPM_VERSION" ]; then
    echo "npm version is not $REQUIRED_NPM_VERSION. Update npm..."
    npm install -g npm@$REQUIRED_NPM_VERSION
fi

if [ ! -f requirements.txt ]; then
    echo "requirements.txt does not exist"
    exit 1
fi

rm -rf node_modules package-lock.json package.json
npm init -y

while IFS= read -r package; do
    npm install "$package"
done < requirements.txt

echo "Successfull"
