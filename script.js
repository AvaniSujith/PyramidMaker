// let defaultDelay = 1000;
let isAnimating = false;
let isPaused = false;
let animationTimeouts = [];
let currentRowIndex = 0;
let currentDelay;


const continueBtn = document.getElementById('continue-btn');
const settingsBtn = document.getElementById('setting-btn');
const profileBtn = document.getElementById('user-btn');

const showInputBoxes = () => {
    const inputScreen = document.createElement('div');
    inputScreen.classList.add('screen');

    const headerContainer = document.createElement('div');
    const header = document.createElement('h2');
    headerContainer.classList.add('header-block');
    header.innerText = 'Let\'s Fill in Some Details';
    headerContainer.appendChild(header);

    const inputContainer = document.createElement('div');
    inputContainer.id = 'input-container';

    const createInput = (labelText, inputType, inputId, placeholder) => {
        const innerContainer = document.createElement('div');
        innerContainer.className = 'input-innerContainer';

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.placeholder = placeholder;

        innerContainer.appendChild(label);
        innerContainer.appendChild(input);
        return innerContainer;
    };

    const rowsInput = createInput('Number of rows', 'number', 'rows', 'Enter a number');
    const colorInput = createInput('Pick a color', 'color', 'colorInput', '');
    const delayInput = createInput('Delay (ms)', 'number', 'delayInput', 'Enter a number');

    const startButton = document.createElement('button');
    startButton.textContent = 'Start Animation';
    startButton.className = 'start-button';

    startButton.addEventListener('click', () => {
        const rows = parseInt(document.getElementById('rows').value);
        const color = document.getElementById('colorInput').value;
        const delay = parseInt(document.getElementById('delayInput').value);

        if (!rows || !color || !delay) {
            showErrorMessage('Missing information');
            return;
        }

        if(isNaN(rows)|| rows < 0 || rows > 40){
            showErrorMessage('Number of rows must be between 0 and 40');
            return;
        }

        const mainSection = document.querySelector('main');
        mainSection.innerHTML = '';

        currentDelay = delay;

        const delayController = createDelayController(delay);
        mainSection.appendChild(delayController);

        const pyramidContainer = document.createElement('div');
        pyramidContainer.id = 'pyramid';
        mainSection.appendChild(pyramidContainer);

        const pauseButton = document.createElement('button');
        pauseButton.textContent = 'Pause';
        pauseButton.className = 'pause-button';
        pauseButton.addEventListener('click', () => {
            if (isPaused) {
                isPaused = false;
                pauseButton.textContent = 'Pause';
                animateRows(color, currentDelay, currentRowIndex);
            } else {
                isPaused = true;
                pauseButton.textContent = 'Resume';
                animationTimeouts.forEach(timeout => clearTimeout(timeout));
                animationTimeouts = [];
            }
        });
        mainSection.appendChild(pauseButton);

        createPyramid(rows);
        isAnimating = true;
        isPaused = false;
        currentRowIndex = 0;
        animateRows(color, currentDelay, 0);
    });

    inputContainer.appendChild(rowsInput);
    inputContainer.appendChild(colorInput);
    inputContainer.appendChild(delayInput);
    
    inputScreen.appendChild(headerContainer);
    inputScreen.appendChild(inputContainer);
    inputScreen.appendChild(startButton);

    const mainSection = document.querySelector('main');
    const currentScreen = document.querySelector('.head');
    currentScreen.classList.add('screen');

    inputScreen.style.opacity = '0';
    inputScreen.style.transform = 'translateY(100%)';
    mainSection.appendChild(inputScreen);

    requestAnimationFrame(() => {
        currentScreen.classList.add('up');
        inputScreen.style.opacity = '1';
        inputScreen.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        if (currentScreen.parentNode === mainSection) {
            mainSection.removeChild(currentScreen);
        }
    }, 600);
};

const showErrorMessage = (message) => {
    const mainSection = document.querySelector('main');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;
    mainSection.appendChild(errorMessage);
    
    setTimeout(() => {
        mainSection.removeChild(errorMessage);
    }, 3000);
};


