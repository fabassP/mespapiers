import { FILES_DOCTYPE } from './files'
import { CONTACTS_DOCTYPE } from './contacts'

// the documents schema, necessary for CozyClient
export default {
  files: {
    doctype: FILES_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  contacts: {
    doctype: CONTACTS_DOCTYPE,
    attributes: {},
    relationships: {}
  }
}

// export all doctypes for the application
export * from './files'
export * from './contacts'
