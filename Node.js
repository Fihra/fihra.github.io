class Node {
    constructor(x, y, width, height, label, content, contentScroll, category) {
        this.el = createDiv(label);
        this.category = category;
        this.el.position(x, y);
        this.el.size(width, height);
        this.baseWidth = width;
        this.baseHeight = height;
        this.baseX = x;
        this.baseY = y;
        this.isNodeOn = true;
        this.isContentScrolling = contentScroll;

        this.xPos = 0;
        this.textSpeed = 0.6;

        this.isDragging = false;

        this.el.style('border', '2px solid #ccc');
        // this.el.style("box-sizing", "border-box");
        this.el.style('box-shadow', '5px 5px 15px rgba(0,0,0,0.3)');
        this.el.style('font-size', '20px');
        this.el.style('background', 'green');
        this.el.style('color', 'white');
        this.el.style('padding', '5px');
        this.el.style('overflow', this.category === "projects" ?  "auto" :'hidden');

        this.closeButton = createButton('X');
        this.closeButton.parent(this.el);
        this.closeButton.style('background-color', 'red');
        this.closeButton.style('color', 'black');
        this.closeButton.style('padding', '2px 2px');
        this.closeButton.style('border-radius', '5px');
        this.closeButton.position(width - 10, 5);

        this.closeButton.mousePressed(() => this.onClose());

        this.titleBar = createDiv();
        this.titleBar.parent(this.el);
        this.titleBar.style("width", "calc(100% + 12px)");
        this.titleBar.style("height", "2px");
        this.titleBar.style("background", "#ccc");
        this.titleBar.style("margin-top", "4px");
        this.titleBar.style("margin-left", "-5px");
        this.titleBar.style("margin-right", "-5px");

        // this.contentText = (typeof content === "string" && content.startsWith("http"))? this.setupIFrame(content) : createP(content);
        
        this.contentText = this.checkContent(content);
        this.contentText.style('color', 'white');
        this.contentText.parent(this.el);

        this.isLineDrawing = false;
        this.isOnInlet = false;
        this.isOnOutlet = false;

        this.inletPosition = {x: this.el.position().x, y: this.el.position().y - 5, width: 20, height: 10};
        this.outletPosition = {x: this.el.position().x, y: this.el.position().y + this.el.height, width: 20, height: 20};

        this.el.draggable();

        this.el.elt.addEventListener("mousedown", () => {
            this.isDragging = true;
        });

        window.addEventListener("mouseup", () => {
            this.isDragging = false;
        });

        window.addEventListener("mousemove", () => {
            if(this.isDragging) {
                this.baseX = this.el.position().x;
                this.baseY = this.el.position().y;
            }
        })

    }

    applyPulse(amount){
        this.el.size(this.baseWidth + amount, this.baseHeight + amount);
        this.el.position(
            this.baseX - amount /2,
            this.baseY - amount/ 2
        )
    }

    // syncBasePos(){
    //     this.baseX = this.el.position().x + (this.el.width - this.baseWidth) /2;
    //     this.baseY = this.el.position().y + (this.el.height - this.baseHeight) /2;
    // }

    checkContent(content) {
        if(this.category === "contact"){
            let container = createDiv();

            for(let sm of content){
                let link = createElement("a");
                link.attribute("href", sm.url);
                link.attribute("target", "_blank");

                let icon = createImg(sm.icon, sm.name);
                icon.size(36, 36);
                icon.style("display", "inline-block");
                icon.style("margin", "5px");
                icon.parent(link);
                link.parent(container);
                
            }
            return container;
        }

        if(this.category === "music"){
            let container = createDiv();
            container.style("width", "100%");

            let frame = createElement("iframe");
            frame.attribute("src", content.src);
            frame.attribute("seamless", "");
            frame.attribute("width", "100%");
            frame.attribute("height", "42px");
            frame.style("border", "0");
            frame.style("display", "block");
            frame.style("margin-bottom", "6px");
            frame.parent(container);

            return container;

        }

        if(this.category === "projects"){
            let container = createDiv();

            for(let project of content.projects){
                let projectDiv = createDiv();

                console.log("project: ", project);

                let header = createElement("h4", project.title);
                let description = createP(project.description);

                header.parent(projectDiv);
                description.parent(projectDiv);

                projectDiv.parent(container);

                // console.log(project);
            }
            return container;
        }

        if(typeof content === "string" && content.startsWith("http")) {
            return this.setupIFrame(content);
        } else {
            return createP(content);
        }

    }

    setupIFrame(content) {
        let myIframe = createElement("iframe");

        myIframe.attribute('src', content);
        myIframe.attribute("width", "100%");
        myIframe.attribute("height", "420");
        myIframe.attribute('frameborder', '0');
        myIframe.attribute("allow", "autoplay; microphone");
        myIframe.style("display", "block");
        return myIframe;
    }

    onClose(){
        console.log('hit close btn');
        this.el.hide();
        this.isNodeOn = false;
    }

    getInletPos(){
        return {
            x: this.el.position().x + 10,
            y: this.el.position().y - 5
        };
    }

    getOutletPos(){
        return{
            x: this.el.position().x + 10,
            y: this.el.position().y + this.el.height + 10
        };
    }

    showInlet(){
        if(this.category !== "name"){
            if(mouseX > this.el.position().x && mouseX < this.el.position().x + 20 && mouseY > this.el.position().y - 20 && mouseY < this.el.position().y + 20) {
                fill("red");
                stroke(20);
                this.isOnInlet = true;

            } else {
                fill("blue");
                stroke(20);
                this.isOnInlet = false;
            }
            rect(this.el.position().x, this.el.position().y - 5, 20, 10, 1);
        }      
    }

    showOutlet(){
        const p = this.getOutletPos();
        if(mouseX > p.x - 10 && mouseX < p.x + 19 && mouseY > p.y - 10 && mouseY < p.y + 10){
            fill("green");
            this.isOnOutlet = true;
        } else {
            fill("orange");
            this.isOnOutlet = false;
        }
        rect(this.el.position().x, this.el.position().y + this.el.height, 20, 20, 1);

        // if(mouseX > this.el.position().x && mouseX < this.el.position().x + 20 && mouseY > this.el.position().y - 20 && mouseY < this.el.position().y + this.el.height) {
        //     fill("green");
        //     this.isOnOutlet = true;
        // } else {
        //     fill("orange");
        //     this.isOnOutlet = false;
        // }
        // rect(this.el.position().x, this.el.position().y + this.el.height, 20, 20, 1);
    }

    showContent(){
        if(this.isContentScrolling){
            this.xPos -= this.textSpeed;
            let textWidth = this.contentText.width;
            if(this.xPos < -textWidth){
                this.xPos = this.el.width;
            }
            this.contentText.style('position', 'absolute');
            this.contentText.style('white-space', 'nowrap');
            this.contentText.style('left', `${this.xPos}px`);
        } 

    }
}