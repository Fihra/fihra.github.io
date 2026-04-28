class Node {
    constructor(x, y, width, height, label, content, contentScroll, category) {
        this.el = createDiv(label);
        this.category = category;
        this.el.position(x, y);
        this.el.size(width, height);
        this.isNodeOn = true;
        this.isContentScrolling = contentScroll;

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
        this.closeButton.style('left', '94%');
        this.closeButton.style('padding', '3px 3px');
        this.closeButton.style('border-radius', '5px');

        this.closeButton.mousePressed(() => this.onClose());


        // this.contentText = (typeof content === "string" && content.startsWith("http"))? this.setupIFrame(content) : createP(content);
        
        this.contentText = this.checkContent(content);

        this.contentText.style('color', 'white');
        
        
        this.contentText.parent(this.el);

        this.el.draggable();
    }

    // <i class="fa-brands fa-linkedin-in"></i>

    checkContent(content) {
        console.log("inside checkContent");

        if(this.category === "contact"){
            let newContent = `
            <a href="https://instagram.com" target="_blank"><i class="fa fa-instagram" style="font-size:36px"></i></a>
            <a href="https://linkedin.com" target="_blank"><i class="fa-brands fa-linkedin" style="font-size:36px"></i></a>
            `;
            return createP(newContent);
        }

        if(typeof content === "string" && content.startsWith("http")) {
            return this.setupIFrame(content);
        } else {
            return createP(content);
        }

    }

    // checkContent(content){
    //     if(this.category === "contact"){
    //         console.log("hiel?");
    //         this.contentText = "hi hi ";
    //     }
    //     createP(content);
    // }

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

    showOutlet(){
        if(this.category === "about"){
            console.log("the x: ", this.el.position().x);
            console.log("the y: ", this.el.position().y);
        }

        rect(this.el.position().x, this.el.position().y + 100, 50, 100, 1);
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