#!/bin/sh

if [ ! -f requirements.txt ]; then
    echo "requirements.txt does not exist"
    exit 1
fi

npm install

while IFS= read -r package; do
    npm install "$package"
done < requirements.txt

echo "Successfull"
