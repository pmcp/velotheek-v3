import { format } from 'date-fns'
import VueFormulate from '@braid/vue-formulate'

export const state = () => ({
  lang: 'fr',
  // TODO: Move this to admin, and pull in on generate
  //  Remark: If I change this here (import from admin), then also change in email functions
  moments: [
    { name: { nl: 'Voormiddag', fr: 'Matin' }, descr: { nl: 'Van 8u30 tot 12u30', fr: 'de 8h30 a 12h30' }, available: true },
    {
      name: { nl: 'Namiddag', fr: 'Après midi' },
      descr: { nl: 'Van 12u30 tot 16u30', fr: 'de 12h30 a 16h30' },
      available: true,
    },
    {
      name: { nl: 'Hele dag', fr: 'Toute la journée' },
      descr: { nl: 'Van 8u30 tot 16u30', fr: 'de 8h30 a 16h30' },
      available: true,
    },
  ],
  grades: [
    { name: { nl: 'Eerste Leerjaar', fr: 'Première primaire' } },
    { name: { nl: 'Tweede Leerjaar', fr: 'Deuxième primaire' } },
    { name: { nl: 'Derde Leerjaar', fr: 'Troisième primaire' } },
    { name: { nl: 'Vierde Leerjaar', fr: 'Quatrième primaire' } },
    { name: { nl: 'Vijfde Leerjaar', fr: 'Cinquième primaire' } },
    { name: { nl: 'Zesde Leerjaar', fr: 'Sixième primaire' } },
    { name: { nl: 'Eerste Middelbaar', fr: 'Première secondaire' } },
    { name: { nl: 'Tweede Middelbaar', fr: 'Deuxième secondaire' } },
    { name: { nl: 'Derde Middelbaar', fr: 'Troisième secondaire' } },
    { name: { nl: 'Vierde Middelbaar', fr: 'Quatrième secondaire' } },
    { name: { nl: 'Vijfde Middelbaar', fr: 'Cinquième secondaire' } },
    { name: { nl: 'Zesde Middelbaar', fr: 'Sixième secondaire' } },
    { name: { nl: 'Volwassenen', fr: 'Adultes' } },
  ],
  translations: null,
  activeGrade: null,
  bookings: [],
  unavailable: [],
  sessionBookings: [],
  siteInfo: {},
  locations: [],
  activeLocationId: null,
  activeDate: null,
  activeMoment: null,
  selectedDates: [],
  activeStatus: 0,
  status: [
    { description: 'all good', translationId: 8 },
    { description: 'sending', translationId: 9 },
    { description: 'send', translationId: 10 },
  ],
  animationStyles: [
    {
      description: 'simple fade',
      enterActiveClass: 'duration-200 ease-out',
      enterClass: '-translate-x-full opacity-0',
      enterToClass: 'translate-x-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: 'translate-x-0 opacity-100',
      leaveToClass: '-translate-x-full opacity-0',
    },
    {
      description: 'slide up',
      enterClass: 'transform translate-y-full opacity-0',
      enterActiveClass: 'duration-200 ease-out',
      enterToClass: 'translate-y-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: ' translate-y-0 opacity-100',
      leaveToClass: 'transform translate-y-full opacity-0',
    },
    {
      description: 'slide down',
      enterClass: 'transform -translate-y-full opacity-0',
      enterActiveClass: 'duration-200 ease-out',
      enterToClass: 'translate-y-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: ' translate-y-0 opacity-100',
      leaveToClass: 'transform -translate-y-full opacity-0',
    },
  ],
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
  setUnavailable(state, unavailable) {
    state.unavailable = [...unavailable]
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
  setActiveStatus(state, val) {
    state.activeStatus = val
  },
  setActiveGrade(state, val) {
    state.activeGrade = val
  },
  removeFromBookingsSelection(state, key) {
    const filteredBookings = state.sessionBookings.filter(function (value, index) {
      return index !== key
    })
    state.sessionBookings = [...filteredBookings]
  },
  reset(state) {
    state.activeDate = null
    state.activeGrade = null
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

    const locationsFR = allLocations.filter((l) => l.slug.slice(-2) === 'fr')
    const locationsNL = allLocations.filter((l) => l.slug.slice(-2) === 'nl')

    const locByLang = {
      fr: [...locationsFR],
      nl: [...locationsNL],
    }

    return commit('setLocations', locByLang)
  },

  async getSheet({ state, dispatch, commit }, { sheet: sheet }) {
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({ sheet: sheet }),
      })
      const res = await resultSheet.json()
      if(sheet === 'reservations') return commit('setBookings', res)
      if(sheet === 'unavailable') return commit('setUnavailable', res)
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
    }
  },


  async removeBooking({ state, dispatch, commit }, { id }) {
    try {
      await fetch('/.netlify/functions/remove-item', {
        method: 'POST',
        body: JSON.stringify({ sheet: 'reservations', id: id }),
      })
      return await dispatch('getSheet', { sheet: 'reservations' })
    } catch (err) {
      console.log(err)
      throw 'Unable to remove item'
    }
  },

  async getTranslations({ commit }) {
    try {
      const translations = await this.$content('site/translations').fetch()
      return commit('setTranslations', translations.translations)
    } catch (err) {
      console.log('GOT AN ERROR GETTING TRANSLATIONS', err)
      throw 'Unable to fetch translations'
    }
  },

  async getLocations({ commit }) {
    const allLocations = await this.$content('locations').fetch()
    // TODO: This solution (altho not scalable), might be too easy
    // Can make it scalable and more cool looking with a reducer
    // But don't really have the time. Almost holiday!
    // ¯\_(ツ)_/¯
    // Will probably drive for three weeks through Croatia
    // ᕕ( ᐛ )ᕗ
    const locationsFR = allLocations.filter((l) => l.slug.slice(-2) === 'fr')
    const locationsNL = allLocations.filter((l) => l.slug.slice(-2) === 'nl')

    const locByLang = {
      fr: [...locationsFR],
      nl: [...locationsNL],
    }
    return commit('setLocations', locByLang)
  },

  setActiveDate({ state, commit }, date) {
    commit('setActiveMoment', null)
    commit('setActiveDate', date)
  },

  setActiveGrade({ state, commit }, val) {
    commit('setActiveGrade', val)
  },

  selectMoment({ state, commit, dispatch }, moment) {
    commit('setActiveMoment', moment)
    dispatch('addBookingToSelection')
  },

  addBookingToSelection({ state, commit }) {
    const moment = state.activeMoment
    const date = state.activeDate
    const grade = state.activeGrade
    // find location in active location and add details for mail
    // const filteredLocation = state.locations[state.lang].filter(l => l.idInSheet === state.activeLocationId)

    const booking = {
      date: date,
      moment: moment,
      location: state.activeLocationId,
      language: state.lang,
      email: state.auth.user.email,
      name: state.auth.user.username,
      grade: grade,
    }

    commit('addToBookingsSelection', booking)

    // After adding to selection, reset date and moment
    // commit('setActiveDate', null)
    commit('setActiveMoment', null)
  },

  removeFromBookingsSelection({ state, commit }, key ) {
    commit('removeFromBookingsSelection', key)
  },

  async createBooking({ state, commit, dispatch }) {
    commit('setActiveStatus', 1)
    // Add all bookings to sheet

    if (state.sessionBookings.length === 0) return

    const body = {
      bookings: state.sessionBookings,
      sheet: 'reservations',
      settings: {
        moments: state.moments,
      },
    }

    // Send to netlify function
    await fetch('/.netlify/functions/save-to-sheet', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    // TODO: check if succeeded, only then add to bookings
    // 1. Reload the bookings from the db
    await dispatch('getSheet', { sheet: 'reservations' })

    commit('setActiveStatus', 2)
    setTimeout(function () {
      commit('setActiveStatus', 0)
    }, 500)

    setTimeout(function () {
      commit('setSessionBookings', [])
    }, 500)
    // 2. Reset stuff
    commit('reset')

  },

  setLocation({ state, commit, dispatch }, idInSheet) {
    // Set active id
    commit('setActiveLocationId', idInSheet)

    // get all bookings for this location
    // TODO: Might have to move this to mounted, somewhere. Maybe the layout.
    dispatch('getSheet', { sheet: 'reservations' })
  },

  getBookings({ dispatch }) {
    //This is the one that get called in the beginning
    dispatch('getSheet', { sheet: 'reservations' })
    //  Also call the sheet with the unavailable bookings, set by the organisation
    dispatch('getSheet', { sheet: 'unavailable' })
  },


  async toggleLang({ state, commit }) {
    let lang = 'fr'

    if (state.lang === lang) {
      lang = 'nl'
    }

    VueFormulate.setLocale(lang)

    // Change route when changing language.
    // TODO: Should get lang on route change

    return commit('setLang', lang)
  },

  removeFromBookingDb({ dispatch }, id) {
    dispatch('removeBooking', { id: id })
  },
}

