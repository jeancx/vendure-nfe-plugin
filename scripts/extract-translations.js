const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const { exec } = require('child_process');

const I18N_DIR = './src/i18n';
const I18N_PATH = path.join(__dirname, '../', I18N_DIR);

extractTranslations().then(
    () => {
        process.exit(0);
    },
    error => {
        console.log(error);
        process.exit(1);
    },
);

/**
 * Extracts translation tokens into the i18n-messages files found in the i18n directory.
 */
async function extractTranslations() {
    const locales = fs.readdirSync(I18N_PATH).map(file => path.basename(file).replace('.json', ''));
    for (const locale of locales) {
        console.log(`Extracting translation tokens for "${I18N_DIR}/${locale}.json"`);

        try {
            await runExtraction(locale);
            const { tokenCount, translatedCount, percentage } = getStatsForLocale(locale);
            console.log(`${locale}: ${translatedCount} of ${tokenCount} tokens translated (${percentage}%)`);
            console.log('');
        } catch (e) {
            console.log(e);
        }
    }
}

function runExtraction(locale) {
    const args = getNgxTranslateExtractCommand(locale);
    return new Promise((resolve, reject) => {
        try {
            const child = spawn(`npmpkg`, args, { stdio: ['pipe', 'pipe', process.stderr] });
            child.on('close', x => {
                resolve();
            });
            child.on('error', err => {
                reject(err);
            });
        } catch (e) {
            reject(e);
        }
    });
}

function getStatsForLocale(locale) {
    const content = fs.readJsonSync(path.join(I18N_PATH, `${locale}.json`), 'utf-8');
    let tokenCount = 0;
    let translatedCount = 0;
    for (const section of Object.keys(content)) {
        const sectionTranslations = Object.values(content[section]);
        tokenCount += sectionTranslations.length;
        translatedCount += sectionTranslations.filter(val => val !== '').length;
    }
    const percentage = Math.round((translatedCount / tokenCount) * 100);
    return {
        tokenCount,
        translatedCount,
        percentage,
    };
}

function getNgxTranslateExtractCommand(locale) {
    return [
        `ngx-translate-extract`,
        '--input',
        './src',
        '--output',
        `${I18N_DIR}/${locale}.json`,
        `--sort`,
        `--format`,
        `namespaced-json`,
        `--format-indentation`,
        `"    "`,
        `-m`,
        `_`,
    ];
}

function getLastGitCommitHash() {
    return new Promise((resolve, reject) => {
        exec('git rev-parse HEAD', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.replace('\n', ''));
            }
        });
    });
}
