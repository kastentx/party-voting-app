import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../src/reducer'

describe('reducer', () => {
  
  it('handles SET_ENTRIES', () => {
    const initialState = Map()
    const action = {type: 'SET_ENTRIES', entries: ['Hackers']}
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      entries: ['Hackers']
    }))
  })

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Hackers', '28 Days Later']
    })
    const action = {type: 'NEXT'}
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Hackers', '28 Days Later']
      },
      entries: []
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Hackers', '28 Days Later']
      },
      entries: []
    })
    const action = {type: 'VOTE', entry: 'Hackers'}
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Hackers', '28 Days Later'],
        tally: {
          'Hackers' : 1
        }
      },
      entries: []
    }))
  })

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Hackers']}
    const nextState = reducer(undefined, action)
    expect(nextState).to.equal(fromJS({
      entries: ['Hackers']
    }))
  })

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Hackers', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Hackers'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Hackers'},
      {type: 'NEXT'}
    ]
    const finalState = actions.reduce(reducer, Map())

    expect(finalState).to.equal.(fromJS({
      winner: 'Hackers'
    }))
  })

})