export const getters = {
  combinedBookings: (state) => {
    // Sometimes we want to see the created bookings + the bookings the user is creating
    return [...state.bookings, ...state.sessionBookings]
  },

  bookingsForActiveLocation: (state) => {
    if (state.activeLocationId === null) return null
    if (state.combinedBookings.length == 0 || state.combinedBookings == undefined) return null
    return state.combinedBookings.filter((l) => l.location === state.activeLocationId)
  },

  moments: (state, getters) => {
    // Don't know why, but my spread operator was still returning a "do not mutate vuex store state outside mutation handlers" error.
    // So changed it to parse/stringify
    const moments = JSON.parse(JSON.stringify(state.moments))

    if (state.activeDate === null) return moments

    const datesAreOnSameDay = (first, second) => {
      return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
      )
    }

    // Filter out only bookings of this day
    const bookingsForActiveDate = getters.combinedBookings.filter(function (value) {
      return datesAreOnSameDay(new Date(value.date), new Date(state.activeDate))
    })

    // Filter out bookings for this location
    const filteredBookings = bookingsForActiveDate.filter(function (value) {
      return state.activeLocationId === value.location
    })

    // If no bookings on this day, just return as is
    if (filteredBookings.length < 1) return moments

    // If there are bookings that day, loop through bookings, and make moments unavailable
    for (let i = 0; i < filteredBookings.length; i++) {
      const booking = filteredBookings[i]
      moments[booking.moment].available = false
    }

    return moments
  },

  disabledDates: (state, getters) => {
    // Filter out only bookings with the active location
    const filteredBookings = getters.combinedBookings.filter((b) => b.location === state.activeLocationId)
    const filteredUnavailable = state.unavailable.filter((b) => b.location === state.activeLocationId)

    const combinedBookings = [...filteredBookings, ...filteredUnavailable]

    // If a date has morning and evening booked, it should also be disabled
    // Using a very simple hack: if this reducer turns up a value of 2, two moments of that day are booked, and it should be disabled


    const bookingsByDay = combinedBookings.reduce((acc, b) => {
      const date = format(new Date(b.date), 'yyyy/MM/dd')
      if (b.moment === '2') return { ...acc, [date]: 2 }
      let val = acc[date] || 0
      val++
      return { ...acc, [date]: val++ }
    }, {})

    const bookingsByDayArray = Object.entries(bookingsByDay)
    if (bookingsByDayArray.length === 0) return []
    // Filter out only the ones with two
    const onlyDisabledDates = bookingsByDayArray.filter((b) => {
      if (b[1] === 2) return b
    })

    // Create an array with only the dates
    const onlyDates = onlyDisabledDates.map((b, key) => new Date(b[0]))




    // Add dates to disabled dates
    return [
      {
        start: null,
        end: new Date(),
      },
      {
        weekdays: [1, 7],
      },
      ...onlyDates,
    ]
  },

  calAttributes: (state) => {
    // Filter: keep only active location
    const filteredBookings = state.sessionBookings.filter((b) => b.location === state.activeLocationId)

    // Transform into an object we can easily use for the v-calendar attributes
    const sessionBookingsByTimeslot = filteredBookings.reduce((acc, session) => {
      const sessions = acc[session.moment] || []
      return { ...acc, [session.moment]: [...sessions, session.date] }
    }, {})

    const bookingsForActiveLocation = state.bookings.filter((b) => b.location === state.activeLocationId)

    // Add the unavailable moments
    const unavailableBookingsForActiveLocation = state.unavailable.filter((b) => b.location === state.activeLocationId)

    // Combine bookings and unavailable dates
    // TODO: Might be better to create a new css class for unavailable bookings
    const allBookedMoments = [...bookingsForActiveLocation, ...unavailableBookingsForActiveLocation]
    const bookingsByTimeslot = allBookedMoments.reduce((acc, session) => {
      const sessions = acc[session.moment] || []
      return { ...acc, [session.moment]: [...sessions, session.date] }
    }, {})

    return [
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
        dates: bookingsByTimeslot[1],
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
        dates: sessionBookingsByTimeslot[1],
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
        dates: new Date(),
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
        ],
      },
      {
        highlight: {
          class: 'velo-selected',
        },
        dates: [],
      },
    ]
  },

  canAddBookingToSession: (state) => {
    return state.activeLocationId !== null && state.activeDate !== null && state.activeMoment !== null
  },

  canSendBookingToDatabase: (state) => {
    return state.sessionBookings.length > 0
  },

  localisedLocations: (state) => {
    return state.locations[state.lang]
  },

  statusDescription: (state) => {
    const translationId = state.status[state.activeStatus].translationId
    return state.translations[translationId][state.lang]
  },

  gradesForUser: (state) => {
    return state.grades.map((g) => {
      return g.name[state.lang]
    })
  },

  activeDateReadable: (state) => {
    return format(new Date(state.activeDate), 'd MMMM y')
  },

  userBookings: (state) => {
    // TODO: make object with passed / upcoming / today bookings
    if (state.auth.user) {
      if (state.bookings) {
        return state.bookings.filter((b) => b.email === state.auth.user.email)
      }
    }
  },
}
