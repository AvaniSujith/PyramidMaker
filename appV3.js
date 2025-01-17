function pyramid(rows){
    let tree ='';
    for(let i = 1; i<= rows ; i++){
        let space = '';
        let star = '';
        for(let j = 1; j <= rows - i; j++){
            space += " ";
        }
        for(let k = 1; k <= i; k++){
            // star += " *";
            circleCreation();
        }
        // console.log(space+star);
        tree += space + star + '\n';
        
    }

    document.getElementById('pattern').textContent = tree;
}

pyramid(6);


function circleCreation(){
    let circles = document.createElement('div');
    circles.classList.add('circle');
}