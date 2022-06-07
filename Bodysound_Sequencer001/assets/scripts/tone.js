import classNames from "https://cdn.skypack.dev/classnames/bind";
import * as Tone from "https://cdn.skypack.dev/tone";
let grid

function bigSequencer() {
  let sequencerWidth = 10
  let makeSynths = (count) => {
    // declare array to store synths
    let synths = [];

    // each synth can only play one note at a time.
    // for polyphony (multiple notes playing at the same time), we'll create one synth for each note available

    for (let i = 0; i < count; i++) {

      let synth = new Tone.Sampler({
        urls: {
          "D5": "D5-kopfnuss.mp3",
          "B4": "B4-Kopfnuss.mp3",
          "F#5": "Fis5-Kopfnuss.mp3",
          "A#4": "Ais4-Kopfnuss.mp3",
          "C1": "hihat-handfurz.mp3",
          "C2": "closed-hihat-sreicheln.mp3",
          "D1": "bass-schlucken.mp3",
        },
        fadeOut: "8n",
        baseUrl: "assets/sounds/"
      }).toDestination();



      synths.push(synth);
    }

    return synths;
  };

  let makeGrid = (notes) => {
    // "notation" consist of an array with 6 sub arrays
    // each sub array corresponds to one row in our sequencer grid

    // parent array to hold each row subarray
    let rows = [];

    for (let note of notes) {
      // declare the subarray
      let row = [];
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

    // we now have sequencer rows each containing 16 eighth notes
    //console.log(rows);
    return rows;
  };

  let synths = makeSynths(10);

  // declaring the notes for each row
  let notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C1", "C2", "C1", "D1"];
  let grid = makeGrid(notes);
  //console.log(grid)
  let beat = 0;
  let playing = false;
  let started = false;
  /*---------------------------- define sequencer -----------------------*/

  let makeSequencer = () => {
    let sequencer = document.getElementById("sequencer");
    //console.log(grid)
    grid.forEach((row, rowIndex) => {
      let seqRow = document.createElement("div");
      seqRow.id = `rowIndex`;
      seqRow.className = "sequencer-row";
      //console.log(row);
      row.forEach((note, noteIndex) => {

        let button = document.createElement("button");
        button.className = "note"
        if (rowIndex >= 6) {
          button.setAttribute("id", "beat-color")
        }
        button.addEventListener("click", function (e) {
          handleNoteClick(rowIndex, noteIndex, e);

        });
        grid[rowIndex][noteIndex].HTMLElement = button

        seqRow.appendChild(button);
      });

      sequencer.appendChild(seqRow);
    });
  };

  let handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((note, noteIndex) => {
        if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
          note.isActive = !note.isActive;
          e.target.className = classNames(
            "note", { "note-is-active": !!note.isActive }, { "note-not-active": !note.isActive },

          );
        }
      });
    });
  };
  /*---------------------------- play buton -----------------------*/

  let configPlayButton = () => {
    let button = document.getElementById("play-button");
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
  configPlayButton();
  makeSequencer();
  /*window.addEventListener("DOMContentLoaded", () => {
      configPlayButton();
      makeSequencer();
  });*/
  /*---------------------------- clear buton -----------------------*/
  let btnRemoveClass = document.getElementById("clear-button");
  let removeActiveClass = () => {
    let activeElements = document.getElementsByClassName('note-is-active');
    for (let activeElement of activeElements) {
      activeElement.classList.remove('note-is-active');
    }
  };

  btnRemoveClass.addEventListener('click', (e) => {
    let button2 = document.getElementById("play-button");
    let button = document.getElementById("clear-button");
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        grid[x][y].isActive = false;
        button.innerText = "clear grid";
        button2.innerText = "Play";
        button2.classList.remove("active-button");
        removeActiveClass();
        Tone.Transport.stop()
        playing = false;
      }
    }
  });
  /*---------------------------- bpm slider -----------------------*/

  document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
  })

  /*------------------------------ loop ---------------------------*/

  let configLoop = () => {

    let repeat = (time) => {
      grid.forEach((row, index) => {
        let synth = synths[index];
        let note = row[beat];
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
          let a = row[beat].HTMLElement;
          a.classList.add("glow-animation")
          setTimeout(() => { a.classList.remove("glow-animation") }, 300);
        }
      });

      beat = (beat + 1) % sequencerWidth;
    };

    Tone.Transport.bpm.value = 130; // default bpm value
    Tone.Transport.scheduleRepeat(repeat, "8n");
  };
  return
}

