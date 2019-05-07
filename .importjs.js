module.exports = {
  importStatementFormatter({ importStatement }) {
    importStatement = importStatement.replace(/;$/, '')
    if (importStatement.endsWith("'@material-ui/core'")) {
      const imports = (importStatement.match(/\{(.*)\}/) || ['', ''])[1]
        .trim()
        .split(', ')
      const components = imports.filter(
        ([firstLetter]) => firstLetter.toUpperCase() === firstLetter
      )
      const other = imports.filter(
        ([firstLetter]) => firstLetter.toLowerCase() === firstLetter
      )
      if (components.length) {
        const componentImports = components.map(
          i => `import ${i} from '@material-ui/core/${i}'`
        )
        importStatement = componentImports.join('\n')
        if (other.length) {
          const otherImport = `import { ${other.join(
            ', '
          )} } from '@material-ui/core'`
          importStatement += `\n${otherImport}`
        }
      }
    }
    return importStatement
  },
  maxLineLength: 1000,
  environments: ['browser'],
}
