import classNames from "https://cdn.skypack.dev/classnames/bind";
import * as Tone from "https://cdn.skypack.dev/tone";
/*_________________________________Melodies_________________________________ */
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
        "C4": "C4.m4a",
        "D#4": "Ds4.m4a",
        "F#4": "Fs4.m4a",
        "A4": "A4.m4a",
				// "C1": "achtel-Bierdose.mp3",
				// "C2": "Snackruebli-kauen.mp3",
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
        isActive: false
      });
    }
    rows.push(row);
  }

  // we now have 6 rows each containing 16 eighth notes
  return rows;
};

const synths = makeSynths(6);

// declaring the notes for each row
const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3"];
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
      button.addEventListener("click", function(e) {
        handleNoteClick(rowIndex, noteIndex, e);
      });

      seqRow.appendChild(button);
    });

    sequencer.appendChild(seqRow);
  });
};
/*_________________________________Drums_________________________________ */
const makeDrums = (count) => {
  // declare array to store synths
  const drums = [];

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
    let drum = new Tone.Sampler({
			urls: {
				"C1": "achtel-Bierdose.mp3",
				"C2": "Snackruebli-kauen.mp3",
				"C3": "Goerps1.mp3",
				"C4": "Knack_1.mp3",
			},
			fadeOut: "8n",
			baseUrl: "assets/sounds/"
		}).toDestination();

   
   
    drums.push(drum);
  }

  return drums;
};

const makeDrumGrid = (notes) => {
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
        isActive: false
      });
    }
    rows.push(row);
  }

  // we now have 6 rows each containing 16 eighth notes
  return rows;
};

const drums = makeDrums(4);

// declaring the notes for each row
const drumNotes = ["C1", "C2", "C3", "C4"];
let drumGrid = makeGrid(drumNotes);
let drumBeat = 0;
let drumPlaying = false;
let drumStarted = false;
document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
  })

const configDrumLoop = () => {

  const repeat = (time) => {
    grid.forEach((drumRow, drumIndex) => {
      let drum = drums[drumIndex];
      let note = drumRow[beat];
      if (note.isActive) {
        drum.triggerAttackRelease(note.note, "8n", time);
      }
    });

    beat = (beat + 1) % sequencerWidth;
  };

  Tone.Transport.bpm.value = 120;
  Tone.Transport.scheduleRepeat(repeat, "8n");
};

const makeDrumSequencer = () => {
  const drumSequencer = document.getElementById("drumSequencer");
  grid.forEach((row, DrumRowIndex) => {
    const DrumSeqRow = document.createElement("div");
    DrumSeqRow.id = `DrumRowIndex`;
    DrumSeqRow.className = "sequencer-row";

    row.forEach((note, DrumNoteIndex) => {
      const button = document.createElement("button");
      button.className = "note"
      button.addEventListener("click", function(e) {
        handleNoteClick(DrumRowIndex, DrumNoteIndex, e);
      });

      DrumSeqRow.appendChild(button);
    });

    drumSequencer.appendChild(DrumSeqRow);
  });
};
/*_________________________________Interactions_________________________________ */

const handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((note, noteIndex) => {
      if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
        note.isActive = !note.isActive;
        e.target.className = classNames(
          "note", 
          { "note-is-active": !!note.isActive }, 
          { "note-not-active": !note.isActive }
        );
      }
    });
  });
};

const configPlayButton = () => {
  const button = document.getElementById("play-button");
  button.addEventListener("click", (e) => {
    if (!started) {
      Tone.start();
      Tone.getDestination().volume.rampTo(-10, 0.001)
      configLoop();
      configDrumLoop();
      started = true;
    }

    if (playing) {
      e.target.innerText = "Play";
      Tone.Transport.stop();
      playing = false;
    } else {
      e.target.innerText = "Stop";
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
  makeDrumSequencer();
});
