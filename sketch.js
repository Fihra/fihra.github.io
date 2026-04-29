let name = "Fihra";
// let hydra;
let aboutSection = "Welcome to my digital garden. I do creative coding and music/audio."

let allNodes = [];

let lastNodePosition;

// U+
const emailIcon = "\u{02709}";

function setup() {
    createCanvas(windowWidth, windowHeight);

    let strudelCode = "https://strudel.cc/#CnNldGNwbSgxNDAvNCkKCmNvbnN0IGNNaW5vciA9ICgiYzptaW5vciIpCgpsZXQgc2VxdWVuY2VBID0gYAogIDxDNCBFYjQgRzQgQmI0CiAgRjQgRzQgQmI0IEM1PgogIDxENSBDNSBCYjQgRzQKICBBYjQgRjQgRzQgQmI0PgpgCgpsZXQgYmFzc05vdGVzID1gCiAgW0MyIC0gLSBDMiAtIC0gQzIgLV0KYAoKCiRtZWxvZHk6bm90ZShzZXF1ZW5jZUEpLmZhc3QoMikuc2VnbWVudCg4KS5zb3VuZCgicGlhbm8iKS5fcGlhbm9yb2xsKCkKCiRiYXNzOm5vdGUoYmFzc05vdGVzKS5zb3VuZCgicGlhbm8iKS5fcGlhbm9yb2xsKCkKCgokOnNvdW5kKCJoaCIpLmJlYXQoIjAsIDEsIDQsIDYsIDcsIDgsIDEwLCAxMSwgMTMsIDE1IiwgMTYpLl9zY29wZSgpCgokOnNvdW5kKCJzZCIpLmJlYXQoIjIsIDMuNSwgNi41IiwgOCkuZGVsYXkoMC40NSkuX3Njb3BlKCkKCgokOnNvdW5kKCJiZCIpLmJlYXQoIjAsIDIsIDQsIDUuNCwgNyIsIDgpLl9zY29wZSgp";

    let nameNode = new Node(500, 70, 300, 100, "Fihra", "Creative Technologist | Game Audio | Rondalla & Kulintang Musician | Composer", true, "name");

    let aboutNode = new Node(300, 300, 300, 150, "About", aboutSection, false, "about");

    let musicNode = new Node(100, 400, 100, 100, "Music", "Music Player", false, "music");

    let strudelNode = new Node(500, 400, 400, 400, "Strudel", strudelCode, false, "strudel");

    let contactNode = new Node(100, 100, 200, 100, "Contact", "Email, LinkedIn, IG, TikTok", false, "contact");

    // let contactNode = new Node(100, 100, 200, 100, "Contact", `

    //         <a "href="https://instagram.com"><i class="fa fa-instagram" style="font-size:36px"></i></a>
    //     `, false, "contact");

    allNodes.push(nameNode);
    allNodes.push(aboutNode);
    allNodes.push(musicNode);
    allNodes.push(strudelNode);
    allNodes.push(contactNode);

    for(let i = 0; i < allNodes.length; i++){
        // console.log("i: ", i);
        if(i + 1 === allNodes.length){
            // console.log("hit");
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


  background(0);
  fill(255);

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
