import { bootstrap } from 'toy-angular';

console.log('main app file');

// Buld (or Serve, it doens't matter now) command:
// read the config json
// use https://ts-morph.com/setup/ast-viewers (or similar) to parse the source code and replace the @Component decorator with the template and styles inlined.
// replace the template with the compiled version of the template OR just implement the compile function
// using esbuild compile the whole project starting with the source "main" points to
// inject the compiled js as a script tag to the index file provided in the config.json
// serve the index.html using dev-server.
// compile the html template.

// Parse and compile the html templates:

bootstrap();

