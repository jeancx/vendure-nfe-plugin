import { dest, parallel, src, watch as gulpWatch } from 'gulp';

const UI_EXTENSION_FILES = ['**/ui/**/*'];

const noop = (...args: any[]): any => {
    return;
};

function copyUiExtensionsSource() {
    return src(UI_EXTENSION_FILES, { cwd: 'src' }).pipe(dest('dist/src'));
}

function copyI18N() {
    return src(['**/i18n/*'], { cwd: 'src' }).pipe(dest('dist/src'));
}

export const build = parallel(copyUiExtensionsSource, copyI18N);

function copyToDist(filePath: string) {
    console.log('copyToDist', filePath);
    src(filePath, { cwd: 'src' }).pipe(dest('dist/src'));
}

export function watch(): Promise<undefined> {
    const watcher = gulpWatch(UI_EXTENSION_FILES, { cwd: 'src' });
    watcher.on('change', copyToDist);
    watcher.on('add', copyToDist);
    return new Promise(noop);
}
