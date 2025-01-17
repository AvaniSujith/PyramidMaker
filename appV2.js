function pyramid(rows){
    for(let i = 0; i <= rows; i++){
        let space = '';
        let star = '';
        for(let j = 1; j <= rows - 1; j++){
            space += " ";
        }
        for(let k = 1 ; k <= k - 3; k++){
            star += "*";
        }
        console.log(space + star);
    }
}

pyramid(4)