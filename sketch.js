let name = "Fihra";
// let hydra;

let allNotes = [];

let nameNote;
let isNameNoteOn = true;
let nameNoteText;

let xPos = 0;
let speed = 0.6;

let testBtn;

function showNameNote(){
    nameNote = createDiv(name);
    nameNote.position(20, 20);
    nameNote.size(200, 200);
    nameNote.style('border', '2px solid #ccc');
    nameNote.style('box-shadow', '5px 5px 15px rgba(0,0,0,0.3)');
    nameNote.style('font-size', '20px');
    nameNote.style('background', 'green');
    nameNote.style('padding', '5px');
        nameNote.style('overflow', 'hidden');


    nameCloseButton = createButton('X');
    nameCloseButton.parent(nameNote);

    nameCloseButton.style('background-color', 'red');
    nameCloseButton.style('color', 'black');
    nameCloseButton.style('position', 'absolute');
    nameCloseButton.style('left', '85%');
    nameCloseButton.style('padding', '5px 5px');
    nameCloseButton.style('border-radius', '5px');

    nameNoteText = createP("Creative Technologist | Game Audio | Rondalla & Kulintang Musician | Composer");
    nameNoteText.style('color', 'white');
    nameNoteText.style('position', 'absolute');
    nameNoteText.style('white-space', 'nowrap');
    nameNoteText.parent(nameNote);

    nameCloseButton.mousePressed(() => {
        console.log('hit name close btn');
        console.log(isNameNoteOn);
        nameNote.hide();
        isNameNoteOn = false;
    });

    nameNote.draggable();
}

function setup() {
    createCanvas(windowWidth, windowHeight);


    testBtn = createButton('Show Name');
    testBtn.mousePressed(() => {
        console.log('hit test button');
        console.log(isNameNoteOn);
        isNameNoteOn = true;
});
    
  
    showNameNote();


//   const hCanvas = document.getElementById("hydra-canvas");
//   hCanvas.width = windowWidth;
//   hCanvas.height = windowHeight;

//   hydra = new Hydra({
//     canvas: hCanvas,
//     makeGlobal: false
//   }).synth;
// //   hydra.s0.init({ src: p5Canvas.elt});
}

function draw() {
  background(220);
//   text(name, windowWidth/2, windowHeight/2);
  text(name, width/2, height/2);


  background(0);
  fill(255);

//   nameNoteText.style('left')

    if(isNameNoteOn){
        nameNote.show();
    } 

    xPos -= speed;
    let textWidth = nameNoteText.width;
    if(xPos < -textWidth){
        xPos = nameNote.width;
    }
    nameNoteText.style('left', `${xPos}px`);

//   ellipse(mouseX, mouseY, 50, 50);

//   hydra.osc().out();


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

