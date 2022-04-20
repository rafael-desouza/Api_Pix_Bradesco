import fs from 'fs'
import ini from 'ini'

import { server } from './server'
import { resolve } from 'path'

const iniPath = resolve(__dirname, '..', 'Sisplan.ini')
const config = ini.parse(fs.readFileSync(iniPath, 'utf-8'))

/**
 * Connecting to database and starting server
 */
server().then(app => app.listen(config.PIX.porta, () => console.log(`Server started on port ${config.PIX.porta}`)))
