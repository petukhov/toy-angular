# Toy Angular

A simple re-implementation of Angular. The goal is to be able to implement a TODO app using this toy framework.

## Basic flow
    - PRE-PROCESS
        - find the entry file from the config.
        - get all the dependencies of the entry file. Use ts compiler for that.
        - in all the dependencies with the @Component decorator, extract the template string using ts-morph.
        - parse the template string into a procedural step by step buildComponent function. add this buildComponent function into the build.

    - BUILD & BUNDLE
        - using esbuild compile the whole project starting with the entry file.
        - inject the compiled js file as a script tag to the index file provided in the config.json.

    - SERVE
        - serve the index.html using dev-server.


## Installation

TODO

## Usage

TODO
