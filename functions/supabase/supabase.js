
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
// required env vars
if (!process.env.SUPABASE_API) throw new Error('no SUPABASE_API env var set')
if (!process.env.SUPABASE_URL) throw new Error('no SUPABASE_URL env var set')



const { createClient } = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API)


module.exports = {
  addRow: async (table ) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        { note: 'I need to not forget this 1' },
        { note: 'I need totoooo' }
      ]);
  },
  getRows: async (table) => {
    let { data, error } = await supabase
      .from(table)
      .select('*')

    // TODO: error mgmt (error is null, unless there is an error)
    return data;
  },
}