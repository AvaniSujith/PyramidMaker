function pryamid(rows){
    for( let i = 1; i < rows; i++){
        let spaces = '';
        let stars = '';


        for(let j = 1; j <= rows - i; j++){
            spaces += ' ';

        }

        for(let k = 1; k <=2* i - 1; k++){
            stars += '*';
        }

        console.log(spaces + stars);
    }
}

pryamid(7);

