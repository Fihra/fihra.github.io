let name = "Fihra";
let title = "F              i             h              r             a            ";
// let hydra;
let aboutSection = "Welcome to my digital garden. I do creative coding & game music/audio."

let allNodes = [];
let projectsData;

let lastNodePosition;

let cables = [];
let draggableCable = null;
let draggingFrom = null;

let socialMedias;

let isDrawing = false;
let lastDrawingState = isDrawing;
let startX, startY;
let endX, endY;

let isTogglePulseOn = false;
let bpm = 140;
let beatInterval = 60000 / bpm;
let lastBeat = 0;

let beatSize = 0;

function contextMenu(event){
    event.preventDefault();

    console.log("hi");
}

async function setup() {
    createCanvas(windowWidth, windowHeight);

    document.addEventListener("contextmenu", contextMenu);

    projectsData = await loadJSON("data.json");

    socialMedias = [
        {"url": "https://www.instagram.com/fihra.creates/", "icon": "images/instagram-brand.svg", "name": "instagram"},
        {"url": "https://www.linkedin.com/in/fabian-fabro/", "icon": "images/linkedin-brand.svg", "name": "linkedIn"},
        // {"url": "https://tiktok.com", "icon": "images/tiktok-brand.svg", "name": "tiktok"}
    ]

    let strudelCode = "https://strudel.cc/#CnNldGNwbSgxNDAvNCkKCmNvbnN0IGNNaW5vciA9ICgiYzptaW5vciIpCgpsZXQgc2VxdWVuY2VBID0gYAogIDxDNCBFYjQgRzQgQmI0CiAgRjQgRzQgQmI0IEM1PgogIDxENSBDNSBCYjQgRzQKICBBYjQgRjQgRzQgQmI0PgpgCgpsZXQgYmFzc05vdGVzID1gCiAgW0MyIC0gLSBDMiAtIC0gQzIgLV0KYAoKCiRtZWxvZHk6bm90ZShzZXF1ZW5jZUEpLmZhc3QoMikuc2VnbWVudCg4KS5zb3VuZCgicGlhbm8iKS5fcGlhbm9yb2xsKCkKCiRiYXNzOm5vdGUoYmFzc05vdGVzKS5zb3VuZCgicGlhbm8iKS5fcGlhbm9yb2xsKCkKCgokOnNvdW5kKCJoaCIpLmJlYXQoIjAsIDEsIDQsIDYsIDcsIDgsIDEwLCAxMSwgMTMsIDE1IiwgMTYpLl9zY29wZSgpCgokOnNvdW5kKCJzZCIpLmJlYXQoIjIsIDMuNSwgNi41IiwgOCkuZGVsYXkoMC40NSkuX3Njb3BlKCkKCgokOnNvdW5kKCJiZCIpLmJlYXQoIjAsIDIsIDQsIDUuNCwgNyIsIDgpLl9zY29wZSgp";

    let bandcampMusic = {title: "Never Good Enough by FirahFabe", src: "https://bandcamp.com/EmbeddedPlayer/album=509225415/size=small/bgcol=333333/linkcol=2ebd35/transparent=true/", link: "https://firahfabe.bandcamp.com/album/never-good-enough"};

    let nameNode = new Node(500, 70, 300, 100, "Fihra", "Creative Technologist | Game Audio | Rondalla & Kulintang Musician | Composer", true, "name");

    let aboutNode = new Node(300, 300, 300, 150, "About", aboutSection, false, "about");

    let projectsNode = new Node(800, 100, 500, 400, "Projects", projectsData, false, "projects");

    let musicNode = new Node(100, 400, 400, 100, "Music", bandcampMusic, false, "music");

    let strudelNode = new Node(800, 400, 400, 400, "Strudel", strudelCode, false, "strudel");

    let contactNode = new Node(100, 100, 120, 80, "Contact", socialMedias, false, "contact");

    allNodes.push(nameNode);
    allNodes.push(aboutNode);
    allNodes.push(projectsNode);
    allNodes.push(musicNode);
    allNodes.push(strudelNode);
    allNodes.push(contactNode);

    for(let i = 0; i < allNodes.length; i++){
        if(i + 1 === allNodes.length){
            lastNodePosition = {x: (i + 1) * 120 + 20, y: 10};
        }
        let uiButton = createDiv();
        uiButton.size(100, 40);
        uiButton.position(i* 120 + 20, 10);
        uiButton.addClass("nav-btn");

        let buttonText = createP(allNodes[i].category);
        buttonText.parent(uiButton);

        uiButton.mousePressed(() => {
            allNodes[i].isNodeOn = true;
        });
    }

    let strudelUIButton = createDiv();
    strudelUIButton.size(100, 40);
    strudelUIButton.position(lastNodePosition.x, lastNodePosition.y);
    strudelUIButton.addClass("nav-btn");

    lastNodePosition = {x: strudelUIButton.x + 120, y: 10};

    let strudelButtonText = createP("more strudel");
    strudelButtonText.style("margin-top", "7px");
    strudelButtonText.style('font-size', "12px");
    strudelButtonText.parent(strudelUIButton);

    strudelUIButton.mousePressed(() => {
        window.open("https://fihra.github.io/strudel-showcase/", "_blank");
    })

    let togglePulseButtonContainer = createDiv();
    togglePulseButtonContainer.size(100, 40);
    togglePulseButtonContainer.position(lastNodePosition.x, lastNodePosition.y + 5);



    let togglePulseButton = createButton("X");
    togglePulseButton.parent(togglePulseButtonContainer);

    togglePulseButton.style("background-color", "black");
    togglePulseButton.style("color", "#505050");

    togglePulseButton.mousePressed(() => {
        isTogglePulseOn = !isTogglePulseOn;

        styleToggleButton(togglePulseButton);

    })



//   const hCanvas = document.getElementById("hydra-canvas");
//   hCanvas.width = width;
//   hCanvas.height = height;

//   hydra = new Hydra({
//     canvas: hCanvas,
//     makeGlobal: false
//   }).synth;
//   hydra.s0.init({ src: p5Canvas.elt});
}

