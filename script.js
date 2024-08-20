const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;                 //my code: array.forEach(el => counts[el] ? counts[el] += 1 : counts[el] = 1);    
  })                                                    //the purpose of this is the count object which goes over each element and counts: el.value = count   if in object: el.value: count --> property: value
  //all the same frequency, returns null
  if (new Set(Object.values(counts)).size === 1) {      //Object.values returns an array with the values from the object (the iteration/count)
    return null;                                        //new Set() removes the redundancy, then .size === 1 (if all are same mode)    
  }
  //for getting the element with highest frequency
  const highest = Object.keys(counts).sort(             //Object.keys returns an array with the keys (properties) from the object
    (a, b) => counts[b] - counts[a]                     //then the keys (properties) are sorted in descending order
  )[0];                                                 //after sorting, the highest key (property) is taken
  const mode = Object.keys(counts).filter(              //Step 39 - this is all elements that have this highest frequency
    (el) => counts[el] === counts[highest]              //value of counts[el] === value of counts[highest] note- key: value (value is the frequency)
  );
  return mode.join(", ");
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  /**
   const differences = array.map(
    el => el - mean
  );
  const squaredDifferences = differences.map(
    el => el ** 2
  );
  const sumSquaredDifferences = squaredDifferences.reduce(
    (acc, el) => acc + el, 0
  );
   */
  const variance = array.reduce((acc, el) => {    //made the code above into one
    const difference = el - mean;
    const squared = difference ** 2;            //base to the power of (number) = base ** number
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);      //or Math.pow(base, exponent)
  return standardDeviation;
}

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));   //filters out !NaN after converting it to number
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}