declare module 'html-pdf-node' {
  interface Options {
    format?: 'A3' | 'A4' | 'A5' | 'Legal' | 'Letter' | 'Tabloid'
    margin?: {
      top?: string | number
      right?: string | number
      bottom?: string | number
      left?: string | number
    }
    printBackground?: boolean
    path?: string
  }

  interface File {
    url?: string
    content?: string
  }

  function generatePdf(file: File, options: Options): Promise<Buffer>

  export default {
    generatePdf
  }
}