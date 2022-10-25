const carCanvas  = document.getElementById("carCanvas");
carCanvas.width = 400;

const networkCanvas  = document.getElementById("networkCanvas");
networkCanvas.width = 600;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width);


const N = 200;
const ND = 5;

const cars = generateCars(N);
traffic = generateDummies(ND, -50);


let bestCar = cars[0];

if(localStorage.getItem("bestBrain"))
{
    for(let i = 0; i < cars.length; i++)
    {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(i != 0)
        {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}


animate();

function save()
{
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard()
{
    localStorage.removeItem("bestBrain");
}

function generateCars(N)
{
    const cars = [];
    for(let i =1; i <= N; i++)
    {
        cars.push(new Car(road.getLaneCenter(1), 100, 60, 100, "AI"));
    }
    return cars;
}

function generateDummies(N, best = 0)
{
    const traffic = [];
    let y = best - 300;
    for(let i =1; i <= N; i++)
    {
        y = y - 40 -100/(Math.random()+.2) ;
        traffic.push(new Car(road.getLaneCenter(Math.round(Math.random()*3)), y, 60, 100, "DUMMY", 5));
    }
    return traffic;
}

function animate(time)
{
    bestCar = cars.find(c=>c.y == Math.min(...cars.map(c=>c.y)));
    lastTraffic = traffic.find(c=>c.y == Math.min(...traffic.map(c=>c.y)));
    if(lastTraffic.y > (bestCar.y+200))
    {
        delete traffic;
        traffic = generateDummies(ND, bestCar.y);
    }

    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].update(road.borders, []);
    }

    for(let i = 0; i < cars.length; i++)
    {
        cars[i].update(road.borders, traffic);
    }
    
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height*.7);


    road.draw(carCtx);
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 0.2;
    for(let i = 0; i < cars.length; i++)
    {
        cars[i].draw(carCtx, "yellow");

    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "Orange", true)

    carCtx.restore();

    networkCtx.lineDashOffset = - time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}