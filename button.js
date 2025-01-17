// Select necessary buttons
const continueBtn = document.getElementById('continue-btn');
const settingsBtn = document.getElementById('setting-btn');
const profileBtn = document.getElementById('user-btn');

// Function to show input boxes
const showInputBoxes = () => {
    const mainSection = document.querySelector('main');
    mainSection.innerHTML = '';

    const inputContainer = document.createElement('div');
    inputContainer.id = 'input-container';
    inputContainer.style.marginTop = '20px';

    const header = document.createElement('h2');
    header.innerText = 'Let\'s Fill in Some Details';
    

    const createInput = (labelText, inputType, inputId, placeholder) => {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginBottom = '10px';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.width = '150px';
        label.style.marginRight = '10px';

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.placeholder = placeholder;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        return wrapper;
    };

    const rowsInput = createInput('Number of rows:', 'number', 'rows-input', 'Enter number of rows');
    const colorInput = createInput('Pick a color:', 'color', 'color-input', '');
    const delayInput = createInput('Delay (ms):', 'number', 'delay-input', 'Enter delay in milliseconds');

    inputContainer.appendChild(header);
    inputContainer.appendChild(rowsInput);
    inputContainer.appendChild(colorInput);
    inputContainer.appendChild(delayInput);

    mainSection.appendChild(inputContainer);
};

// Function to create and show a modal
const showModal = (createContentCallback) => {
    const mainSection = document.querySelector('main');
    mainSection.style.filter = 'blur(5px)';

    // Overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalOverlay.style.zIndex = '9998';

    // Modal Box
    const modalBox = document.createElement('div');
    modalBox.style.position = 'fixed';
    modalBox.style.top = '50%';
    modalBox.style.left = '50%';
    modalBox.style.transform = 'translate(-50%, -50%)';
    modalBox.style.backgroundColor = '#fff';
    modalBox.style.padding = '20px';
    modalBox.style.borderRadius = '8px';
    modalBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modalBox.style.zIndex = '9999';

    // Close Button
    const closeButton = document.createElement('span');
    closeButton.innerText = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '18px';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
        mainSection.style.filter = 'none';
    });

    modalBox.appendChild(closeButton);
    createContentCallback(modalBox);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);
};

// Settings Modal Content
const createSettingsContent = (modalBox) => {
    const startNewButton = document.createElement('button');
    startNewButton.innerText = 'Start New';
    startNewButton.style.marginRight = '10px';
    startNewButton.addEventListener('click', () => {
        document.body.removeChild(document.getElementById('modal-overlay'));
        document.querySelector('main').style.filter = 'none';
        showInputBoxes();
    });

    const reloadButton = document.createElement('button');
    reloadButton.innerText = 'Reload';
    reloadButton.addEventListener('click', () => {
        location.reload();
    });

    modalBox.appendChild(startNewButton);
    modalBox.appendChild(reloadButton);
};

// Profile Modal Content
const createProfileContent = (modalBox) => {
    const loginButton = document.createElement('button');
    loginButton.innerText = 'Login';
    loginButton.style.marginRight = '10px';
    loginButton.addEventListener('click', () => {
        alert('Redirecting to Login...');
    });

    const signupButton = document.createElement('button');
    signupButton.innerText = 'Signup';
    signupButton.addEventListener('click', () => {
        alert('Redirecting to Signup...');
    });

    modalBox.appendChild(loginButton);
    modalBox.appendChild(signupButton);
};

// Event Listeners
continueBtn.addEventListener('click', showInputBoxes);
settingsBtn.addEventListener('click', () => showModal(createSettingsContent));
profileBtn.addEventListener('click', () => showModal(createProfileContent));
