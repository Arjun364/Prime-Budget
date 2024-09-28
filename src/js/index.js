
// Landing page
const navbar = document.getElementById('navigationbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // adjust this value to your desired scroll point
    navbar.classList.add('bg-orange');
  } else {
    navbar.classList.remove('bg-orange');
  }
});

const move = (props) => {
  if (props === "auth") {
    window.location = "./src/public/Authentication.html"
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
          const alerttext = document.getElementById('success')
          alerttext.innerText = `The user ${username} is successfully logged in `

          localStorage.setItem("currentUser", user.username)
          alert.classList.replace('hidden', 'flex')

          // move to home page if the password is matchedd
          const Timeout = setTimeout(() => {
            window.location = './Homepage.html'
          }, 500)

          // clears the txt box 
          document.getElementById('Susername').value = ""
          document.getElementById('Spassword').value = ""
          erroMsg4.classList.replace('block', 'hidden')
        } else {
          // alert(`The password is incorrect`)
          const erroMsg4 = document.getElementById('erroMsg4')
          const alert = document.getElementById('alert2')
          const alerttext = document.getElementById('fail')
          alerttext.innerText = `The user ${username} has failed in log in `
          alert.classList.replace('hidden', 'flex')

          document.getElementById('Susername').value = ""
          document.getElementById('Spassword').value = ""
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
          transactions: {
            income: {},
            expense: {},
          },
          balance: 0,
          expense: 0

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
  const erroMsg4 = document.getElementById('erroMsg4')

  if (username in localStorage) {
    erroMsg4.innerText = "The user is founded"
    erroMsg4.classList.replace('text-red-500', 'text-green-500')
    erroMsg4.classList.replace('hidden', 'block')
    return true;

  } else {
    erroMsg4.innerText = `There isnt any user named ${username}`
    erroMsg4.classList.replace('text-green-500', 'text-red-500')
    erroMsg4.classList.replace('hidden', 'block')
    return false;
  }

}


// home sections

// display current user details in the home page
const getCurrentuser = () => {
  const currentUser = localStorage.getItem("currentUser")
  if (currentUser) {
    const username = document.getElementById('Puser')
    const email = document.getElementById('Pemail')
    const balance = document.getElementById('balance')
    const spent = document.getElementById('spent')
    const data = JSON.parse(localStorage.getItem(currentUser))

    username.innerText = data.username
    email.innerText = data.email
    balance.innerText = `${data.balance} Rs`
    spent.innerText = `${data.expense} Rs`

  }
}

getCurrentuser()

// income add function
const Addincome = () => {
  const Type = document.getElementById("incomeType")
  const Amount = document.getElementById("incomeAmount")
  const fail = document.getElementById("alert3")
  const faildata = document.getElementById("failText")

  if (!Type.value || !Amount.value) {
    faildata.innerText = ` The fields cannot be Empty.`
    fail.classList.replace('hidden', 'flex')
  } else {
    fail.classList.replace('flex', 'hidden')

    const currentUser = localStorage.getItem("currentUser")
    const success = document.getElementById("alert4")
    const successData = document.getElementById("SuccessText")

    if (currentUser) {
      const userData = JSON.parse(localStorage.getItem(currentUser))
      const incomeN = Object.keys(userData.transactions.income).length

      // date fetching

      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();

      const currentday = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
      console.log(currentday);

      // console.log(incomeN);

      userData.balance += Number(Amount.value)

      userData.transactions.income[incomeN + 1] = {
        incomeType: Type.value,
        incomeAmount: Number(Amount.value),
        currentBalance: userData.balance,
        currentDate: currentday
      }


      localStorage.setItem(currentUser, JSON.stringify(userData))

      successData.innerText = `Add ${Type.value} income successfully`
      success.classList.replace('hidden', 'flex')

      Type.value = ""
      Amount.value = ""


      getCurrentuser()
      DispayTranscationData()
    }
  }
}

// expense fucntions

const AddExpense = () => {
  const Type = document.getElementById("expenseType")
  const Amount = document.getElementById("expenseAmount")
  const fail = document.getElementById("alert3")
  const faildata = document.getElementById("failText")

  if (!Type.value || !Amount.value) {
    faildata.innerText = ` The fields cannot be Empty.`
    fail.classList.replace('hidden', 'flex')
  } else {
    fail.classList.replace('flex', 'hidden')

    const currentUser = localStorage.getItem("currentUser")
    const success = document.getElementById("alert4")
    const successData = document.getElementById("SuccessText")

    if (currentUser) {
      const userData = JSON.parse(localStorage.getItem(currentUser))
      const expenseN = Object.keys(userData.transactions.expense).length

      userData.expense += Number(Amount.value)
      userData.balance -= Number(Amount.value)

      // date fetching

      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();

      const currentday = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
      console.log(currentday);

      userData.transactions.expense[expenseN + 1] = {
        expenseType: Type.value,
        expenseAmount: Number(Amount.value),
        currentBalance: userData.balance,
        currentTime: currentday
      }


      localStorage.setItem(currentUser, JSON.stringify(userData))

      successData.innerText = `Add ${Type.value} Expense successfully`
      success.classList.replace('hidden', 'flex')

      Type.value = ""
      Amount.value = ""


      getCurrentuser()
      DispayTranscationData()
    }
  }
}

const clearTranscations = () => {
  const currentUser = localStorage.getItem("currentUser")
  const fail = document.getElementById("alert3")
  const faildata = document.getElementById("failText")
  const income = document.getElementById('incomeData')

  if (currentUser) {
    const userData = JSON.parse(localStorage.getItem(currentUser))

    userData.transactions.income = {}
    userData.balance = 0
    userData.expense = 0
    userData.transactions.expense = {}

    localStorage.setItem(currentUser, JSON.stringify(userData))

    faildata.innerText = ` The Budget is cleared `
    fail.classList.replace('hidden', 'flex')

  }

  income.innerHTML =""

  getCurrentuser()
}


// log out function
const logout = () => {
  localStorage.setItem("currentUser", "")
  window.location = '../../index.html'
}

// logic of the view more button
const view = () => {
  const elementHeader = document.getElementById('viewHeader')
  const elementBody = document.getElementById('viewBody')
  const arrow = document.getElementById('arrow')

  elementHeader.classList.toggle('text-blue-500')
  elementBody.classList.toggle('hidden')
  elementBody.classList.toggle('flex')
  arrow.classList.toggle('rotate-180')

}

// Display the income data

const DispayTranscationData = () => {
  const income = document.getElementById('incomeData')
  const expense = document.getElementById('expenseData')

  const currentUser = localStorage.getItem("currentUser")

  if (currentUser) {
    const userData = JSON.parse(localStorage.getItem(currentUser))
    const incomeData = userData.transactions.income
    const expenseData = userData.transactions.expense

    income.innerHTML ="";
    expense.innerHTML ="";

    // Use Object.entries() to iterate over the incomeData object
    Object.entries(incomeData).forEach(([key, element]) => {
      const data = `                            
      <tr class="bg-white border-b ">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
            ${element.incomeType}
        </th>
        <td class="px-6 py-4 text-green-500">
           + ${element.incomeAmount}
        </td>
        <td class="px-6 py-4">
            ${element.currentBalance}
        </td>
        <td class="px-6 py-4">
            ${element.currentDate}
        </td>
      </tr>`;

      income.innerHTML += data; // Append new row to the income table
    })

    // Use Object.entries() to iterate over the expenseData object
    Object.entries(expenseData).forEach(([key, element]) => {
      const data = `                            
      <tr class="bg-white border-b ">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
            ${element.expenseType}
        </th>
        <td class="px-6 py-4 text-green-500">
           + ${element.expenseAmount}
        </td>
        <td class="px-6 py-4">
            ${element.currentBalance}
        </td>
        <td class="px-6 py-4">
            ${element.currentTime}
        </td>
      </tr>`;

      expense.innerHTML += data; // Append new row to the income table
    })

  }


}

DispayTranscationData()


function printTable() {
  const table1 = document.getElementById('myTable').outerHTML; // First table
  const table2 = document.getElementById('myTable2').outerHTML; // Second table
  const newWindow = window.open('', '', 'height=500, width=500');
  
  newWindow.document.write('<html><head><title>Print Tables</title>');
  newWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #ddd; }</style>');
  newWindow.document.write('</head><body>');
  newWindow.document.write('<h1>Income<h1/>')
  newWindow.document.write(table1); // Writing the first table
  newWindow.document.write('<br><br>'); // Adding some space between the tables
  newWindow.document.write('<h1>Expense<h1/>')
  newWindow.document.write(table2); // Writing the second table
  newWindow.document.write('</body></html>');
  
  newWindow.document.close();
  newWindow.focus();
  
  newWindow.print();
  
}