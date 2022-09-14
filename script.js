const DOMseconds = document.querySelector('#seconds')
const DOMminutes = document.querySelector('#minutes')
const relexButton = document.querySelector('#relexTime')
const alarmIcon = document.querySelector('#alarmIcon')
const roundBox = document.querySelector('.roundBox')
const points = document.querySelector('#points')

var pointsInterval;
var timeInterval;

// Função para colocar um zero a esquerda
function leftPad(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};

// Inserindo no HTML
const insertDOM = () => {
    DOMminutes.innerHTML = leftPad(minutes, 2)
    DOMseconds.innerHTML = leftPad(seconds, 2)
}


// Pegando o valor do time Study quando ele é alterado
const setTimeStudy = document.querySelector('#timeStudy');
const setTime = () => {
    minutes = setTimeStudy.value
    seconds = 0
    clearInterval(timeInterval)
    insertDOM()
    alarmIcon.classList.remove('animation')
    startButton.innerHTML = 'Start'
    roundBox.style.background = '#fd5555'
}
setTimeStudy.addEventListener('change', setTime);


// Botão de Start
const startButton = document.querySelector('#start')
const startTime = () => {      
    // Função para passar o tempo
    if(startButton.innerHTML == 'Start') {
        startButton.innerHTML = 'Pause'
        timeInterval = setInterval(() => {            
            if(seconds == 0) {
                seconds = 60
                minutes--
                DOMminutes.innerHTML = leftPad(minutes, 2)
            }            
            seconds--
            DOMseconds.innerHTML = leftPad(seconds, 2);  
            
            if(minutes < 0) {
                relexButton.style.display = 'block';
                alarmIcon.classList.add('animation');
            }
            
        }, 1000)

        // Animação dos pontos
        pointsInterval = setInterval(() => {
            if(points.style.opacity == '1') {
                points.style.opacity = '0'
            } else {
                points.style.opacity = '1'
            }
        }, 500);

    } else {
        clearInterval(timeInterval)
        clearInterval(pointsInterval)
        points.style.opacity = '1'
        startButton.innerHTML = 'Start';        
    }
}
startButton.addEventListener('click', startTime)

// Botão de Reset
const resetButton = document.querySelector('#reset')

const resetTime = () => {
    clearInterval(timeInterval)
    seconds = 0
    minutes = setTimeStudy.value
    DOMminutes.innerHTML = leftPad(minutes, 2)
    DOMseconds.innerHTML = leftPad(seconds, 2)
}
resetButton.addEventListener('click', resetTime)

// Botão Start Relex

const handleButtonRelex = () => {

    if(relexButton.innerHTML == 'Start Relex') {
        relexButton.innerHTML = 'Start Study'
        setTimeRelexFunc()
    } else {
        relexButton.innerHTML = 'Start Relex'
        setTime()
    }
    relexButton.style.display = 'none'
}

relexButton.addEventListener('click', handleButtonRelex)


// Pegando o tempo de relexar
const setTimeRelex = document.querySelector('#timeRelex');
const setTimeRelexFunc = () => {
    minutes = setTimeRelex.value
    seconds = 0
    clearInterval(timeInterval)
    insertDOM()
    startButton.innerHTML = 'Start'
    alarmIcon.classList.remove('animation')
    roundBox.style.background = '#80acff'
}
setTimeRelex.addEventListener('change', setTimeRelexFunc);





// Chamando as funções
setTime()
insertDOM()