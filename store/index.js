import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  moments: [
    { name: { nl: 'Voormiddag', fr: 'AVANT'}, available: true },
    { name: { nl: 'Namiddag', fr: 'APRES'}, available: true },
    { name: { nl: 'Hele dag',  fr: 'TOUTE'}, available: true }
  ],
  bookings: [],
  sessionBookings: [],
  siteInfo: {},
  locations: [],
  activeLocation: null,
  activeDate: null,
  selectedDates: [],
  activeDate: null,
})

export const mutations = {
  setSiteInfo(state, siteInfo) {
    state.siteInfo = siteInfo
  },
  setLocations(state, locations) {
    state.locations = [...locations]
  },
  setSheet(state, {id, content}) {
    state[id] = content
  },
  setActiveLocation(state, location) {
    state.activeLocation = location
  },
  setActiveDate(state, date) {
    state.activeDate = date
  },
  addToBookings(state, booking) {
    const sessionBookings = state.sessionBookings
    state.sessionBookings = [...sessionBookings, booking]
  }
}

export const actions = {
  

  async nuxtServerInit({ commit }, { $content }) {
    // Get the info from the netlify cms
    const siteInfo = await $content('site/info').fetch()
    await commit('setSiteInfo', siteInfo)
  },



  async getSheet({ state, dispatch, commit }, { spreadSheetId, sheet }) {
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({
          spreadSheetId: spreadSheetId,
          sheet
       })
      })
      const content = await resultSheet.json()
      commit('setSheet' , {id: sheet, content: content});
      return;
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
      
    }
  },
  
  setActiveDate({state, commit}, date) {
    
    
    commit('setActiveDate', date)
    
    // Filter on date in bookings
    
    
    // When bookings: set moment available = false
    
    
  },
  
  addBooking({state, commit}) {
    
    const booking = {
      date: state.activeDate,
      moment: 0
    }
    
    commit('addToBookings', booking)
  },
  
  createBookings({state, commit}) {
    // Add all bookings to sheet
    
    const body = {
      bookings: state.bookings,
      spreadSheetId: state.siteInfo.sheet,
      sheet: 'reservations'
    }
    fetch('/.netlify/functions/save-to-sheet', {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => {
      console.log('RES', res)
      
    })
    
    // If finished: add all booking to state.bookings
    
    
  },
  
  setLocation({ state, commit, dispatch }, idInSheet) {
    // Set active id
    commit('setActiveLocation', idInSheet)
    
    // get all bookings for this location
    // TODO: Might have to move this to mounted, somewhere. Maybe the layout.
    dispatch('getSheet', {spreadSheetId: state.siteInfo.sheet, sheet: 'reservations' })
  }
}

export const getters = {

  
}
