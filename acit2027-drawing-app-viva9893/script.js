const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height=300;
canvas.width=923;

let penColor = "#000000"; // De pen color
let brushSize = 5;//de pen size

let isDrawing = false;

canvas.addEventListener('mousedown',  () =>{

    isDrawing = true
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = penColor;
    ctx.lineCap='round';
    // ctx.arc(event.offsetX, event.offsetY, 20, 0, 2 * Math.PI)
    // ctx.fillStyle = "black";
    // ctx.fill();
    
    // ctx.stroke();
});

canvas.addEventListener('mousemove', e =>{
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

});
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    undoStack.push(canvas.toDataURL());
});

   // Pen color 
   const penInput = document.getElementById('pen');
   penInput.addEventListener('input', () => {
       penColor = penInput.value;
   });

   // Brush size 
   const brushSizeInput = document.getElementById('brushSize');
   brushSizeInput.addEventListener('input', () => {
       brushSize = brushSizeInput.value;
   });


    // Clear Canvas Button
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    });





    // save

const save = document.getElementById('save');

save.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download=`${Date.now()}.jpg`;
    link.href=canvas.toDataURL();
    link.click();
})




// Undo Button
const undoButton = document.getElementById('goBack');
undoButton.addEventListener('click', () => {
    if (undoStack.length > 1) { redoStack.push(undoStack.pop()); 
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = undoStack[undoStack.length - 1];
    }
});

// Undo and Redo stacks
let undoStack = [canvas.toDataURL()];
let redoStack = [];


// code that will draw a line
// ctx.moveTo(0,0);
// ctx.lineTo(500,500);
// ctx.stroke();

//code that will draw a circle
// ctx.beginPath();
// // arc(x, y, radius, startAngle(radians), endAngle(radians)
// ctx.arc(250, 250, 150, 0, 2 * Math.PI)
// ctx.stroke();

// drawing a rectangle
// ctx.moveTo(70, 30);
// ctx.lineTo(210, 30);
// ctx.lineTo(210, 490);
// ctx.lineTo(70, 490);
// ctx.lineTo(70,30);
// ctx.stroke();

// drawing a rectangle, but cool B)
// rect (x, y, width, height)
// ctx.rect(220, 30, 100, 100);
// ctx.stroke();




