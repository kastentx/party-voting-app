import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries} from '../src/core'

describe('application logic', () => {
  
  describe('set entries', () => {
    
    it('adds entries to the state', () => {
      const state = Map()
      const entries = List.of('Hackers', '28 Days Later')
      const nextState = setEntries(state, entries)
      
      expect(nextState).to.equal(Map({
        entries : List.of('Hackers', '28 Days Later')
      }))
    })

    it('converts to immutable', () => {
      const state = Map()
      const entries = ['Hackers', '28 Days Later']
      const nextState = setEntries(state, entries)

      expect(nextState).to.equal(Map({
        entries : List.of('Hackers', '28 Days Later')
      }))
    })
  })

})