function smallSequencer() {
  console.log("small sequencer is active")

  let sequencerWidth = 8
  let makeSynths = (count) => {
    // declare array to store synths
    let synths = [];

    // each synth can only play one note at a time.
    // for polyphony (multiple notes playing at the same time), we'll create one synth for each note available

    for (let i = 0; i < count; i++) {

      let synth = new Tone.Sampler({
        urls: {
          "F#4": "Fis4-pfeifen.mp3",
          "A4": "A4-pfeifen.mp3",
          "D4": "D4-pfeifen.mp3",
          "A3": "A3-pfeifen.mp3",
          "C1": "hihat-handfurz.mp3",
          "C2": "closed-hihat-sreicheln.mp3",
          "D1": "bass-schlucken.mp3",
        },
        fadeOut: "8n",
        baseUrl: "assets/sounds/"
      }).toDestination();



      synths.push(synth);
    }

    return synths;
  };

  let makeGrid = (notes) => {
    // "notation" consist of an array with 6 sub arrays
    // each sub array corresponds to one row in our sequencer grid

    // parent array to hold each row subarray
    let rows = [];

    for (let note of notes) {
      // declare the subarray
      let row = [];
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
    //console.log(rows);
    // we now have sequencer rows each containing 16 eighth notes
    return rows;
  };

  let synths = makeSynths(8);

  // declaring the notes for each row
  let notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C1", "D1"];
  let grid = makeGrid(notes);
  //console.log(grid)
  let beat = 0;
  let playing = false;
  let started = false;
  /*---------------------------- define sequencer -----------------------*/

  let makeSequencer = () => {
    let sequencer = document.getElementById("sequencer");
    //console.log(grid)
    grid.forEach((row, rowIndex) => {
      let seqRow = document.createElement("div");
      seqRow.id = `rowIndex`;
      seqRow.className = "sequencer-row";
      //console.log(row);
      row.forEach((note, noteIndex) => {

        let button = document.createElement("button");
        button.className = "note"
        if (rowIndex >= 6) {
          button.setAttribute("id", "beat-color")
        }
        button.addEventListener("click", function (e) {
          handleNoteClick(rowIndex, noteIndex, e);

        });
        grid[rowIndex][noteIndex].HTMLElement = button

        seqRow.appendChild(button);
      });

      sequencer.appendChild(seqRow);
    });
  };

  let handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((note, noteIndex) => {
        if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
          note.isActive = !note.isActive;
          e.target.className = classNames(
            "note", { "note-is-active": !!note.isActive }, { "note-not-active": !note.isActive },

          );
        }
      });
    });
  };
  /*---------------------------- play buton -----------------------*/

  let configPlayButton = () => {
    let button = document.getElementById("play-button");
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
  configPlayButton();
  makeSequencer();
  /*window.addEventListener("DOMContentLoaded", () => {
      configPlayButton();
      makeSequencer();
  });*/
  /*---------------------------- clear buton -----------------------*/
  let btnRemoveClass = document.getElementById("clear-button");
  let removeActiveClass = () => {
    let activeElements = document.getElementsByClassName('note-is-active');
    for (let activeElement of activeElements) {
      activeElement.classList.remove('note-is-active');
    }
  };

  btnRemoveClass.addEventListener('click', (e) => {
    let button2 = document.getElementById("play-button");
    let button = document.getElementById("clear-button");
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        grid[x][y].isActive = false;
        button.innerText = "clear grid";
        button2.innerText = "Play";
        button2.classList.remove("active-button");
        removeActiveClass();
        Tone.Transport.stop()
        playing = false;
      }
    }
  });
  /*---------------------------- bpm slider -----------------------*/

  document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
  })

  /*------------------------------ loop ---------------------------*/

  let configLoop = () => {

    let repeat = (time) => {
      grid.forEach((row, index) => {
        let synth = synths[index];
        let note = row[beat];
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
          let a = row[beat].HTMLElement;
          a.classList.add("glow-animation")
          setTimeout(() => { a.classList.remove("glow-animation") }, 300);
        }
      });

      beat = (beat + 1) % sequencerWidth;
    };

    Tone.Transport.bpm.value = 130; // default bpm value
    Tone.Transport.scheduleRepeat(repeat, "8n");
  };
}

