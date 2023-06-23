// todo: add common aliases as ModuleCommon => BlogCommon, TaxonomyCommon
// https://github.com/vitejs/vite/issues/5310
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { log } from 'console'
const path = require(`path`)
fs = require('fs')
const glob = require('glob');

const aliases = {
    'App': 'src/Base/Exports',
    'Browse': 'src/Components/Browse/Exports',
    'Contexts': 'src/Contexts/Exports',
    'Dashboard': 'src/Components/Dashboard/Exports',
    'Form': 'src/Components/Form/Exports',
    'Hooks': 'src/Hooks/Exports',
    'List': 'src/Components/List/Exports',
    'NewForm':'src/Components/NewForm/Exports',
    'Page': 'src/Components/Page/Exports',
    'Panel': 'src/Panel/Exports',
    'Tab': 'src/Components/Tab/Exports',
    'Tree': 'src/Components/Tree/Exports',
}

const modules = [];
const modulesPath = [];

try {
    const dirs = fs.readdirSync(path.resolve(__dirname, 'src'))
    console.log(dirs)
    const baseDirs = ['Base', 'Components', 'Contexts', 'Hooks', 'Panel']
    dirs.forEach(dir => {
        if (baseDirs.indexOf(dir) > -1) {
            return;
        }
        if (dir === '.git' || dir === 'favicons' || dir === 'Branding') {
            return;
        }
        if (!fs.lstatSync(path.resolve(__dirname, 'src', dir)).isDirectory()) {
            return;
        }
        const moduleBaseDirectory = path.resolve(__dirname, 'src', dir)
        const searchPath = moduleBaseDirectory + '/**/Exports.jsx'
        const exportsFiles = glob.sync(searchPath)
        {
            if (exportsFiles.length > 0) {
                modules.push(dir)
                const aliasPath = `src${exportsFiles[0].split('src')[1].replace('.jsx', '')}`
                modulesPath.push(aliasPath);
                aliases[dir] = aliasPath
            }
            else {
                console.error(`${dir} does not have Exports.jsx`)
            }
        }
    })
} catch (error) {
    console.log(error)
}

try {
    let content = ""
    modulesPath.forEach(modulePath => {
        const name = modulePath.split('/')[1]
        const path = modulePath.split('src')[1]
        content += `
import * as ${name} from '.${path}'
export { ${name} }
        `
    })
    fs.writeFileSync('./src/Modules.jsx', content);
    aliases['Modules'] = 'src/Modules.jsx'
} catch (err) {
    console.error(err);
}

const orderedAliases = Object.keys(aliases).sort().reduce(
    (obj, key) => {
        obj[key] = aliases[key];
        return obj;
    },
    {}
);

console.log(orderedAliases)
console.log(modules)

const resolvedAliases = Object.fromEntries(
    Object.entries(orderedAliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.')

    console.log(env)

    const htmlPlugin = () => {
        return {
            name: "html-transform",
            transformIndexHtml(html) {
                return html.replace(/%(.*?)%/g, function (match, p1) {
                    return env[p1]
                })
            },
        }
    }

    return {
        resolve: {
            alias: resolvedAliases,
            preserveSymlinks: true
        },
        plugins: [react(), htmlPlugin(), svgr()],
        server: {
            host: '0.0.0.0',
            hmr: {
                clientPort: 443
            }
        },
    }
})