function createWaterElements(circle, color) {
    const waterFill = document.createElement('div');
    waterFill.className = 'water-fill';
    
    const waterBody = document.createElement('div');
    waterBody.className = 'water-body';
    waterBody.style.backgroundColor = color;
    
    const waterWave = document.createElement('div');
    waterWave.className = 'water-wave';
    waterWave.style.background = `
        linear-gradient(
            180deg,
            transparent 0%,
            ${color} 100%
        )
    `;
    
    const waterSurface = document.createElement('div');
    waterSurface.className = 'water-surface';
    waterSurface.style.backgroundColor = color;
    
    waterFill.appendChild(waterBody);
    waterFill.appendChild(waterWave);
    waterFill.appendChild(waterSurface);
    circle.appendChild(waterFill);
}

function fillCircleWithWater(circle, color) {
    const waterFill = circle.querySelector('.water-fill');
    if (!waterFill) {
        createWaterElements(circle, color);
        circle.offsetHeight;
        requestAnimationFrame(() => {
            circle.querySelector('.water-fill').style.height = '100%';
        });
    }
}

function clearCircleWater(circle) {
    const waterFill = circle.querySelector('.water-fill');
    if (waterFill) {
        waterFill.style.height = '0%';
        setTimeout(() => {
            if (waterFill.parentNode === circle) {
                circle.removeChild(waterFill);
            }
        }, 500); 
    }
}

function createPyramid(rows) {
    const pyramid = document.getElementById('pyramid');
    pyramid.innerHTML = '';
    
    for(let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        
        for(let j = 0; j <= i; j++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            row.appendChild(circle);
        }
        
        pyramid.appendChild(row);
    }
}

function validateColor(color) {
    const temp = document.createElement('div');
    temp.style.color = color;
    return temp.style.color !== '';
}

function animateRows(selectedColor, selectedDelay, startFromRow) {
    if (!isAnimating || isPaused) return;

    const rows = document.getElementsByClassName('row');
    const color = validateColor(selectedColor) ? selectedColor : 'red';
    currentRowIndex = startFromRow;

    function lightUpRow() {
        if (isPaused) return;

        if(currentRowIndex < rows.length) {
            if(currentRowIndex > 0) {
                const previousRow = rows[currentRowIndex - 1];
                const previousCircles = previousRow.getElementsByClassName('circle');
                Array.from(previousCircles).forEach(circle => {
                    clearCircleWater(circle);
                });
            }

            const circles = rows[currentRowIndex].getElementsByClassName('circle');
            Array.from(circles).forEach(circle => {
                fillCircleWithWater(circle, color);
            });

            currentRowIndex++;
            let timeout = setTimeout(lightUpRow, currentDelay); 
            animationTimeouts.push(timeout);
        } else {
            const lastRow = rows[rows.length - 1];
            const lastCircles = lastRow.getElementsByClassName('circle');
            
            const clearTimeout = setTimeout(() => {
                Array.from(lastCircles).forEach(circle => {
                    clearCircleWater(circle);
                });
                
                setTimeout(() => {
                    if (!isPaused && isAnimating) {
                        currentRowIndex = 0;
                        lightUpRow();
                    }
                }, 600);
            }, currentDelay); 
            
            animationTimeouts.push(clearTimeout);
        }
    }

    lightUpRow();
}

function clearCircleWater(circle) {
    const waterFill = circle.querySelector('.water-fill');
    if (waterFill) {
        waterFill.style.transition ='height 0.5s ease-out'
        waterFill.style.height = '0%';
        setTimeout(() => {
            if (waterFill.parentNode === circle) {
                circle.removeChild(waterFill);
            }
        }, 500);
    }
}

function clearAllCircles() {
    const circles = document.getElementsByClassName('circle');
    Array.from(circles).forEach(circle => {
        clearCircleWater(circle);
    });
}


