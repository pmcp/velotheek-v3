const { GoogleSpreadsheet } = require('google-spreadsheet')



module.exports = {
  getSheet: async (sheetId) => {
    // Get doc based on id
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET)

    // Auth using service account (GOOGLE_SERVICE_ACCOUNT_EMAIL should be added to "share" in google sheets )
    // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })

    await doc.loadInfo() // loads document properties and worksheets

    let sheet;
    if(isNaN(sheetId)){
      sheet = await doc.sheetsByTitle[sheetId]
    } else {
      sheet = await doc.sheetsByIndex[sheetId]
    }
    return sheet
    
  },
  getRows: async (sheet) => {
    console.log('here', sheet)
    const rows = await sheet.getRows() // can pass in { limit, offset }
    return rows.map((row, i) => {
      let temp = {}
      sheet.headerValues.map(header => {
        temp[header] = row[header]
      })
      temp.rowId = i
      return temp
    })
  },
  getRow: async rowId => {
    const rows = await sheet.getRows()
    const row = { ...rows[rowId], rowId: rowId }
    return rows[rowId]
  },
  addRow: async (sheet, data) => {
    // data = { ...data}
    const addedRow = await sheet.addRow(data)
    return addedRow 
  },
  addRows: async (sheet, data) => {
    const addedRow = await sheet.addRows(data)
    return addedRow 
  },
  updateRow: async data => {
    const rows = await sheet.getRows()
    const { rowId, ...objectForUpdate } = data
    const selectedRow = rows[rowId]
    Object.entries(data).forEach(([k, v]) => {
      selectedRow[k] = v
    })
    await selectedRow.save()
    return
  },
  deleteRow: async (sheet, rowId) => {
    const rows = await sheet.getRows()
    await rows[rowId].delete()
    return `removed row with id ${rowId}`
  }
}

/*
 * utils
 */
function serializeRow(row) {
  let temp = {}
  return temp
}
