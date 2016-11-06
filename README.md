# Nodestagram 

The Project Requirements for this are apply CRUD actions through code to Instagram. The end goal is to be able to do anything instagram allows from in app to desktop / browser. Developer beware, this is using an undocumented private API. 

## Issue and Project Tracking

Github Issues: [https://github.com/linkwaylive/nodestagram/issues](https://github.com/linkwaylive/nodestagram/issues)

## Docs

Github Pages: [https://linkwaylive.github.io/nodestagram/index.html](https://linkwaylive.github.io/nodestagram/index.html)

## Prerequisites

Make sure you have [git](http://git-scm.com/) installed. For mac users here is a helpful link installing git with the xcode command line tools: [http://stackoverflow.com/questions/9329243/xcode-4-4-and-later-install-command-line-tools](http://stackoverflow.com/questions/9329243/xcode-4-4-and-later-install-command-line-tools).

Git can be installed by running:

    xcode-select --install

After you have git installed, make sure to configure it. Instructions can be found here: [Git Setup](http://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).

It is recommended to install node using [nvm](https://github.com/creationix/nvm).

    cd ~
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

Add the following lines to your .bash_profile / .profile:

    export NVM_DIR="/Users/<username>/.nvm" # Replace <username> with your user
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

After modifying your .bash_profile / .bashrc make sure you source it:

    source ~/.bash_profile

Install node version v6.9.1 or later:

    nvm install v6.9.1

Npm version 3.10.8 or later is required.

    npm i npm@3.10.8 -g

After you have nvm/node installed properly run the following commands for the version you want:

    nvm alias default v6.9.1 # if you don't want to alias default: nvm use v5.6.0
    
To run the tests:

Rename the credentials-example.json to credentials.json and and update it with new information. Update the integration test to use either a url or local file.

```npm test```
```npm unit-test```
```npm integration-test```

Also short aliases:

## Project Installation

    git clone git@github.com:fastcompany/node-desktop-instagram.git
    cd node-desktop-instagram && npm install

### Debugging

Debugging can be done with [Chrome Canary and Node 6](https://blog.hospodarets.com/nodejs-debugging-in-chrome-devtools) or  [node-inspector](https://www.npmjs.com/package/node-inspector) or [webstorm](https://www.jetbrains.com/webstorm/help/running-and-debugging-node-js.html).

### Contributing

Any new contributions should be accompanied by tests, pass npm test, and abide to code quality standards before being merged into development.

Make a branch off of master, name it descriptively. For example master-feature-name. On your branch make sure to `git pull --rebase origin master` often to keep it up to date. After you make your commits make a pull request into master. After your pull request is reviewed merge it in. Note anyone who makes a pr to this project will be added as an owner.
