/**
 * This is awful and I should feel ashamed of myself for
 * the things I have done here.
 *
 * 🤘 Hail Santa.
 */
import fs from 'fs'

const elvesData = []
const tmpElf = { i: null, c: [] }
let elfIndex = 0

const inputFileContent = fs.readFileSync('./01-input.txt', 'utf-8')

inputFileContent.split(/\r?\n/).forEach((line) => {
	if (line.trim().length > 0) {
		tmpElf.c.push(parseInt(line))
	} else {
		tmpElf.i = elfIndex + 1
		const elfEntry = JSON.parse(JSON.stringify(tmpElf))
		elvesData.push(elfEntry)
		// reset tmpElf to defaults
		tmpElf.c = []
		tmpElf.i = null
		elfIndex++
	}
})
// console.log('*** DONE PARSING ELF DATA ***')
// console.log('')
// console.log('*** START FINDING THE BEST ELF TO CONSUME ***')

elvesData.map((elf) => {
	let totalCalories = 0
	elf.c.forEach((entry) => {
		totalCalories += entry
	})
	elf.totalCalories = totalCalories
	delete elf.c
})

elvesData.sort((a, b) => {
	if (a.totalCalories > b.totalCalories) {
		return -1
	} else {
		return 1
	}
})

console.log(
	`🎅: I demand food! Elf #${elvesData[0].i} is to be my chosen meal.`
)
console.log(
	`🎅: The ${elvesData[0].totalCalories} calories contained in his fae-blooded flesh shall fuel me on my yuletide journey.`
)
console.log('')
console.log('🤘 HAIL SANTA!')
console.log('')

let topThreeJuciestElves = 0
for (let i = 0; i <= 2; i++) {
	topThreeJuciestElves += elvesData[i].totalCalories
}
console.log(
	`The top three juciest elves contain ${topThreeJuciestElves} calories`
)