function createDelayController(initialDelay) {
    const controller = document.createElement('div');
    controller.className = 'delay-controller';
    
    const decreaseBtn = document.createElement('button');
    decreaseBtn.innerHTML = '-';
    
    const delayInfo = document.createElement('div');
    delayInfo.className = 'delay-info';
    
    const delayLabel = document.createElement('div');
    delayLabel.className = 'delay-label';
    delayLabel.textContent = 'Animation Delay';
    
    const delayValue = document.createElement('div');
    delayValue.className = 'delay-value';
    delayValue.textContent = `${initialDelay}ms`;
    
    const increaseBtn = document.createElement('button');
    increaseBtn.innerHTML = '+';
    
    delayInfo.appendChild(delayLabel);
    delayInfo.appendChild(delayValue);
    
    controller.appendChild(decreaseBtn);
    controller.appendChild(delayInfo);
    controller.appendChild(increaseBtn);
    
    currentDelay = initialDelay;
    
    decreaseBtn.addEventListener('click', () => {
        if (currentDelay > 300) {  
            currentDelay -= 100;
            delayValue.textContent = `${currentDelay}ms`;
            // updateAnimation(currentDelay);
            stopRestartAnimation();
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        if (currentDelay < 2000) {  
            currentDelay += 100;
            delayValue.textContent = `${currentDelay}ms`;
            // updateAnimation(currentDelay);
            stopRestartAnimation()
        }
    });
    
    return controller;
}

function stopRestartAnimation() {
    if (isAnimating) {

        const color = document.getElementById('colorInput').value;
        const currentState = {
            row: currentRowIndex,
            isPaused: isPaused
        };

        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];

        // currentDelay = newDelay;

        clearAllCircles()

        if(!currentState.isPaused){
            setTimeout(() => {
                animateRows(color, currentDelay, currentState.row);

            }, 500)
        }
    }
}

const showModal = (createContentCallback) => {
    const mainSection = document.querySelector('main');
    mainSection.style.filter = 'blur(5px)';

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';

    const modalBox = document.createElement('div');
    modalBox.id = 'modal-box';

    const closeButton = document.createElement('span');
    closeButton.innerText = '✖';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
        mainSection.style.filter = 'none';
    });

    modalBox.appendChild(closeButton);
    createContentCallback(modalBox);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);
};

const createSettingsContent = (modalBox) => {
    // const startNewButton = document.createElement('button');
    // startNewButton.innerText = 'Start New';
    // startNewButton.className = 'start-new-button';
    // startNewButton.addEventListener('click', () => {

    //     document.body.removeChild(document.getElementById('modal-overlay'));
    //     document.querySelector('main').style.filter = 'none';
    //     showInputBoxes();

    //     // const mainSection = document.querySelector('main');
    //     // mainSection.innerHTML = '';

    //     // const inputScreen = document.createElement('div');
    //     // inputScreen.classList.add('screen');
    // });

    const reloadButton = document.createElement('button');
    reloadButton.innerText = 'Reload';
    reloadButton.className = 'reload-button';
    reloadButton.addEventListener('click', () => {
        location.reload();
    });

    // modalBox.appendChild(startNewButton);
    modalBox.appendChild(reloadButton);
};


const createProfileContent = (modalBox) => {
    const loginButton = document.createElement('button');
    loginButton.innerText = 'Login';
    loginButton.className = 'login-button';
    // loginButton.addEventListener('click', () => {
    //     alert('Redirecting to Login...');
    // });

    const signupButton = document.createElement('button');
    signupButton.innerText = 'Signup';
    signupButton.className = 'signup-button';
    // signupButton.addEventListener('click', () => {
    //     alert('Redirecting to Signup...');
    // });

    modalBox.appendChild(loginButton);
    modalBox.appendChild(signupButton);
};

continueBtn.addEventListener('click', showInputBoxes);
settingsBtn.addEventListener('click', () => showModal(createSettingsContent));
profileBtn.addEventListener('click', () => showModal(createProfileContent));