// @ts-ignore
import fs from 'node:fs';
import tsc, { CompilerOptions, createSourceFile } from 'typescript';
import * as esbuild from 'esbuild';
import open from 'open';

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

export async function build(pathToConfig?: string) {
    console.log('Building...');

    const currDir = process.cwd();

    let config;
    if (pathToConfig) {
        config = findConfigByPath(pathToConfig);
    } else {
        config = readDefaultConfig();
    }

    console.log('entry file:', config.entryFile);
    // use ts compiler to get all the dependencies of the entry file.
    const opts: CompilerOptions = {
        target: tsc.ScriptTarget.ES5,
        module: tsc.ModuleKind.CommonJS,
    };

    let ctx = await esbuild.context({
        entryPoints: [config.entryFile],
        outdir: 'www/js',
        bundle: true,
      })

    await ctx.watch();

    let { host, port } = await ctx.serve({
        servedir: 'www',
    });

    await open(`http://${host}:${port}`, { app: { name: 'google chrome' } });
}