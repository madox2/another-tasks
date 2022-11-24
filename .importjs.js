module.exports = {
  importStatementFormatter({ importStatement }) {
    importStatement = importStatement.replace(/;$/, '')
    return importStatement
  },
  maxLineLength: 1000,
  environments: ['browser'],
  namedExports: {
    react: ['useState', 'useEffect', 'useRef', 'useCallback', 'useContext'],
    'react-router-dom': ['useNavigate', 'useParams'],
  },
}
