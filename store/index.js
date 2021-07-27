import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  lang: 'nl',
  translations: null,
  bookings: [],
  sessionBookings: [],
  siteInfo: {},
  locations: [],
  activeLocationId: null,
  activeDate: null,
  activeMoment: null,
  selectedDates: [],
  activeDate: null
})

export const mutations = {
  setSiteInfo(state, siteInfo) {
    state.siteInfo = siteInfo
  },
  setTranslations(state, translations) {
    state.translations = [...translations]
  },
  setLocations(state, locations) {
    state.locations = locations
  },
  setBookings(state, bookings) {
    state.bookings = [...bookings]
  },
  setActiveLocationId(state, location) {
    state.activeLocationId = location
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


  async nuxtServerInit({ commit, dispatch }, { $content }) {
    // Get info from netlify cms
    const siteInfo = await $content('site/info').fetch()
    commit('setSiteInfo', siteInfo)
    
    await dispatch('getTranslations')
    // await dispatch('getLocations')
    const allLocations = await this.$content('locations').fetch() 
    // TODO: This solution (altho not scalable), might be too easy 
    // Can make it scalable and more cool looking with a reducer
    // But don't really have the time. Almost holiday!
    // ¯\_(ツ)_/¯ 
    // Will probably drive for three weeks through Croatia
    // ᕕ( ᐛ )ᕗ
    
    const locationsFR = allLocations.filter(l => l.slug.slice(-2) === 'fr')
    const locationsNL = allLocations.filter(l => l.slug.slice(-2) === 'nl')
    
    const locByLang = {
      fr: [...locationsFR],
      nl: [...locationsNL]
    }
    
    return commit('setLocations', locByLang)
    
  },



  async getSheet({ state, dispatch, commit }, { sheet }) {
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({ sheet: sheet})
      })
      const bookings = await resultSheet.json()
      commit('setBookings', bookings);
      return;
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'

    }
  },


  async getTranslations({ state, commit }) {
    try {
      const translations = await this.$content('site/translations').fetch()
      commit('setTranslations', translations.translations)
      return;
    } catch (err) {
      console.log('GOT AN ERROR GETTING TRANSLATIONS', err)
      throw 'Unable to fetch translations'
    }
  },

async getLocations({ state, commit }) {
  const allLocations = await this.$content('locations').fetch() 
  // TODO: This solution (altho not scalable), might be too easy 
  // Can make it scalable and more cool looking with a reducer
  // But don't really have the time. Almost holiday!
  // ¯\_(ツ)_/¯ 
  // Will probably drive for three weeks through Croatia
  // ᕕ( ᐛ )ᕗ
  console.log('allLocations', allLocations)
  const locationsFR = allLocations.filter(l => l.slug.slice(-2) === 'fr')
  const locationsNL = allLocations.filter(l => l.slug.slice(-2) === 'nl')
  
  const locByLang = {
    fr: [...locationsFR],
    nl: [...locationsNL]
  }
  console.log('gonna set locaations', locByLang)
  return commit('setLocations', locByLang)
},


  setActiveDate({ state, commit }, date) {
    commit('setActiveMoment', null)
    commit('setActiveDate', date)
  },


  
  selectMoment({ state, commit, dispatch }, moment) {
    console.log('selecting moment', moment)
    commit('setActiveMoment', moment)
    dispatch('addBookingToSelection')
  },

  addBookingToSelection({ state, commit, rootState }) {
    const moment = state.activeMoment
    const date = state.activeDate
    // find location in active location and add details for mail
    console.log('LOCATIONA', state.locations)
    const filteredLocation = state.locations[state.lang].filter(l => l.idInSheet === state.activeLocationId)
    
    
    const booking = {
      date: date,
      moment: moment,
      location: state.activeLocationId,
      language: state.lang,
      email: rootState.auth.user.email,
      name: rootState.auth.user.username
    }
    
    commit('addToBookingsSelection', booking)
    
    // After adding to selection, reset date and moment
    // commit('setActiveDate', null)
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
        dispatch('getSheet', { sheet: 'reservations' })

      // 2. Empty the bookings saved to the session
      commit('setSessionBookings', [])
      
    })
  },

  setLocation({ state, commit, dispatch }, idInSheet) {
    // Set active id
    commit('setActiveLocationId', idInSheet)

    // get all bookings for this location
    // TODO: Might have to move this to mounted, somewhere. Maybe the layout.
    dispatch('getSheet', { sheet: 'reservations' })
  },


  async toggleLang({ state, commit, dispatch }) {
    let lang = 'fr'
    if(state.lang === 'fr') { lang = 'nl' }
    return commit('setLang', lang)
  }
}

export const getters = {
  combinedBookings: state => {
    // Sometimes we want to see the created bookings + the bookings the user is creating
    return [...state.bookings, ...state.sessionBookings];
  },
  
  bookingsForActiveLocation: state => {
    if(state.activeLocationId === null) return null;
    return state.combinedBookings.filter(l => l.location === state.activeLocationId)
  },
  
  moments: (state, getters) => {
    const moments = [
      { name: { nl: 'Voormiddag', fr: 'Matin' }, descr: {nl: 'Van 8u tot 12u', fr: 'de 8h a 12h'}, available: true },
      { name: { nl: 'Namiddag', fr: 'Après midi' }, descr: {nl: 'Van 12u tot 18u', fr: 'de 12h a 18h'}, available: true },
      { name: { nl: 'Hele dag', fr: 'Toute la journée' }, descr: {nl: 'Van 9u tot 18u', fr: 'de 9h a 18h'}, available: true }
    ]
    
    if (state.activeDate === null) return moments;
    
    const datesAreOnSameDay = (first, second) => {
      return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
    }
    
    // Filter out only bookings of this day
    const filteredBookings = getters.combinedBookings.filter(function(value, index, arr) {
      return datesAreOnSameDay(new Date(value.date), new Date(state.activeDate))
    });

    console.log({filteredBookings})
    // If no bookings on this day, just return as is
    if (filteredBookings.length < 1) return moments;

    // If there are bookings that day, loop through bookings, and make moments unavailable
    for (let i = 0; i < filteredBookings.length; i++) {
      const booking = filteredBookings[i]
      moments[booking.moment].available = false;
      
    }

    return moments;

  },
  
  disabledDates: (state, getters) => {    
    // Filter out only bookings with a full day booked (moment === 2)
    const filteredBookings = getters.combinedBookings.filter(function(value, index, arr) {
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

    const bookingsForActiveLocation = state.bookings.filter(b => b.location === state.activeLocationId)

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
    return ((state.activeLocationId !== null) && (state.activeDate !== null) && (state.activeMoment !== null))
  },
  
  canSendBookingToDatabase: state => {
    return (state.sessionBookings.length > 0)
  },
  
  
  localisedLocations: state => {
    return state.locations[state.lang]
  },
  
  userBookings: (state, rootState) => {
    if(state.bookings) {
      return state.bookings.filter(b => b.email === rootState.auth.user.email )
    }
    
  },
}