
// Landing page
const navbar = document.getElementById('navigationbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // adjust this value to your desired scroll point
    navbar.classList.add('bg-orange');
  } else {
    navbar.classList.remove('bg-orange');
  }
});

const move =(props)=>{
  if (props==="auth") {
    window.location="./src/public/Authentication.html"
  }
}

// auth page

const slide = (props) => {
  const formLog = document.getElementById('log')
  const formSig = document.getElementById('signup')
  if (props === "sign up") {
    // console.log(props);
    formSig.classList.replace('hidden', 'flex')
    formLog.classList.replace('flex', 'hidden')
  } else if (props === "login") {
    // console.log(props);
    formSig.classList.replace('flex', 'hidden')
    formLog.classList.replace('hidden', 'flex')
  }
}


const Auth = (props, event) => {
  event.preventDefault();  // Prevent the form from reloading the page
  // login logic
  if (props === "login") {
    const username = document.getElementById('Susername').value
    const password = document.getElementById('Spassword').value
    const erroMsg3 = document.getElementById('erroMsg3')

    if (!username || !password) {
      erroMsg3.innerText = "The Fields cannot be empty"
      erroMsg3.classList.replace('hidden', 'block')
    } else {
      erroMsg3.classList.replace('block', 'hidden')

      if (usercheckin()) {
        const user = JSON.parse(localStorage.getItem(username))
        
        if (user.password == password) {
          const erroMsg4 = document.getElementById('erroMsg4')
          const alert = document.getElementById('alert')
          const alerttext =document.getElementById('success')
          alerttext.innerText=`The user ${username} is successfully logged in `

          localStorage.setItem("currentUser",user.username)
          alert.classList.replace('hidden','flex')

          // move to home page if the password is matchedd
          const Timeout = setTimeout(()=>{
            window.location='../../index.html'
          },5000)

          // clears the txt box 
          document.getElementById('Susername').value=""
          document.getElementById('Spassword').value=""
          erroMsg4.classList.replace('block', 'hidden')
        }else{
          // alert(`The password is incorrect`)
          const erroMsg4 = document.getElementById('erroMsg4')
          const alert = document.getElementById('alert2')
          const alerttext =document.getElementById('fail')
          alerttext.innerText=`The user ${username} has failed in log in `
          alert.classList.replace('hidden','flex')

          document.getElementById('Susername').value=""
          document.getElementById('Spassword').value=""
          erroMsg4.classList.replace('block', 'hidden')
        }
        
      }

    }


    // signup logic
  } else if (props === "signup") {
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const erroMsg = document.getElementById('erroMsg')
    const erroMsg1 = document.getElementById('erroMsg1')
    const erroMsg2 = document.getElementById('erroMsg2')

    // checked if the text field are empty
    if (!username || !email || !password) {
      erroMsg.innerText = "The Fields cannot be empty"
      erroMsg.classList.replace('hidden', 'block')
      return
    } else {
      // the user is created
      if (CheckUsername() && checkEmail() && checkPassLength()) {

        const formSig = document.getElementById('signup')
        const formLog = document.getElementById('log')
        const alert = document.getElementById('alert')

        const userobj = {
          username: username,
          email: email,
          password: password,

        }

        const userStr = JSON.stringify(userobj)
        localStorage.setItem(username, userStr)

        // to open a success popup card and to move to login page
        alert.classList.replace('hidden', 'flex')
        formSig.classList.replace('flex', 'hidden')
        formLog.classList.replace('hidden', 'flex')

        // to clear the txt box
        document.getElementById('username').value = ""
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""

        // to hide the error msg 
        erroMsg.classList.replace('block', 'hidden')
        erroMsg1.classList.replace('block', 'hidden')
        erroMsg2.classList.replace('block', 'hidden')
      }

    }
  }
}



// sign up logic
const CheckUsername = () => {
  const username = document.getElementById('username').value
  const erroMsg1 = document.getElementById('erroMsg1')


  if (username in localStorage) {
    erroMsg1.classList.replace('text-green-500', 'text-red-500')
    erroMsg1.innerText = "The username is already taken"
    erroMsg1.classList.replace('hidden', 'block')
    return false
  } else {
    erroMsg1.innerText = `The username ${username} is available`
    erroMsg1.classList.replace('hidden', 'block')
    erroMsg1.classList.replace('text-red-500', 'text-green-500')
    return true
  }
}

const checkEmail = () => {
  const email = document.getElementById('email').value
  const erroMsg2 = document.getElementById('erroMsg2')


  // Regular expression for validating an email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(email)) {
    erroMsg2.classList.replace('text-red-500', 'text-green-500')
    erroMsg2.innerText = "The Email is authenticated."
    erroMsg2.classList.replace('hidden', 'block')

    return true;
  } else {
    erroMsg2.classList.replace('text-green-500', 'text-red-500')
    erroMsg2.innerText = "The Email is invaild"
    erroMsg2.classList.replace('hidden', 'block')
    return false;
  }

}

const checkPassLength = () => {
  const password = document.getElementById('password').value;
  const minLength = 8; // Set your desired minimum length
  const maxLength = 16; // Optional, set a maximum length if needed
  const erroMsg = document.getElementById('erroMsg')

  if (password.length < minLength) {
    erroMsg.classList.replace('text-green-500', 'text-red-500')
    erroMsg.innerText = `Password must be at least ${minLength} characters long.`;
    erroMsg.classList.replace('hidden', 'block')

    return false;
  } else if (password.length > maxLength) {
    erroMsg.classList.replace('text-green-500', 'text-red-500')
    erroMsg.innerText = `Password must be no longer than ${maxLength} characters.`;
    erroMsg.classList.replace('hidden', 'block')
    return false;
  } else {
    erroMsg.classList.replace('text-red-500', 'text-green-500')
    erroMsg.innerText = `Password is Vaild`;
    erroMsg.classList.replace('hidden', 'block')
    return true;
  }

}


// login functions

const usercheckin = () => {
  const username = document.getElementById('Susername').value
  const password = document.getElementById('Spassword').value
  const erroMsg4 = document.getElementById('erroMsg4')

  if (username in localStorage) {
    erroMsg4.innerText="The user is founded"
    erroMsg4.classList.replace('text-red-500', 'text-green-500')
    erroMsg4.classList.replace('hidden', 'block')
    return true;

  }else{
    erroMsg4.innerText=`There isnt any user named ${username}`
    erroMsg4.classList.replace('text-green-500', 'text-red-500')
    erroMsg4.classList.replace('hidden', 'block')
    return false;
  }

}