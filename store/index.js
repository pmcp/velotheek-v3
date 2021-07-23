// TODO: show bookings in calendar


import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  lang: 'nl',
  bookings: [],
  sessionBookings: [],
  siteInfo: {},
  locations: [],
  activeLocation: null,
  activeDate: null,
  activeMoment: null,
  selectedDates: [],
  activeDate: null
})

export const mutations = {
  setSiteInfo(state, siteInfo) {
    state.siteInfo = siteInfo
  },
  setLocations(state, locations) {
    state.locations = [...locations]
  },
  setBookings(state, bookings) {
    state.bookings = [...bookings]
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
  setLang(state, lang) {
    state.lang = lang
  },
  setSessionBookings(state, val) {
    state.sessionBookings = [...val]
  },
  removeFromBookingsSelection(state, key) {
    const filteredBookings = state.sessionBookings.filter(function(value, index, arr) {
      return index != key;
    });
    state.sessionBookings = [...filteredBookings]
  },
}

export const actions = {  


  async nuxtServerInit({ commit }, { $content }) {
    // Get the info from the netlify cms
    const siteInfo = await $content('site/info').fetch()
    await commit('setSiteInfo', siteInfo)
    
    // TODO: Split up different languages
    const locations = await $content('locations').fetch()
    console.log(locations)
    await commit('setLocations', locations)
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
      const bookings = await resultSheet.json()

      commit('setBookings', bookings);
      return;
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'

    }
  },

  setActiveDate({ state, commit }, date) {

    // reset activeMoment
    commit('setActiveMoment', null)

    commit('setActiveDate', date)

    // Filter on date in bookings


    // When bookings: set moment available = false


  },


  selectMoment({ state, commit }, moment) {
    commit('setActiveMoment', moment)
  },

  addBookingToSelection({ state, commit }) {
    const moment = state.activeMoment
    const date = state.activeDate
    // find location in active location and add details for mail
    
    const filteredLocation = state.locations.filter(l => l.idInSheet === state.activeLocation)
    
    // TODO: Add address and all coming from netlify cms db
    
    const booking = {
      date: state.activeDate,
      moment: state.activeMoment,
      location: state.activeLocation
    }
    commit('addToBookingsSelection', booking)
    
    // After adding to selection, reset date and moment
    commit('setActiveDate', null)
    commit('setActiveMoment', null)
    
  },

  removeFromBookingsSelection({ state, commit }, { key, booking }) {
    console.log(booking.moment)
    commit('removeFromBookingsSelection', key)
  },

  createBooking({ state, commit, dispatch }) {
    // Add all bookings to sheet

    if (state.sessionBookings.length === 0) {
      console.log('there are no bookings')
      return;
    }

    const body = {
      bookings: state.sessionBookings,
      spreadSheetId: state.siteInfo.sheet,
      sheet: 'reservations'
    }
    
    // Send to netlify function
    fetch('/.netlify/functions/save-to-sheet', {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => {
      console.log('RES', res)
      // TODO: check if succeeded, only then add to bookings
      
      // 1. Reload the bookings from the db
        dispatch('getSheet', { spreadSheetId: state.siteInfo.sheet, sheet: 'reservations' })

      // 2. Empty the bookings saved to the session
      commit('setSessionBookings', [])
      
    })
  },

  setLocation({ state, commit, dispatch }, idInSheet) {
    // Set active id

    commit('setActiveLocation', idInSheet)

    // get all bookings for this location
    // TODO: Might have to move this to mounted, somewhere. Maybe the layout.
    dispatch('getSheet', { spreadSheetId: state.siteInfo.sheet, sheet: 'reservations' })
  },


  toggleLang({ state, commit, dispatch }) {


    if (state.lang === 'nl') return commit('setLang', 'fr')
    if (state.lang === 'fr') return commit('setLang', 'nl')

    // get all bookings for this location
    // TODO: Might have to move this to mounted, somewhere. Maybe the layout.
    dispatch('getSheet', { spreadSheetId: state.siteInfo.sheet, sheet: 'reservations' })
  }
}

export const getters = {
  moments: state => {
    const moments = [
      { name: { nl: 'Voormiddag', fr: 'Matin' }, available: true },
      { name: { nl: 'Namiddag', fr: 'Après midi' }, available: true },
      { name: { nl: 'Hele dag', fr: 'Toute la journée' }, available: true }
    ]

    if (state.activeDate === null) return moments;

    const datesAreOnSameDay = (first, second) => {
      return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
    }
    
    // Filter out only bookings of this day
    const filteredBookings = state.bookings.filter(function(value, index, arr) {
      return datesAreOnSameDay(new Date(value.date), new Date(state.activeDate))
    });


    // If no bookings on this day, just return as is
    if (filteredBookings.length < 1) return moments;

    // If there are bookings that day, loop through bookings, and make moments unavailable
    for (let i = 0; i < filteredBookings.length; i++) {
      const booking = filteredBookings[i]
      moments[booking.moment].available = false;
      
    }

    return moments;

  },

  disabledDates: state => {
    // Filter out only bookings with a full day booked (moment === 2)
    const filteredBookings = state.bookings.filter(function(value, index, arr) {
      return value.moment === "2"
    });
    
    // Create an array with only the dates
    const onlyDates = filteredBookings.map(b => b.date)
    
    // Add dates to disabled dates
    return [{
        start: null,
        end: new Date()
      },
      {
        weekdays: [1, 7],
      },
      ...onlyDates
    ]

  },



  calAttributes: state => {

    const sessionBookingsByTimeslot = state.sessionBookings.reduce((acc, session) => {

      const sessions = acc[session.moment] || [];
      return { ...acc, [session.moment]: [...sessions, session.date] }
    }, {})

    const bookingsForActiveLocation = state.bookings.filter(b => b.location === state.activeLocation)

    console.log(bookingsForActiveLocation)

    const bookingsByTimeslot = bookingsForActiveLocation.reduce((acc, session) => {

      const sessions = acc[session.moment] || [];
      return { ...acc, [session.moment]: [...sessions, session.date] }
    }, {})


    const attributes = [
      {
        highlight: {
          class: 'datePicked-before',
        },
        dates: bookingsByTimeslot[0],
      },
      {
        highlight: {
          class: 'datePicked-after',
        },
        dates: bookingsByTimeslot[1]
      },
      {
        highlight: {
          class: 'datePicked-full',
        },
        dates: bookingsByTimeslot[2],
      },
      {
        highlight: {
          class: 'datePicked-before-session',
        },
        dates: sessionBookingsByTimeslot[0],
      },
      {
        highlight: {
          class: 'datePicked-after-session',
        },
        dates: sessionBookingsByTimeslot[1]
      },
      {
        highlight: {
          class: 'datePicked-full-session',
        },
        dates: sessionBookingsByTimeslot[2],
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
        dates: [{
          start: new Date(),
          end: null,
          weekdays: [2, 3, 4, 5, 6],
        }, ]
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

  
  canAddBookingToSession: state => {
      
    return ((state.activeLocation !== null) && (state.activeDate !== null) && (state.activeMoment !== null))
  },
  
  canSendBookingToDatabase: state => {
    return (state.sessionBookings.length > 0)
  }
}