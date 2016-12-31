import {List, Map} from 'immutable'
import {expect} from 'chai'
import {setEntries, next, vote} from '../src/core'

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
        entries : List.of('Hackers', '28 Days Later', 'Star Wars')
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

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        entries : List.of('Hackers', '28 Days Later')
      })
      const nextState = vote(state, 'Hackers')
      expect(nextState).to.equal(Map({
        vote : Map({
          pair : List.of('Hackers', '28 Days Later'),
          tally : Map({
            'Hackers' : 1
          })
        }),
        entries : List()
      }))
    })

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote : Map({
          pair : List.of('Hackers', '28 Days Later'),
          tally : Map({
            'Hackers' : 3,
            '28 Days Later' : 2
          })
        }),
        entries : List()
      })
      const nextState = vote(state, 'Hackers')
      expect(nextState).to.equal(Map({
        vote : Map({
          pair : List.of('Hackers', '28 Days Later'),
          tally : Map({
            'Hackers' : 4,
            '28 Days Later' : 2
          })
        }),
        entries : List()
      }))
    })

  })

})
