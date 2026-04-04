let name = "Fihra";
// let hydra;

let allNodes = [];

let nameNote;
let isNameNoteOn = true;
let nameNoteText;

let nameNoteInlet;

let xPos = 0;
let speed = 0.6;

let showNameBtn;

class Node {
    constructor(x, y, width, height, label, content) {
        this.el = createDiv(label);
        this.el.position(x, y);
        this.el.size(width, height);
        this.isNodeOn = true;

        this.xPos = 0;
        this.textSpeed = 0.6;

        this.el.style('border', '2px solid #ccc');
        this.el.style('box-shadow', '5px 5px 15px rgba(0,0,0,0.3)');
        this.el.style('font-size', '20px');
        this.el.style('background', 'green');
        this.el.style('color', 'white');
        this.el.style('padding', '5px');
        this.el.style('overflow', 'hidden');

        this.closeButton = createButton('X');
        this.closeButton.parent(this.el);
        this.closeButton.style('background-color', 'red');
        this.closeButton.style('color', 'black');
        this.closeButton.style('position', 'absolute');
        this.closeButton.style('left', '85%');
        this.closeButton.style('padding', '5px 5px');
        this.closeButton.style('border-radius', '5px');

        this.closeButton.mousePressed(() => this.onClose());


        this.contentText = createP(content);
        this.contentText.style('color', 'white');
        this.contentText.style('position', 'absolute');
        this.contentText.style('white-space', 'nowrap');
        this.contentText.parent(this.el);

        this.el.draggable();
    }

    onClose(){
        console.log('hit close btn');
        this.el.hide();
        this.isNodeOn = false;
    }

    showInlet(){
        rect(this.el.position().x, this.el.position().y + 100, 20, 20, 1);
    }

    showContent(){
        this.xPos -= this.textSpeed;
        let textWidth = this.contentText.width;
        if(this.xPos < -textWidth){
            this.xPos = this.el.width;
        }
        this.contentText.style('left', `${this.xPos}px`);
    }
}

function showNameNote(){
    nameNote = createDiv(name);
    nameNote.position(500, 20);
    nameNote.size(300, 100);
    nameNote.style('border', '2px solid #ccc');
    nameNote.style('box-shadow', '5px 5px 15px rgba(0,0,0,0.3)');
    nameNote.style('font-size', '20px');
    nameNote.style('background', 'green');
    nameNote.style('color', 'white');
    nameNote.style('padding', '5px');
    nameNote.style('overflow', 'hidden');

    // nameNote.mouseClicked(() => nameNote.size(500, 500));

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
    let mainCanvas = createCanvas(windowWidth, windowHeight);

    // showNameBtn = createButton('Show Name');
    // showNameBtn.size(100, 40);
    // showNameBtn.position(10, 10);
    
    // showNameBtn.mousePressed(() => {
    //     console.log('hit test button');
    //     console.log(isNameNoteOn);
    //     isNameNoteOn = true;
    // });
    
    // showNameNote();

    let nameNode = new Node(500, 20, 300, 100, "Fihra", "Creative Technologist | Game Audio | Rondalla & Kulintang Musician | Composer");

    allNodes.push(nameNode);

//   const hCanvas = document.getElementById("hydra-canvas");
//   hCanvas.width = windowWidth;
//   hCanvas.height = windowHeight;

//   hydra = new Hydra({
//     canvas: hCanvas,
//     makeGlobal: false
//   }).synth;
// //   hydra.s0.init({ src: p5Canvas.elt});
}

function inlet(element){
    console.log("element: ", element);
    rect(element.x, element.y, 100, 20, 20, 1);
}

function draw() {
  background(220);
  text(name, width/2, height/2);


  background(0);
  fill(255);

    for(let i = 0; i < allNodes.length; i++){
        if(allNodes[i].isNodeOn){
            allNodes[i].el.show();
            allNodes[i].showInlet();
            allNodes[i].showContent();
        }
    }

    // if(isNameNoteOn){
    //     nameNote.show();
    //     rect(nameNote.position().x, nameNote.position().y + 100, 20, 20, 1);
    // } 

    // xPos -= speed;
    // let textWidth = nameNoteText.width;
    // if(xPos < -textWidth){
    //     xPos = nameNote.width;
    // }
    // nameNoteText.style('left', `${xPos}px`);

//   ellipse(mouseX, mouseY, 50, 50);
//   hydra.osc().out();


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

