// sortingAlgorithms.js
export function bubbleSort(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: a.slice(), highlights: [j, j+1], type: 'compare' });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        steps.push({ array: a.slice(), highlights: [j, j+1], type: 'swap' });
      }
    }
  }
  steps.push({ array: a.slice(), highlights: [], type: 'done' });
  return steps;
}
export function selectionSort(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i+1; j < a.length; j++) {
      steps.push({ array: a.slice(), highlights: [minIdx, j], type: 'compare' });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ array: a.slice(), highlights: [i, minIdx], type: 'swap' });
    }
  }
  steps.push({ array: a.slice(), highlights: [], type: 'done' });
  return steps;
}
export function insertionSort(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      steps.push({ array: a.slice(), highlights: [j, j+1], type: 'compare' });
      a[j+1] = a[j];
      steps.push({ array: a.slice(), highlights: [j, j+1], type: 'swap' });
      j--;
    }
    a[j+1] = key;
    steps.push({ array: a.slice(), highlights: [j+1], type: 'insert' });
  }
  steps.push({ array: a.slice(), highlights: [], type: 'done' });
  return steps;
}
export function mergeSort(arr) {
  const steps = [];
  function merge(a, l, m, r) {
    let left = a.slice(l, m+1);
    let right = a.slice(m+1, r+1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ array: a.slice(), highlights: [k], type: 'compare' });
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      steps.push({ array: a.slice(), highlights: [k-1], type: 'merge' });
    }
    while (i < left.length) {
      a[k++] = left[i++];
      steps.push({ array: a.slice(), highlights: [k-1], type: 'merge' });
    }
    while (j < right.length) {
      a[k++] = right[j++];
      steps.push({ array: a.slice(), highlights: [k-1], type: 'merge' });
    }
  }
  function sort(a, l, r) {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      sort(a, l, m);
      sort(a, m+1, r);
      merge(a, l, m, r);
    }
  }
  let a = arr.slice();
  sort(a, 0, a.length-1);
  steps.push({ array: a.slice(), highlights: [], type: 'done' });
  return steps;
}
export function quickSort(arr) {
  const steps = [];
  function sort(a, l, r) {
    if (l < r) {
      let pivot = a[r];
      let i = l;
      for (let j = l; j < r; j++) {
        steps.push({ array: a.slice(), highlights: [j, r], type: 'compare' });
        if (a[j] < pivot) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({ array: a.slice(), highlights: [i, j], type: 'swap' });
          i++;
        }
      }
      [a[i], a[r]] = [a[r], a[i]];
      steps.push({ array: a.slice(), highlights: [i, r], type: 'swap' });
      sort(a, l, i-1);
      sort(a, i+1, r);
    }
  }
  let a = arr.slice();
  sort(a, 0, a.length-1);
  steps.push({ array: a.slice(), highlights: [], type: 'done' });
  return steps;
}
export const ALGORITHMS = {
  'Bubble Sort': {
    fn: bubbleSort,
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    }
  },
  'Selection Sort': {
    fn: selectionSort,
    description: 'Selection Sort repeatedly finds the minimum element from unsorted part and puts it at the beginning.',
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    }
  },
  'Insertion Sort': {
    fn: insertionSort,
    description: 'Insertion Sort builds the sorted array one item at a time by comparing and inserting elements into their correct position.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    }
  },
  'Merge Sort': {
    fn: mergeSort,
    description: 'Merge Sort divides the array into halves, sorts them and merges them back together.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)'
    }
  },
  'Quick Sort': {
    fn: quickSort,
    description: 'Quick Sort picks a pivot and partitions the array around the pivot, recursively sorting the partitions.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)'
    }
  }
};
