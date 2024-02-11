// function serve() {

// }

// @ts-ignore
import fs from 'node:fs';

interface Config {
    entryFile: string
}

function readDefaultConfig(): Config {
    const config = fs.readFileSync('toy-angular.json', 'utf-8');
    return JSON.parse(config);
}

function findConfigByPath(path: string): Config {
    const config = fs.readFileSync(path, 'utf-8');
    return JSON.parse(config);
}

export function build(pathToConfig?: string) {
    console.log('Building...');
    let config;
    if (pathToConfig) {
        config = findConfigByPath(pathToConfig);
    } else {
        config = readDefaultConfig();
    }

    console.log('entry file:', config.entryFile);

    // fs.
    // PRE-PROCESS
    // find the entry file from the config.
    // get all the dependencies of the entry file. Use ts compiler for that.
    // in all the dependencies with the @Component decorator, extract the template string using ts-morph.
    // parse the template string into a procedural step by step buildComponent function. add this buildComponent function into the build.
    //
    // BUILD & BUNDLE
    // using esbuild compile the whole project starting with the entry file. 
    // inject the compiled js file as a script tag to the index file provided in the config.json
    //
    // SERVE
    // serve the index.html using dev-server.
}