import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next} from '../src/core'

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

  describe('next', () => {
    
    it('takes the next two entries under vote', () => {
      const state = Map({
        'entries' : List.of('Hackers', '28 Days Later', 'Star Wars')
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        vote : Map({
          pair: List.of('Hackers', '28 Days Later')
        }),
        entries : List.of('Star Wars')
      }))
    })
  
  })

})
