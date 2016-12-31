import {expect} from 'chai'
import {List, Map} from 'immutable'

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1
    }

    it('is immutable', () => {
      let state = 42
      let nextState = increment(state)

      expect(nextState).to.equal(43)
      expect(state).to.equal(42)
    })

  })

  describe('a List', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie)
    }

    it('is imutable', () => {
      let state = List.of('Hackers', '28 Days Later')
      let nextState = addMovie(state, 'Star Wars')

      expect(nextState).to.equal(List.of(
        'Hackers',
        '28 Days Later',
        'Star Wars'
      ))
      expect(state).to.equal(List.of(
        'Hackers',
        '28 Days Later'
      ))
    })

  })

  describe('a Tree', () => {

    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      )
    }

    if('is immutable', () => {
      let state = Map({
        movies: List.of('Hackers', '28 Days Later')
      })
      let nextState = addMovie(state, 'Star Wars')

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Hackers',
          '28 Days Later',
          'Star Wars'
        )
      }))
      expect(state).to.equal(Map({
        movies: List.of(
          'Hackers',
          '28 Days Later'
        )
      }))
    })

  })

})
