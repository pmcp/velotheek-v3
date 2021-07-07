const { GoogleSpreadsheet } = require('google-spreadsheet')

let sheet

module.exports = {
  getSheet: async (speadSheetId, sheetId) => {
    // Get doc based on id
    const doc = new GoogleSpreadsheet(speadSheetId)

    // Auth using service account (GOOGLE_SERVICE_ACCOUNT_EMAIL should be added to "share" in google sheets )
    // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })

    await doc.loadInfo() // loads document properties and worksheets
    // console.log(sheetId)
    if(isNaN(sheetId)){
      sheet = doc.sheetsByTitle[sheetId]
    } else {
      sheet = doc.sheetsByIndex[sheetId]
    }
    
    
  },
  getRows: async () => {
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
  addRow: async data => {
    // Add the different mailing triggers, should not be hard coded
    const triggers = {
      inschrijving: 0,
      betaling: 0,
      herinnering: 0
    }

    data = { ...data, ...triggers }
    const addedRow = await sheet.addRow(data)
    return addedRow._rowNumber - 1 // return row number (minus the header row)
  },
  updateRow: async data => {
    console.log('gonna update row')
    const rows = await sheet.getRows()
    console.log('All Rows', rows)
    const { rowId, ...objectForUpdate } = data
    console.log('Row Id', rowId)
    const selectedRow = rows[rowId]
    console.log('SelectedRow', selectedRow)
    Object.entries(data).forEach(([k, v]) => {
      selectedRow[k] = v
    })
    await selectedRow.save()
    return
  },
  deleteRow: async rowId => {
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
