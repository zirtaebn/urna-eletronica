const doc = element => document.querySelector(element);
const doc_all = element => document.querySelectorAll(element);
let voteStep = 0;
let indexList = 0;
let votes = [];
let num = [];
let numString = null;
let keyIndex = 0;
let isValid = null;



// to start the vote steps
startVoteStep();
function startVoteStep(){

    if(voteStep < listJson.length){

        keyIndex = 0;
        indexList = 0;
        num = [];

        doc('.political-office').innerHTML = listJson[voteStep][0].role;


        while(indexList < listJson[voteStep][voteStep].number.length){
    
            doc('.numbers').innerHTML += '<div class="num"></div>'
            indexList++;
        }
    
        doc_all('.num')[keyIndex].classList.add('blink');
        
    }
}

// to go to the next vote step
function nextVoteStep(){

    // there is no more vote steps
    if(voteStep == listJson.length - 1){


        doc_all('.screen-left, .screen-right, .screen-bottom').forEach((element) => {

            element.classList.add('hide');
        });

        doc('.end-screen').classList.remove('hide');
        
       
        doc('#end-sound').play();


        doc('.end-screen').innerHTML = 'GRAVANDO...'


        setTimeout(()=>{

            doc('.end-screen').innerHTML = 'FIM'
            doc('.end-screen').classList.add('blink');
            
        }, 500)

    }else{

        voteStep += 1;

        doc('.numbers').innerHTML = '';
        doc_all('.your-vote, .name, .party, .vice, .screen-right').forEach(element => element.classList.add('hide'));
        startVoteStep();
    }    
}

// blank vote
doc('.in-white').addEventListener('click', () => {


    if(doc_all('.num')[0].innerHTML != ''){

        alert('Para votar em BRANCO o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.');
    }else{

        votes.push('VOTO EM BRANCO')
        nextVoteStep();
    }
})


// to correct the vote
doc('.correct').addEventListener('click', () => {

    doc_all('.your-vote, .name, .party, .vice, .screen-right').forEach(element => element.classList.add('hide'));
    doc('.numbers').innerHTML = '';
    num = [];

    if(doc('.wrong-number span').classList.contains('blink')){

        doc('.wrong-number').classList.add('hide');
    }

    votes.splice(voteStep, 1)

    startVoteStep();
})


// to confirm the vote
doc('.confirm').addEventListener('click', () => {

    if(doc('.wrong-number span').classList.contains('blink')){

        doc('.wrong-number').classList.add('hide');
        doc('.wrong-number span').classList.remove('blink');

        votes.push('VOTO NULO');
    }

    nextVoteStep();
})


// show the numbers on screen 
doc_all('.key').forEach((element) => element.addEventListener('click',(key) => {

   if(keyIndex < doc_all('.num').length && keyIndex != doc_all('.num').length - 1){

        doc_all('.num')[keyIndex].innerHTML =  key.target.innerHTML;
        
        num.push(doc_all('.num')[keyIndex].innerHTML);
        numString  = num.join('');

        doc_all('.num')[keyIndex].classList.remove('blink');
        doc_all('.num')[keyIndex + 1].classList.add('blink');

        keyIndex++;

   }else{

        doc_all('.num')[keyIndex].innerHTML =  key.target.innerHTML;
        
        num.push(doc_all('.num')[keyIndex].innerHTML);
        numString  = num.join('');

        doc_all('.num')[keyIndex].classList.remove('blink');

        showVote();
    } 
}))


// show candidate's information on screen
function showVote(){

    isValid = listJson[voteStep].filter(element => numString === element.number);

    // checks if its a valid vote
    if(isValid.length != 0){

        doc_all('.your-vote, .name, .party, .vice, .screen-right').forEach((element) => {

            element.classList.remove('hide')
        })
        
        doc('.political-office').innerHTML = isValid[0].office;
        doc('.name span').innerHTML = isValid[0].name;
        doc('.party span').innerHTML = isValid[0].party;
        
        votes.push(

            { 
    
                office: isValid[0].office,
                name: isValid[0].name,
                number: isValid[0].number,
                party: isValid[0].party
        
            }
        )
       
    }else{

        doc('.wrong-number').classList.remove('hide');
        doc('.wrong-number span').classList.add('blink');

    }

    
}





   





