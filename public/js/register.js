document.getElementById('register_form').addEventListener('submit', onSubmit);
const alertSuccessElement = $('.alert-success');
const alertDangerElement = $('.alert-danger');
function onSubmit(e){
    e.preventDefault();
    grecaptcha.execute('6LdtV8oUAAAAAIP7pIRaNBnWcId-gb1ps-150XdD', {action: 'homepage'}).then(function(token) {
    // This data is not being used in the back end (Only the token), but have it here for you to experiment
    const fullName = document.querySelector('#name').value;
    const userName = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const captcha = token;
    fetch('/register', 
    {
        method: 'POST',
        headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            fullName,
            userName,
            email,
            password,
            captcha:captcha
        })
    }).then(res => res.json())
        .then(data => { 
            const {success, msg, error} = data;
            if(success) {
                alertSuccessElement.toggleClass('hidden')
                alertSuccessElement.append(msg)
                window.scrollTo(0, 0)
                setTimeout(() => {
                    alertSuccessElement.toggleClass('hidden')
                    alertSuccessElement.empty()
                }, 5000)
            }
            else {
                alertDangerElement.toggleClass('hidden')
                alertDangerElement.append(error)
                window.scrollTo(0, 0)
                setTimeout(() => {
                    alertDangerElement.toggleClass('hidden')
                    alertDangerElement.empty()
                }, 5000)
            }
        })     
    });
    
}