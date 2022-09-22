const canvas  = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 400;

const ctx = canvas.getContext("2d");
const car = new Car(200,200, 60, 100);
car.draw(ctx);