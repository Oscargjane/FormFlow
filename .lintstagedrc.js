// Se importa 'path' para trabajar con rutas
const path = require('path')

// Función para construir comando de linting
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    // Se convierte los nombres de archivos a rutas relativas
    .map((f) => path.relative(process.cwd(), f))
    // Se unen las rutas con ' --file '
    .join(' --file ')}`

// Se exporta la configuración de 'lint-staged'
// El patrón de glob coincide con archivos .js, .jsx, .ts, .tsx
// 'buildEslintCommand' se ejecuta en cada archivo que coincide
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}