import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
      rotate: false,
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    // console.log(this.state.rollsLeft);
    //IT WAS SO EASY IN THE END...
    // THE KEY WAS IN POSITIONING THE TIMEOUT FUNCTION
    /*
     I WAS WAITING FOR THE LOCKED ARRAY AND ALL THE OTHER STATE PROPS TO CHANGE AND THEN FINALLY ROTATE, PROBLEM WAS IN LAST ROLL
     OF A ROUND, BECAUSE ALL THE LOCKED DIES WERE COMING WITH A VALUE OF TRUE, THEREFORE WERE UNABLE TO ROTATE

     BY JUST DELAYING THE FULL CHANGE IN STATE I CAN HAVE ACCESS TO ALL THE LOCKED/UNLOCKED DIES BEFORE THE LAST ROUND TURNS ALL 
     OF THEM IN TRUE
    */
    this.setState((st) => ({
      rotate: true,
    }));

    setTimeout(() => {
      this.setState((st) => ({
        dice: st.dice.map((d, i) =>
          // for ex. 0.6 will round to 1
          st.locked[i] ? d : Math.ceil(Math.random() * 6)
        ),
        // when 1 > 1... locked array will be filled with all true values (all die locked)
        locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
        rollsLeft: st.rollsLeft - 1,
        rotate: false,
      }));
    }, 1000);
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    // console.log(idx);
    // console.log(this.state.rollsLeft);

    this.state.rollsLeft >= 1 &&
      this.setState((st) => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1),
        ],
      }));

    // console.log(this.state.locked);
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
      // rotate: false,
    }));
    // console.log(this.state.rotate);
    this.roll();
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              rotate={this.state.rotate}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={this.state.locked.every((x) => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
