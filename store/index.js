// TODO: show bookings in calendar


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
  activeMoment: null,
  selectedDates: [],
  activeDate: null,
  disabledDates: [
    {
      start: null,
      end: new Date(),
    },
    {
      weekdays: [1, 7],
    },
  ]
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
  setActiveMoment(state, moment) {
    state.activeMoment = moment
  },
  addToBookingsSelection(state, booking) {
    state.sessionBookings = [...state.sessionBookings, booking]
  },
  removeFromBookingsSelection(state, key) {
    const filteredBookings = state.sessionBookings.filter(function(value, index, arr){ 
      return index != key;
  });
    state.sessionBookings = [...filteredBookings]
  },
  
  // addToCalendarAttributes(state, {posInAttributeArray, date}){
  //   state.calSettings.attributes[posInAttributeArray].dates = [...state.calSettings.attributes[posInAttributeArray].dates, date]
  // },
  // removeFromCalendarAttributes(state, {posInAttributeArray, date}){
  //   console.log(posInAttributeArray, date)
  //   const dates = state.calSettings.attributes[posInAttributeArray].dates
  //   const key = dates.indexOf(date)
  //   const filteredDates = dates.filter(function(value, index, arr){ 
  //     return key != index;
  // });
  //   state.calSettings.attributes[posInAttributeArray].dates = [...filteredDates]
  // }
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
  
  
  selectMoment({state, commit}, moment) {
    commit('setActiveMoment', moment)
  },
  
  addBookingToSelection({state, commit}) {
    const moment = state.activeMoment
    const date = state.activeDate
    const booking = {
      date: date,
      moment: moment
    }
    commit('addToBookingsSelection', booking)
  },
  
  removeFromBookingsSelection({state, commit}, {key, booking}) {
    console.log(booking.moment)
    commit('removeFromBookingsSelection', key)    
  },
  
  createBooking
  ({state, commit}) {
    // Add all bookings to sheet
    
    if(state.sessionBookings.length === 0) {
      console.log('there are no bookings')  
      return;
    }
  
    const body = {
      bookings: state.sessionBookings,
      spreadSheetId: state.siteInfo.sheet,
      sheet: 'reservations'
    }
    fetch('/.netlify/functions/save-to-sheet', {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => {
      console.log('RES', res)
      // TODO: check if succeeded, only then add to bookings
      // 1. Add sessionBookings to bookings
      
      
      // 2. Empty sessionBookings
      

    })
    
    
    
    
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

  calAttributes: state => {
      
      const sessionBookingsByTimeslot = state.sessionBookings.reduce((acc,session) => {
        
        const sessions = acc[session.moment] || [];
        return {...acc, [session.moment]: [...sessions, session.date]}
      }, {})
      
      
      const attributes = [
        {
          highlight: {
            class: 'datePicked-before',
          },
          dates: sessionBookingsByTimeslot[0],
        },
        {
          highlight: {
            class: 'datePicked-after',
          },
          dates: sessionBookingsByTimeslot[1]
        },
        {
          highlight: {
            class: 'velo-today',
          },
          dates: new Date()
        },
        {
          highlight: {
            class: 'velo-normalDay',
          },
          dates: [
            {
              start: new Date(),
              end: null,
              weekdays: [2, 3, 4, 5, 6],
            },
          ]
        },
        {
          highlight: {
            class: 'velo-selected',
          },
          dates: []
        },
      ]
      

      return attributes;
    },
}
