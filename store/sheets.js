import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  activeLang: 'nl',
  
})

export const mutations = {
  setStatus(state, val) {
    state.status = val
  }
}

export const actions = {
 


  async getSheet({ state, dispatch, commit }) {
    fetch('/.netlify/functions/get-sheet', {
      method: 'POST',
      body: JSON.stringify({
        id: 'testId'
     })
    }).then(res => {
      console.log('RES', res)
    })
  }
}

export const getters = {

}
