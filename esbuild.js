const esbuild = require("esbuild");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
    name: 'esbuild-problem-matcher',

    setup(build) {
        build.onStart(() => {
            console.log('[watch] build started');
        });
        build.onEnd((result) => {
            if (result.errors.length > 0) {
                result.errors.forEach(({ text, location }) => {
                    console.error(`✘ [ERROR] ${text}`);
                    console.error(`    ${location.file}:${location.line}:${location.column}:`);
                });
            } else {
                console.log('[watch] build finished');
            }
        });
    },
};

async function main() {
    const ctx = await esbuild.context({
        entryPoints: ['src/extension.ts'],
        bundle: true,
        external: ['vscode'],
        format: 'cjs',
        platform: 'node',
        target: 'node12',
        outfile: 'dist/extension.js',
        sourcemap: !production,
        sourcesContent: !production,
        minify: production,
        logLevel: 'info',
        plugins: [esbuildProblemMatcherPlugin],
    });

    if (watch) {
        await ctx.watch();
    } else {
        await ctx.rebuild();
        await ctx.dispose();
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});