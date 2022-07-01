let user_input = document.getElementById('user_input');
let result = document.getElementById('result');
let buttons = document.querySelectorAll('button');
let user_inputVal = '';

for (let item of buttons){
    item.addEventListener('click', (e)=>{
        buttonText = e.target.innerText;
        if (buttonText == 'x'){
          buttonText = '*';
          user_inputVal += buttonText;
          user_input.value = user_inputVal;
        }
        else if (buttonText == 'AC') {
          user_inputVal = "";
          user_input.value = user_inputVal;
          result.value = "0";
        }
        else if (buttonText == '=') {
          result.value = eval(user_inputVal);
          user_inputVal = result.value;
        }
        else {
          user_inputVal += buttonText;
          user_input.value = user_inputVal;
        }
    })
}
