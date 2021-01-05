import {useEffect} from "react";
import {useSelector} from "react-redux";

export  const bubbling=(visuallyImpairedMode)=>{

    useEffect(() => {
        const canvas =  document.createElement("canvas");
        let width = canvas.width;
        let height = canvas.height;

        if (canvas.parentNode === null) {

            canvas.setAttribute("style", "background:transparent;opacity:0.2;position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;")



            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            document.body.appendChild(canvas);
        }
        var c = canvas.getContext('2d');


        var circleAmount = 5;

        var colorArray = [
            'rgba(0,145,239,0.8)',
            'rgba(255,222,0,0.8)',
        ];



//circle object
        function Circle(x, y, dx, dy, radius){
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

            this.draw = function(){
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
            }

            this.update = function(){

                if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }

                if (this.y + this.radius > innerHeight
                    || this.y - this.radius < 0) {

                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;



                this.draw();

            }

        }


        var circleArray = [];


        for (let i = 0; i < circleAmount; i++) {
            var radius = ( (() => 4 + Math.random() * width / 25)).call();
            var x = Math.random() * (window.innerWidth - radius * 2) + radius;
            var y = Math.random() * (window.innerHeight - radius * 2) + radius;
            var dx = (Math.random() - 0.5);
            var dy = (Math.random() - 0.5);

            circleArray.push(new Circle(x, y, dx, dy, radius));

        }

        function animate(){
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }
        }


        animate();
    }, [visuallyImpairedMode])

}
