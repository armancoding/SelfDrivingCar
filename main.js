const canvas  = document.getElementById("myCanvas");
canvas.width = 400;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width);
const traffic =[
    new Car(road.getLaneCenter(1),-100,60,100, "DUMMY", 5)  
];
const car = new Car(road.getLaneCenter(1),500, 60, 100, "KEYS");


animate();

function animate()
{
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height*.7);

    road.draw(ctx);
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].draw(ctx, "blue");
    }
    car.draw(ctx, "yellow");


    ctx.restore();
    requestAnimationFrame(animate);
}