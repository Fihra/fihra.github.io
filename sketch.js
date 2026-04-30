let name = "Fihra";
let title = "F              i             h              r             a            ";
// let hydra;
let aboutSection = "Welcome to my digital garden. I do creative coding & music/audio."

let allNodes = [];
let projectsData;

let lastNodePosition;

let cables = [];
let draggableCable = null;

let socialMedias;

let isDrawing = false;
let lastDrawingState = isDrawing;
let startX, startY;
let endX, endY;

async function setup() {
    createCanvas(windowWidth, windowHeight);

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
    // console.log(lastNodePosition);

    let strudelUIButton = createDiv();
    strudelUIButton.size(100, 40);
    strudelUIButton.position(lastNodePosition.x, lastNodePosition.y);
    strudelUIButton.addClass("nav-btn");

    let strudelButtonText = createP("more strudel");
    strudelButtonText.style("margin-top", "7px");
    strudelButtonText.style('font-size', "12px");
    strudelButtonText.parent(strudelUIButton);

    strudelUIButton.mousePressed(() => {
        window.open("https://fihra.github.io/strudel-showcase/", "_blank");
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

function draw() {
  background(220);
  text(name, width/2, height/2);

  let firstChar = title.charAt(0);
  let remainingText = title.substring(1);
  title = remainingText + firstChar;

  document.title = title;

  background(0);
  fill(255);

  if(isDrawing){
    stroke(255);
    strokeWeight(5);
    // line(pmouseX, pmouseY, mouseX, mouseY);
    line(startX, startY, mouseX, mouseY);
  }

    for(let i = 0; i < allNodes.length; i++){
        if(allNodes[i].isNodeOn){
            allNodes[i].el.show();
            allNodes[i].showInlet();
            allNodes[i].showOutlet();
            allNodes[i].showContent();
        }

        // let uiButton = createButton(allNodes[i].category);
        // uiButton.size(100, 80);

    }

//   hydra.osc().out();


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){


    console.log("startX: ", startX);
    console.log("startY: ", startY);


    for(let i = 0; i <allNodes.length; i++){
        if(allNodes[i].isNodeOn){
            if(allNodes[i].isOnInlet){
                lastIsDrawing = isDrawing;
                isDrawing = !isDrawing;


                if(lastIsDrawing){ 
                    console.log("finished line");
                    endX = mouseX;
                    endY = mouseY;

                    let mainOutletPosition = {x: allNodes[i].el.position().x, y: allNodes[i].el.position + allNodes[i].el.height};
                    // console.log(`Starting: ${startX}, ${startY}`);
                    console.log("mainInletPosition: ", mainOutletPosition);

                }


                if(isDrawing){
                    startX = mouseX;
                    startY = mouseY;
                    let mainInletPosition = {x: allNodes[i].el.position().x, y: allNodes[i].el.position().y};
                    // console.log(`Starting: ${startX}, ${startY}`);
                    console.log("mainInletPosition: ", mainInletPosition);
                }



                console.log("mouse is on inlet");
                console.log("is drwaing: ", isDrawing);
            }
        }
    }
}