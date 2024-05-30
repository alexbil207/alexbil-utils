export function mergeSort(nums: number[]){
    const length = nums.length
    if(length <=1) return nums
    const middle = Math.floor(length / 2)
    const left = nums.slice(0, middle)
    const right = nums.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right:number[]){
    const mergedResult:number[] = []
    while(left.length && right.length){
        if(left[0] <= right[0]) {
            const num = left.shift()
            mergedResult.push(num)
        } else {
            const num = right.shift()
            mergedResult.push(num)
        }
        return mergedResult
    }
}