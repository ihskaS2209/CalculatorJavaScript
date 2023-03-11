let runningTotal =0;
let buffer = '0';  // to keep tracking what user is typing
let previousOperator = null; // to keep track what user has previously pressed
const screen = document.querySelector('.panel');

document.querySelector('.numbers-sign').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if(buffer === '0'){
        buffer = value;
    }else{
        buffer += value;
    }
}

function handleSymbol(value){
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = ' ' + runningTotal;
            runningTotal = 0;
            break;
        case '<--':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function rerender(){
    screen.innerText = buffer;
}

function handleMath(value){
    const intBuffer = parseInt(buffer); // representation of what on screen
    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    } else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    } else if(previousOperator === 'x'){
        runningTotal *= intBuffer;
    } else{
        runningTotal /= intBuffer;
    }
}