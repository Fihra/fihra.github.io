let name = "Fihra";
// let hydra;

let allNodes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    let nameNode = new Node(500, 70, 300, 100, "Fihra", "Creative Technologist | Game Audio | Rondalla & Kulintang Musician | Composer", true, "name");

    let aboutNode = new Node(300, 300, 300, 300, "About", "Hi I'm Fihra, nice to meet you!", false, "about");

    let worksNode = new Node(500, 400, 400, 400, "Works", "Insert Woorks here", false, "works");

    let contactNode = new Node(100, 100, 200, 100, "Contact", "Email, LinkedIn, IG, TikTok", false, "contact");

    allNodes.push(nameNode);
    allNodes.push(aboutNode);
    allNodes.push(worksNode);
    allNodes.push(contactNode);

    for(let i = 0; i < allNodes.length; i++){
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

        // let uiButton = createButton(allNodes[i].category);
        // uiButton.size(100, 80);

    }

//   hydra.osc().out();


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
