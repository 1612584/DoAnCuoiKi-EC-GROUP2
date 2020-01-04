const form = $('#change_profile');
const formPass = $('#change_pass');

const nameInput = $('#name')
const emailInput = $('#email')
const newPassInput = $('#password')
const confirmNewPassInput = $('#repassword')
const oldPassInput = $('#oldpassword')

const oldNameInput = nameInput.val();
const oldEmailInput = emailInput.val();

let alertSuccessElement = $('.alert-success');
let alertDangerElement = $('.alert-danger');

form.on('submit', async function(e) {
    e.preventDefault();
    let fullName = nameInput.val();
    let email = emailInput.val();
    
    if(fullName !== oldNameInput) {
        let resName = await changeName(fullName)
        let { success, message, error } = resName
        if(success) {
            alertSuccessElement.toggleClass('hidden')
            alertSuccessElement.append(message)
            window.scrollTo(0, 0)
            setTimeout(() => {
                alertSuccessElement.toggleClass('hidden')
                alertSuccessElement.empty()
            }, 5000)
        }
    }
    if(email !== oldEmailInput) {
        let resEmail = await changeEmail(email)
        let { success, message, error } = resEmail
        if(success) {
            alertDangerElement.toggleClass('hidden')
            alertDangerElement.append(message)
            window.scrollTo(0, 0)
            setTimeout(() => {
                alertDangerElement.toggleClass('hidden')
                alertDangerElement.empty()
            }, 5000)
        }
    }
})

formPass.on('submit', async function(e) {
    e.preventDefault();
    let newPass = newPassInput.val();
    let confimPass = confirmNewPassInput.val();
    let oldPass = oldPassInput.val();    
 
    if(confimPass !== newPass) {
        alertDangerElement.toggleClass('hidden')
        alertDangerElement.append('Xác nhận mật khẩu không đúng')
        window.scrollTo(0, 0)
        await setTimeout(() => {
            alertDangerElement.toggleClass('hidden')
            alertDangerElement.empty()
        }, 3000)
    } else {
        let res = await changePass(newPass, oldPass)
        let { success, message, error } = res
        if(success) {
            window.location.href = '/login'
        }
        else {
            alertDangerElement.toggleClass('hidden')
            alertDangerElement.append(error)
            window.scrollTo(0, 0)
            await setTimeout(() => {
                alertDangerElement.toggleClass('hidden')
                alertDangerElement.empty()
            }, 3000)
        }
    }
    
    
    
})

async function changeName(fullName) {
    let res = await fetch(`http://localhost:3006/user/api/change_name`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            fullName,
        })
    })
    let resJson = res.json();

    return resJson
}

async function changeEmail(email) {
    let res = await fetch(`http://localhost:3006/user/api/change_email`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email,
        })
    })
    let resJson = res.json();

    return resJson
}


async function changePass(password, old_password) {
    let res = await fetch(`http://localhost:3006/user/changepassword`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            password,
            old_password
        })
    })
    let resJson = res.json();

    return resJson
}