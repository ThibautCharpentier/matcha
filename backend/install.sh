#!/bin/sh

if ! command -v node; then
    echo "Install Node.js and try again."
    exit 1
fi

if ! command -v npm; then
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

rm -rf node_modules package-lock.json package.json babel.config.json
npm init -y

while IFS= read -r package; do
    npm install "$package"
done < requirements.txt

cat << EOL > babel.config.json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
EOL

NEW_SCRIPTS='"build": "babel src --out-dir dist",
    "start": "node dist/app.js"'

jq ".scripts += { $NEW_SCRIPTS }" package.json > temp.json && mv temp.json package.json

echo "Successfull"
