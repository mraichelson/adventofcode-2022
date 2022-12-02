/**
 * Welp...there you go...
 */
import fs from 'fs'
const theSecretPlan = fs.readFileSync('./02-input.txt', 'utf-8')

// PART ONE
const thatElfScumsMove = [
	{ in: 'A', out: 'Rock', points: 1 },
	{ in: 'B', out: 'Paper', points: 2 },
	{ in: 'C', out: 'Scissors', points: 3 },
]
const myBrilliantRiposte = [
	{ in: 'X', out: 'Rock', points: 1 },
	{ in: 'Y', out: 'Paper', points: 2 },
	{ in: 'Z', out: 'Scissors', points: 3 },
]
const theRules = [
	{ in: 'Rock', beats: 'Scissors', lose: 'Paper' },
	{ in: 'Paper', beats: 'Rock', lose: 'Scissors' },
	{ in: 'Scissors', beats: 'Paper', lose: 'Rock' },
]
const theBattleNotTheWar = [
	{ outcome: 'loss', points: 0 },
	{ outcome: 'tie', points: 3 },
	{ outcome: 'win', points: 6 },
]
let myGloriousScore = 0

theSecretPlan.split(/\r?\n/).forEach((challenge) => {
	const theBattle = challenge.split(' ')
	const elfMove = thatElfScumsMove.filter((i) => i.in === theBattle[0])[0]
	const myMove = myBrilliantRiposte.filter((i) => i.in === theBattle[1])[0]

	const whenTheDustSettles = theRules.filter((i) => i.in === elfMove.out)[0]

	let historyWillSay = 'tie'
	if (myMove.out === whenTheDustSettles.beats) {
		historyWillSay = 'loss'
	}
	if (myMove.out === whenTheDustSettles.lose) {
		historyWillSay = 'win'
	}

	const pointsFromBattle = theBattleNotTheWar.filter(
		(i) => i.outcome === historyWillSay
	)[0].points
	const scoreForRound = myMove.points + pointsFromBattle

	myGloriousScore += scoreForRound
})

console.log(`Part One: 🧝🗡️ Die elf scum! ${myGloriousScore}`)

// PART TWO

const fixThatFight = [
	{ in: 'X', outcome: 'loss' },
	{ in: 'Y', outcome: 'tie' },
	{ in: 'Z', outcome: 'win' },
]
let myNotSoEthicalButStillGloriousScore = 0

theSecretPlan.split(/\r?\n/).forEach((challenge) => {
	const theBattle = challenge.split(' ')
	const elfMove = thatElfScumsMove.filter((i) => i.in === theBattle[0])[0]
	const thePlan = fixThatFight.filter((i) => i.in === theBattle[1])[0].outcome
	const considerMyMove = theRules.filter((i) => i.in === elfMove.out)[0]

	let theTotallyLegitimateMove = considerMyMove.in
	if (thePlan === 'loss') {
		theTotallyLegitimateMove = considerMyMove.beats
	}
	if (thePlan === 'win') {
		theTotallyLegitimateMove = considerMyMove.lose
	}

	const pointsForFixedBattleOutcome = theBattleNotTheWar.filter(
		(i) => i.outcome === thePlan
	)[0]

	const myLegitimateMove = myBrilliantRiposte.filter(
		(i) => i.out === theTotallyLegitimateMove
	)[0]

	const pointsFromFixedBattle =
		pointsForFixedBattleOutcome.points + myLegitimateMove.points

	myNotSoEthicalButStillGloriousScore += pointsFromFixedBattle
})

console.log('')
console.log(
	`Part Two: 🤷 My totally ethical score that is not based on cheating is ${myNotSoEthicalButStillGloriousScore}`
)
console.log('')
