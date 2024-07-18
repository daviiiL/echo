const arr = [1, 2, 3, 4, 5, 6]

const deleteIndex = arr.indexOf(4)

console.log(deleteIndex)
arr.splice(deleteIndex, 1)
console.log(arr)

