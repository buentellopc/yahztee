/** Rule for Yahtzee scoring.
 *
 * This is an "abstract class"; the real rules are subclasses of these.
 * This stores all parameters passed into it as properties on the instance
 * (to simplify child classes so they don't need constructors of their own).
 *
 * It contains useful functions for summing, counting values, and counting
 * frequencies of dice. These are used by subclassed rules.
 */

class Rule {
  constructor(params) {
    // put all properties in params on instance
    Object.assign(this, params);
  }

  sum(dice) {
    // sum of all dice
    return dice.reduce((prev, curr) => prev + curr);
  }

  freq(dice) {
    // frequencies of dice values
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
    return Array.from(freqs.values());
  }

  count(dice, val) {
    // # times val appears in dice
    return dice.filter((d) => d === val).length;
  }
}

/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

class TotalOneNumber extends Rule {
  evalRoll = (dice) => {
    return this.val * this.count(dice, this.val);
  };
}

/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

class SumDistro extends Rule {
  evalRoll = (dice) => {
    // do any of the counts meet of exceed this distro?
    console.log(dice);
    console.log(this.freq(dice));
    console.log(this.count);
    console.log(Rule);
    // how does it work count here? how is having the arguments passed??
    // colt assign a prop count, but a count method also exists. The difference is just the parentheses ()
    return this.freq(dice).some((c) => c >= this.count) ? this.sum(dice) : 0;
  };
}

/** Check if full house (3-of-kind and 2-of-kind) */

class FullHouse extends Rule {
  // TODO
  // It is created a set from the dice array, we assume that there are only 2 values (both 3-of-kind and 2-of-king). We convert it again into an array and check for each number if the count the dice array is 3 times or 2 times
  // use sort and freq to do it more quickly
  evalRoll = (dice) => {
    console.log(dice);
    let set = new Set(dice);
    let arr = [...set];
    console.log(arr);
    console.log(
      arr.every((c) => this.count(dice, c) === 2 || this.count(dice, c) === 3)
    );
    return arr.every(
      (c) => this.count(dice, c) === 2 || this.count(dice, c) === 3
    )
      ? 25
      : 0;
  };
}

/** Check for small straights. */

class SmallStraight extends Rule {
  evalRoll = (dice) => {
    let opt = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
    ];
    const d = new Set(dice);
    const arr = [...d].sort();
    console.log(arr);
    let res = opt.some((option, i) => option.every((num, j) => num === arr[j]));
    console.log("smallStraigh?", res);
    return res ? this.score : 0;
  };
}
/** Check for large straights. */

class LargeStraight extends Rule {
  evalRoll = (dice) => {
    const d = new Set(dice);

    // large straight must be 5 different dice & only one can be a 1 or a 6
    return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
  };
}

/** Check if all dice are same. */

class Yahtzee extends Rule {
  evalRoll = (dice) => {
    // all dice must be the same
    return this.freq(dice)[0] === 5 ? this.score : 0;
  };
}

// ones, twos, etc score as sum of that value
const ones = new TotalOneNumber({ val: 1, description: "1 point per 1" });
const twos = new TotalOneNumber({ val: 2, description: "2 points per 2" });
const threes = new TotalOneNumber({ val: 3, description: "3 points per 3" });
const fours = new TotalOneNumber({ val: 4, description: "4 points per 4" });
const fives = new TotalOneNumber({ val: 5, description: "5 points per 5" });
const sixes = new TotalOneNumber({ val: 6, description: "6 points per 6" });

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({
  count: 3,
  description: "Sum all dice if 3 are the same",
});
const fourOfKind = new SumDistro({
  count: 4,
  description: "Sum all dice if 4 are the same",
});

// full house scores as flat 25
const fullHouse = new FullHouse({ description: "25 points for a full house" });

// small/large straights score as 30/40
const smallStraight = new SmallStraight({
  score: 30,
  description: "30 points for a small straight",
});
const largeStraight = new LargeStraight({
  score: 40,
  description: "40 points for a large straight",
});

// yahtzee scores as 50
const yahtzee = new Yahtzee({
  score: 50,
  description: "50 points for a yahtzee",
});

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro({ count: 0, description: "Sum of all dice" });

export {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
};