let smallGridButton = document.getElementById("smallGridButton")
let bigGridButton = document.getElementById("bigGridButton")
var bigButtonActive = false
var smallButtonActive = true

// function clearAll() {
//   let playing = false;
//   let removeActiveClass = () => {
//     let activeElements = document.getElementsByClassName('note-is-active');
//     for (let activeElement of activeElements) {
//       activeElement.classList.remove('note-is-active');
//     }
//   };
//   let sequencerWidth = 10
//   let makeGrid = (notes) => {
//     // "notation" consist of an array with 6 sub arrays
//     // each sub array corresponds to one row in our sequencer grid

//     // parent array to hold each row subarray
//     let rows = [];

//     for (let note of notes) {
//       // declare the subarray
//       let row = [];
//       // each subarray contains multiple objects that have an assigned note
//       // and a boolean to flag whether they are "activated"
//       // each element in the subarray corresponds to one eigth note
//       for (let i = 0; i < sequencerWidth; i++) {
//         row.push({
//           note: note,
//           isActive: false,
//           HTMLElement: null
//         });
//       }
//       rows.push(row);
//     }

//     // we now have sequencer rows each containing 16 eighth notes
//     //console.log(rows);
//     return rows;
//   };
  
//   let notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C1", "C2", "C1", "D1"];
//   let grid = makeGrid(notes);
  
//   let button2 = document.getElementById("play-button");
//   let button = document.getElementById("clear-button");
//   for (let x = 0; x < grid.length; x++) {
//     for (let y = 0; y < grid[x].length; y++) {
//       grid[x][y].isActive = false;
//       button.innerText = "clear grid";
//       button2.innerText = "Play";
//       button2.classList.remove("active-button");
//       removeActiveClass();
//       Tone.Transport.stop()
//       playing = false;
//     }
//   }
// };


smallGridButton.addEventListener('click', function () {
  Tone.Transport.stop()
  // clearAll()
  smallButtonActive = true
  bigButtonActive = false
  smallGridButton.classList.add("activeSmallGridButton")
  bigGridButton.classList.remove("activeBigGridButton")
  var children = document.getElementById("sequencer");
  let anz = children.childElementCount;
  for (let i = 0; i < anz; i++) { //console.log(children.lastChild.nodeType)
    if (children.lastChild.nodeType === 1) {
      if (children.lastChild.classList.contains("sequencer-row")) {
        children.removeChild(children.lastChild);
      }
    }

  }
  smallSequencer()
  console.log("you pushed the small button")
})


bigGridButton.addEventListener('click', function () {
  Tone.Transport.stop()
  // clearAll()
  smallButtonActive = false
  bigButtonActive = true
  bigGridButton.classList.add("activeBigGridButton")
  smallGridButton.classList.remove("activeSmallGridButton")
  var children = document.getElementById("sequencer")
  let anz = children.childElementCount;
  for (let i = 0; i < anz; i++) { //console.log(children.lastChild.nodeType)
    if (children.lastChild.nodeType === 1) {
      if (children.lastChild.classList.contains("sequencer-row")) {
        console.log(grid)
        children.removeChild(children.lastChild);
      }
    }

  }
  bigSequencer()
  
 // console.log("you pushed the big button")
})

if (smallButtonActive = true) {
  smallSequencer()
  // console.log("small button is active")
}

/*---------------------------- randomize buton -----------------------*/

// document.getElementById("randomize-button").onclick = function randomizeGrid() {
//   console.log(grid)
//   for(let x = 0; x < grid.length; x++) {
//     for(let y = 0; y < grid[x].length; y++) {
//       if(Math.random() > 0.5) {
//         grid[x][y].isActive = true;
//       }
//     }
//   }
// }s