function styleToggleButton(btn){
    if(isTogglePulseOn){
        btn.style("color", "white");
    } else {
        btn.style("color", "#505050");
    }
}

function getConnectedNodes(sourceNode){
    let visited = new Set();
    let queue = [sourceNode];
    visited.add(sourceNode);

    while(queue.length > 0){
        let current = queue.shift();
        for(let cable of cables){
            if(cable.from === current && !visited.has(cable.to)){
                visited.add(cable.to);
                queue.push(cable.to);
            }
        }
    }
    visited.delete(sourceNode);
    return visited;
}

function draw() {
  background(220);
  text(name, width/2, height/2);

  let firstChar = title.charAt(0);
  let remainingText = title.substring(1);
  title = remainingText + firstChar;

  document.title = title;

  background(0);
  fill(255);

  if(navigator.mediaSession.playbackState === "playing"){
    console.log("media is active");
  }


  for(let cable of cables){
    if(cable.from.isNodeOn && cable.to.isNodeOn){
        let a = cable.from.getOutletPos();
        let b = cable.to.getInletPos();
        stroke(255);
        strokeWeight(2);
        noFill();
        bezier(a.x, a.y, a.x, a.y + 60, b.x, b.y - 60, b.x, b.y);
    }

  }

  if(isDrawing){

    stroke(255, 200, 0);
    strokeWeight(2);
    noFill();
    bezier(startX, startY, startX, startY + 60, mouseX, mouseY - 60, mouseX, mouseY);

  }

    for(let i = 0; i < allNodes.length; i++){
        if(allNodes[i].isNodeOn){
            allNodes[i].el.show();
            allNodes[i].showInlet();
            allNodes[i].showOutlet();
            allNodes[i].showContent();
        }

        if(allNodes[i].category === "name" && isTogglePulseOn){
            if(millis() - lastBeat > beatInterval){
                lastBeat = millis();
                beatSize = 10;
                
            } else {
                beatSize = lerp(beatSize, 0, 0.12);
            }

            allNodes[i].applyPulse(beatSize);

            let connected = getConnectedNodes(allNodes[i]);
            for(let node of connected){
                node.applyPulse(beatSize);
            }

            for(let node of allNodes){
                if(node !== allNodes[i] && !connected.has(node)){
                    node.applyPulse(0);
                }
            }
        }

        if(allNodes[i].category === "name" && !isTogglePulseOn){
            beatSize = 0;
            for(let node of allNodes){
                node.applyPulse(0);
            }
        }
    }

//   hydra.osc().out();


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
    for(let i = 0; i < allNodes.length; i++) {
        if(allNodes[i].isNodeOn && allNodes[i].isOnOutlet){
            draggingFrom = allNodes[i];
            startX = allNodes[i].getOutletPos().x;
            startY = allNodes[i].getOutletPos().y;
            isDrawing = true;
        }
    }
}

function mouseReleased(){
    if(!isDrawing || !draggingFrom) return;

    for(let i = 0; i < allNodes.length; i++){
        let target = allNodes[i];
        if(target === draggingFrom) continue;
        if(!target.isNodeOn) continue;
        if(target.category === "name") continue;

        let inlet = target.getInletPos();

        if(dist(mouseX, mouseY, inlet.x, inlet.y) < 20) {
            cables.push({ from: draggingFrom, to: target});
            break;
        }
    }
    isDrawing = false;
    draggingFrom = null;
}

