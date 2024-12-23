// Adds two variables.
function Add (srcVar1, srcVar2, resultVar) {
  resultVar = srcVar1 + srcVar2
  return resultVar
}

// Multiplies two variables.
function Multiply (srcVar1, srcVar2, resultVar) {
  resultVar = srcVar1 * srcVar2
  return resultVar
}

// Subtracts the second variable from the first.
function Subtract (srcVar1, srcVar2, resultVar) {
  resultVar = srcVar1 - srcVar2
  return resultVar
}

// Divides the first variable by the second.
function Divide (srcVar1, srcVar2, resultVar) {
  resultVar = srcVar1 / srcVar2
  return resultVar
}

// Copies the value of a variable to another.
function Equals (srcVar1, resultVar) {
  resultVar = srcVar1
  return resultVar
}

// Computes the absolute (i.e. unsigned) value of a variable.
function Abs (srcVar1, resultVar) {
  resultVar = Math.abs(srcVar1)
  return resultVar
}

// Returns the fractional component of a variable.
function Frac (srcVar1, resultVar) {
  resultVar = srcVar1 - Math.trunc(srcVar1)
  return resultVar
}

// Returns the integer component of a variable.
function Int (srcVar1, resultVar) {
  resultVar = Math.trunc(srcVar1)
  return resultVar
}

// Compares the first value to the second.
function LessOrEqual (srcVar1, srcVar2, lessEqualVar, greaterVar, resultVar) {
  resultVar = srcVar1 <= srcVar2 ? lessEqualVar : greaterVar
  return resultVar
}

// Selects the first value over the second if it is anything other than zero.
function SelectFirstIfNonZero (srcVar1, srcVar2, resultVar) {
  resultVar = srcVar1 === 0 ? srcVar1 : srcVar2
  return resultVar
}

// Keeps a variable within a specified range. srcVar1 and resultVar can be the same.
// result will be the value in the range [min, max] that is the closest to srcVar1.
function Clamp (min, max, srcVar1, resultVar) {
  if (min > max) {
    let flTemp = min
    min = max
    max = flTemp
  }

  if (srcVar1 < min) srcVar1 = min
  else if (srcVar1 > max) srcVar1 = max
  resultVar = srcVar1
  return resultVar
}

// Constrains a value into a range, wrapping around if it exceeds it.
// srcVar1: the value to constrain.
// minVal, maxVal: Range to constrain the value to. If min is less than max, min is always returned.
function WrapMinMax (srcVar1, minVal, maxVal, resultVar) {
  let result = (srcVar1 - minVal) / (maxVal - minVal)

  if (result >= 0.0) {
    result -= Math.floor(result)
  } else {
    result -= Math.floor(result) - 1
  }

  result *= (maxVal - minVal)
  result += minVal

  resultVar = result
  return resultVar
}

module.exports = { Add, Multiply, Subtract, Divide, Equals, Abs, Frac, Int, LessOrEqual, SelectFirstIfNonZero, Clamp, WrapMinMax }
