function pyramid(rows){
    let tree = '';

    for(let i = 1; i <= rows; i++){
        let space = '';
        let circles = '';

        for(let j = 1; j <= rows - i; j++){
            space += ' ';
        }

        for(let k = 1; k <= i; k++){
            circles += circleCreation();
        }

        tree += space + circles + '\n';
    }
    document.getElementById('pattern').innerHTML = tree;
}

pyramid(3);

function circleCreation(){
    let circle = document.createElement('div');
    circle.classList.add('circle');
    return circle.outerHTML;
}