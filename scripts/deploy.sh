#!/usr/bin/env bash

# Push built files to gh-pages
cd public
cp -r ../.git .
git fetch origin
git reset --soft origin/gh-pages
git add -A
git commit -am "Automated deploy $(date)" --allow-empty
git checkout -b gh-pages
git push origin gh-pages
rm -rf .git
