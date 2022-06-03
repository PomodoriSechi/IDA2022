import classNames from "https://cdn.skypack.dev/classnames/bind";
import * as Tone from "https://cdn.skypack.dev/tone";

let sequencerWidth = 10
const makeSynths = (count) => {
  // declare array to store synths
  const synths = [];

  // each synth can only play one note at a time.
  // for simplicity, we'll create one synth for each note available
  // this allows for easy polyphony (multiple notes playing at the same time)

	// I'll be using a one octive F minor pentatonic scale
  // so I'll need 6 synths
  for (let i = 0; i < count; i++) {
    // Documentation for Tone.Synth can be found here:
    // https://tonejs.github.io/docs/r13/Synth

    // I'm using an oscillator with a square wave and 8 partials
    // because I like how it sounds.
    //
    // You could simply declare new Tone.Synth().toDestination()
    //
    // This would work just as well, but sound slightly different.
    // Demo different oscillator settings here:
    // https://tonejs.github.io/examples/oscillator
    let synth = new Tone.Sampler({
			urls: {
        "D5": "D5-kopfnuss.mp3",
        "B4": "B4-Kopfnuss.mp3",
        "F#5": "Fis5-Kopfnuss.mp3",
        "A#4": "Ais4-Kopfnuss.mp3",
				// "C1": "achtel-Bierdose.mp3",
				"C1": "hihat-handfurz.mp3",
				"C2": "closed-hihat-sreicheln.mp3",
				"D1": "bass-schlucken.mp3",
				// "D4": "Goerps1.mp3",
				// "A4": "Knack_1.mp4",
				// "F4": "Snackruebli-kauen.mp3",
			},
			fadeOut: "8n",
			baseUrl: "assets/sounds/"
		}).toDestination();

   
   
    synths.push(synth);
  }

  return synths;
};

const makeGrid = (notes) => {
  // our "notation" will consist of an array with 6 sub arrays
  // each sub array corresponds to one row in our sequencer grid

  // parent array to hold each row subarray
  const rows = [];

  for (const note of notes) {
    // declare the subarray
    const row = [];
    // each subarray contains multiple objects that have an assigned note
    // and a boolean to flag whether they are "activated"
    // each element in the subarray corresponds to one eigth note
    for (let i = 0; i < sequencerWidth; i++) {
      row.push({
        note: note,
        isActive: false, 
        HTMLElement: null
      });
    }
    rows.push(row);
  }

  // we now have 6(sequencer) rows each containing 16 eighth notes
  return rows;
};

const synths = makeSynths(10);

// declaring the notes for each row
const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C1", "C2", "C1", "D1"];
let grid = makeGrid(notes);
let beat = 0;
let playing = false;
let started = false;
// let BeatsPerMinute = 120;


document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
  })

const configLoop = () => {

  const repeat = (time) => {
    grid.forEach((row, index) => {
      let synth = synths[index];
      let note = row[beat];
      if (note.isActive) {
        synth.triggerAttackRelease(note.note, "8n", time);
        // console.log(row[beat])
        let a = row[beat].HTMLElement;
        // a.style.backgroundColor = "red";
        // a.style.animationDuration = "8n" doesnt work :(
        a.classList.add("glow-animation")
        setTimeout(() => { a.classList.remove("glow-animation")}, 300 );        
      }
    });

    beat = (beat + 1) % sequencerWidth;
  };

  Tone.Transport.bpm.value = 120;
  Tone.Transport.scheduleRepeat(repeat, "8n");
};
const makeSequencer = () => {
  const sequencer = document.getElementById("sequencer");
  grid.forEach((row, rowIndex) => {
    const seqRow = document.createElement("div");
    seqRow.id = `rowIndex`;
    seqRow.className = "sequencer-row";

    row.forEach((note, noteIndex) => {
      const button = document.createElement("button");
      button.className = "note"
      if (rowIndex >=6){
        button.setAttribute("id","beat-color")
      }
      button.addEventListener("click", function(e) {
        handleNoteClick(rowIndex, noteIndex, e);

      });
      grid[rowIndex][noteIndex].HTMLElement = button
      // console.log(grid[rowIndex][noteIndex])

      seqRow.appendChild(button);
    });

    sequencer.appendChild(seqRow);
  });
};

const handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((note, noteIndex) => {
      if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
        note.isActive = !note.isActive;
        e.target.className = classNames(
          "note", 
          { "note-is-active": !!note.isActive }, 
          { "note-not-active": !note.isActive },

        );
      }
    });
  });
};

// document.getElementById("randomize-button").onclick = function randomizeGrid() {
//   console.log(grid)
//   for(let x = 0; x < grid.length; x++) {
//     for(let y = 0; y < grid[x].length; y++) {
//       if(Math.random() > 0.5) {
//         grid[x][y].isActive = true;
//       }
//     }
//   }
// }

const configPlayButton = () => {
  const button = document.getElementById("play-button");
  button.addEventListener("click", (e) => {
    if (!started) {
      Tone.start();
      Tone.getDestination().volume.rampTo(-10, 0.001)
      configLoop();
      started = true;
    }

    if (playing) {
      e.target.innerText = "Play";
      e.target.classList.remove("active-button");
      Tone.Transport.stop();
      playing = false;
    } else {
      e.target.innerText = "Stop";
      e.target.classList.add("active-button");
      Tone.Transport.start();
      playing = true;
    }
  });
};

/* configPlayButton();
makeSequencer(); */
window.addEventListener("DOMContentLoaded", () => {
  configPlayButton();
	makeSequencer();
});
