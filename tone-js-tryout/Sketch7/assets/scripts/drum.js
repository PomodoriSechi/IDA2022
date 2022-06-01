const makeDrums = (count) => {
  // declare array to store Drums
  const Drums = [];

  // each synth can only play one note at a time.
  // for simplicity, we'll create one synth for each note available
  // this allows for easy polyphony (multiple notes playing at the same time)

	// I'll be using a one octive F minor pentatonic scale
  // so I'll need 6 Drums
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
        // "C4": "C4.m4a",
        // "D#4": "Ds4.m4a",
        // "F#4": "Fs4.m4a",
        // "A4": "A4.m4a",
				"C1": "achtel-Bierdose.mp3",
				"C2": "Snackruebli-kauen.mp3",
				"C3": "Knack_1.mp4",
				"C4": "Snackruebli-kauen.mp3",
			},
			fadeOut: "8n",
			baseUrl: "assets/sounds/"
		}).toDestination();

   
   
    drums.push(drum);
  }

  return Drums;
};

const makeDrumGrid = (drumNotes) => {
  // our "notation" will consist of an array with 6 sub arrays
  // each sub array corresponds to one row in our sequencer grid

  // parent array to hold each row subarray
  const drumRows = [];

  for (const drumNote of drumNotes) {
    // declare the subarray
    const row = [];
    // each subarray contains multiple objects that have an assigned note
    // and a boolean to flag whether they are "activated"
    // each element in the subarray corresponds to one eigth note
    for (let i = 0; i < sequencerWidth; i++) {
      row.push({
        drumNote: drumNote,
        isActive: false
      });
    }
    drumRows.push(drumRow);
  }

  // we now have 6 rows each containing 16 eighth notes
  return drumRows;
};

const Drums = makeDrums(4);

// declaring the notes for each row
const drumNotes = ["C1", "C2", "C3", "C4"];
let grid = makeDrumGrid(drumNotes);
let beat = 0;
let drumsPlaying = false;
let started = false;
// let BeatsPerMinute = 120;


document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
  })

const configLoop = () => {

  const repeat = (time) => {
    grid.forEach((row, index) => {
      let drum = Drums[index];
      let drumNote = row[beat];
      if (drumNote.isActive) {
        drum.triggerAttackRelease(drumNote.drumNote, "8n", time);
      }
    });

    beat = (beat + 1) % sequencerWidth;
  };

  Tone.Transport.bpm.value = 120;
  Tone.Transport.scheduleRepeat(repeat, "8n");
};

const makeDrumSequencer = () => {
  const sequencer = document.getElementById("drumSequencer");
  grid.forEach((drumRow, drumRowIndex) => {
    const drumSeqRow = document.createElement("div");
    drumSeqRow.id = `DrumRowIndex`;
    drumSeqRow.className = "sequencer-row";

    drumRow.forEach((drumNote, drumNoteIndex) => {
      const drumButton = document.createElement("button");
      drumButton.className = "note"
      drumButton.addEventListener("click", function(e) {
        handleNoteClick(drumRowIndex, drumNoteIndex, e);
      });

      DrumSeqRow.appendChild(button);
    });

    sequencer.appendChild(DrumSeqRow);
  });
};