const { readdirSync, existsSync, statSync, writeFileSync } = require('fs')
const { resolve, join } = require('path')
const chalk = require('chalk')

const MAX_LEVEL = 999
const PATH = '/src/pages'
const WRITE_PATH = '/src/routes/meta.ts'
const EXCLUDE_PATH = ['components', 'copy']
const PREFIX = ''
const ANNOTATION = '// 这个文件是生成的，请不要手动修改'
const ENTRYPATH = ['index.tsx', 'index.nl.tsx']


function log(str = '', fn) {
    console.info(fn(`[${new Date().toTimeString().replace(/\s.*/,'')}] ${str}`));
}
function doit() {
    const targetPath = join(__dirname, '..', PATH)
    if (!existsSync(targetPath)) return
    const rawData = []
    function finds(dir = '', parentPath = []) {
        const dirs = readdirSync(dir)

        dirs.forEach(dirEntry => {
            const _path = resolve(dir, dirEntry)
            const structStat = statSync(_path)
            if (!structStat) return

            if (structStat.isDirectory()) {
                if (dirEntry.startsWith('.') || EXCLUDE_PATH.includes(dirEntry)) return

                finds(_path, parentPath.concat(dirEntry))
            } else {
                ENTRYPATH.includes(dirEntry) && rawData.push([...parentPath, dirEntry])
            }
        })
    }
    finds(targetPath, [PREFIX])
    const data = rawData
        .filter(_ => _.length < MAX_LEVEL)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(_ => _.join('/').toLocaleLowerCase())
        .filter(routePath => !!routePath)
    writeMeta(data)
    log('路由信息生成✅', chalk.green)
}

function template(str = '') {
    return `
${ANNOTATION}

export default ${str}
`
}

function writeMeta(data = []) {
    const targetPath = join(__dirname, '..', WRITE_PATH)
    const buf = template(JSON.stringify(data, null, 2)).replace(/"/g, `'`)
    writeFileSync(targetPath, buf)
}

doit()