/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

function newSplice(index, removed, addedCount) {
    return {
        index: index,
        removed: removed,
        addedCount: addedCount
    };
}

const EDIT_LEAVE = 0;
const EDIT_UPDATE = 1;
const EDIT_ADD = 2;
const EDIT_DELETE = 3;

// Note: This function is *based* on the computation of the Levenshtein
// "edit" distance. The one change is that "updates" are treated as two
// edits - not one. With Array splices, an update is really a delete
// followed by an add. By retaining this, we optimize for "keeping" the
// maximum array items in the original array. For example:
//
//   'xxxx123' -> '123yyyy'
//
// With 1-edit updates, the shortest path would be just to update all seven
// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
// leaves the substring '123' intact.
function calcEditDistances(current, currentStart, currentEnd,
    old, oldStart, oldEnd) {
    // "Deletion" columns
    let rowCount = oldEnd - oldStart + 1;
    let columnCount = currentEnd - currentStart + 1;
    let distances = new Array(rowCount);

    // "Addition" rows. Initialize null column.
    for (let i = 0; i < rowCount; i++) {
        distances[i] = new Array(columnCount);
        distances[i][0] = i;
    }

    // Initialize null row
    for (let j = 0; j < columnCount; j++)
        distances[0][j] = j;

    for (let i = 1; i < rowCount; i++) {
        for (let j = 1; j < columnCount; j++) {
            if (equals(current[currentStart + j - 1], old[oldStart + i - 1]))
                distances[i][j] = distances[i - 1][j - 1];
            else {
                let north = distances[i - 1][j] + 1;
                let west = distances[i][j - 1] + 1;
                distances[i][j] = north < west ? north : west;
            }
        }
    }

    return distances;
}

// This starts at the final weight, and walks "backward" by finding
// the minimum previous weight recursively until the origin of the weight
// matrix.
function spliceOperationsFromEditDistances(distances) {
    let i = distances.length - 1;
    let j = distances[0].length - 1;
    let current = distances[i][j];
    let edits = [];
    while (i > 0 || j > 0) {
        if (i == 0) {
            edits.push(EDIT_ADD);
            j--;
            continue;
        }
        if (j == 0) {
            edits.push(EDIT_DELETE);
            i--;
            continue;
        }
        let northWest = distances[i - 1][j - 1];
        let west = distances[i - 1][j];
        let north = distances[i][j - 1];

        let min;
        if (west < north)
            min = west < northWest ? west : northWest;
        else
            min = north < northWest ? north : northWest;

        if (min == northWest) {
            if (northWest == current) {
                edits.push(EDIT_LEAVE);
            } else {
                edits.push(EDIT_UPDATE);
                current = northWest;
            }
            i--;
            j--;
        } else if (min == west) {
            edits.push(EDIT_DELETE);
            i--;
            current = west;
        } else {
            edits.push(EDIT_ADD);
            j--;
            current = north;
        }
    }

    edits.reverse();
    return edits;
}

/**
 * Splice Projection functions:
 *
 * A splice map is a representation of how a previous array of items
 * was transformed into a new array of items. Conceptually it is a list of
 * tuples of
 *
 *   <index, removed, addedCount>
 *
 * which are kept in ascending index order of. The tuple represents that at
 * the |index|, |removed| sequence of items were removed, and counting forward
 * from |index|, |addedCount| items were added.
 */

/**
 * Lacking individual splice mutation information, the minimal set of
 * splices can be synthesized given the previous state and final state of an
 * array. The basic approach is to calculate the edit distance matrix and
 * choose the shortest path through it.
 *
 * Complexity: O(l * p)
 *   l: The length of the current array
 *   p: The length of the old array
 */
function calcSplices(current, currentStart, currentEnd,
    old, oldStart, oldEnd) {
    let prefixCount = 0;
    let suffixCount = 0;
    let splice;

    let minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart == 0 && oldStart == 0)
        prefixCount = sharedPrefix(current, old, minLength);

    if (currentEnd == current.length && oldEnd == old.length)
        suffixCount = sharedSuffix(current, old, minLength - prefixCount);

    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;

    if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
        return [];

    if (currentStart == currentEnd) {
        splice = newSplice(currentStart, [], 0);
        while (oldStart < oldEnd)
            splice.removed.push(old[oldStart++]);

        return [splice];
    } else if (oldStart == oldEnd)
        return [newSplice(currentStart, [], currentEnd - currentStart)];

    let ops = spliceOperationsFromEditDistances(
        calcEditDistances(current, currentStart, currentEnd,
            old, oldStart, oldEnd));

    splice = undefined;
    let splices = [];
    let index = currentStart;
    let oldIndex = oldStart;
    for (let i = 0; i < ops.length; i++) {
        switch (ops[i]) {
            case EDIT_LEAVE:
                if (splice) {
                    splices.push(splice);
                    splice = undefined;
                }

                index++;
                oldIndex++;
                break;
            case EDIT_UPDATE:
                if (!splice)
                    splice = newSplice(index, [], 0);

                splice.addedCount++;
                index++;

                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
            case EDIT_ADD:
                if (!splice)
                    splice = newSplice(index, [], 0);

                splice.addedCount++;
                index++;
                break;
            case EDIT_DELETE:
                if (!splice)
                    splice = newSplice(index, [], 0);

                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
        }
    }

    if (splice) {
        splices.push(splice);
    }
    return splices;
}

function sharedPrefix(current, old, searchLength) {
    for (let i = 0; i < searchLength; i++)
        if (!equals(current[i], old[i]))
            return i;
    return searchLength;
}

function sharedSuffix(current, old, searchLength) {
    let index1 = current.length;
    let index2 = old.length;
    let count = 0;
    while (count < searchLength && equals(current[--index1], old[--index2]))
        count++;

    return count;
}

function equals(currentValue, previousValue) {
    return currentValue === previousValue;
}

export function calculateSplices(current, previous) {
    return calcSplices(current, 0, current.length, previous, 0,
        previous.length);
}