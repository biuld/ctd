import { Grammar } from '../common/grammar.js'
import { Generator } from './generator.js'

const grammar = new Grammar()
export const generator = new Generator(grammar)

// console.log(generator.firstSet)
// console.log(generator.followSet)