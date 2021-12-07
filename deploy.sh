#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# add .nojekyll to bypass GitHub Page's default behavior
touch .nojekyll

# Make a copy of index.html to handle GH-Pages weirdness
cp index.html 404.html
find . -name ".DS_Store" -delete

# if you are deploying to a custom domain
# echo 'www.frederic-fox.com' > CNAME

git init
git remote add origin https://github.com/dev-fredericfox/pinky.git
git add -A
git commit -m 'deploy'
git branch gh-pages
git checkout gh-pages
git push origin gh-pages -f

cd -