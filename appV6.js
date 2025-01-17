    let defaultDelay = 1000;
    let isAnimating = false;
    let animationTimeouts = [];

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

        function clearAllCircles() {
            const circles = document.getElementsByClassName('circle');
            for(let circle of circles) {
                circle.style.backgroundColor = 'transparent';
            }
        }

        function stopAnimation() {
            isAnimating = false;
            animationTimeouts.forEach(timeout => clearTimeout(timeout));
            animationTimeouts = [];
            clearAllCircles();
        }

        function animateRows() {
            if (!isAnimating) return;

            const rows = document.getElementsByClassName('row');
            const colorInput = document.getElementById('colorInput').value;
            const delay = parseInt(document.getElementById('delayInput').value) || defaultDelay;
            const color = validateColor(colorInput) ? colorInput : 'red';
            let currentRow = 0;

            clearAllCircles();

            function lightUpRow() {
                if (!isAnimating) return;

                if(currentRow < rows.length) {
                    const circles = rows[currentRow].getElementsByClassName('circle');
                    for(let circle of circles) {
                        circle.style.backgroundColor = color;
                    }
                    currentRow++;
                    let timeout = setTimeout(lightUpRow, delay);
                    animationTimeouts.push(timeout);
                } else {
                    currentRow = 0;
                    let resetTimeout = setTimeout(() => {
                        clearAllCircles();
                        let nextTimeout = setTimeout(lightUpRow, delay);
                        animationTimeouts.push(nextTimeout);
                    }, delay);
                    animationTimeouts.push(resetTimeout);
                }
            }

            lightUpRow();
        }

        function startAnimation() {
            stopAnimation();
            
            const rows = parseInt(document.getElementById('rows').value) || 3;
            const newDelay = parseInt(document.getElementById('delayInput').value);
            
            if(newDelay && newDelay >= 100) {
                defaultDelay = newDelay;
            }
            
            createPyramid(rows);
            isAnimating = true;
            animateRows();
        }

        createPyramid(3);



        