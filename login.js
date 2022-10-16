const title = document.querySelector(".title");
const email = document.querySelector(".email");
const btn = document.querySelector(".log-btn");
const headerButtom = document.querySelector(".sign button");
const allInput = document.querySelectorAll(".inpContainer input");
const error = document.querySelectorAll(".error");
const INPUT = document.querySelectorAll("input");

const signData = {
  name: "",
  password: "",
  email: "",
};

let loginData = {
  name: "",
  password: "",
};

// Header button

headerButtom.addEventListener("click", () => {
  error.forEach((e) => {
    e.style.display = "none";
  });
  email.classList.toggle("active");
  allInput.forEach((input) => {
    input.style.border = "2px solid black";
    input.value = "";
  });

  if (headerButtom.innerHTML === "Sign Up") {
    title.innerHTML = "Sign Up";
    btn.innerHTML = "Sign Up";
    headerButtom.innerHTML = "Log In";
  } else {
    title.innerHTML = "Log In";
    btn.innerHTML = "Login";
    headerButtom.innerHTML = "Sign Up";
  }
});



// Enter key


allInput.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      if (headerButtom.innerHTML === "Log In") {
        const all = [...allInput];
        const missingInput = all.filter((inp) => inp.value.length === 0).length;
        if (missingInput !== 0) {
          e.preventDefault();
          headerButtom.innerHTML = "Log In";
          email.classList.remove("active");
          btn.innerHTML = "Sign Up";
          title.innerHTML = "Sign Up";
          allInput.forEach((inp) => {
            if (inp.value == "") {
              inp.style.border = "2px solid red";
            } else {
              inp.style.border = "2px solid black";
            }
          });
        } else {
          allInput.forEach((inp) => {
            e.preventDefault();
            inp.value = "";
            inp.style.border = "2px solid green";
          });
          const SignUpLocal = JSON.parse(localStorage.getItem("SignUpBaza"));
          SignUpLocal.push(signData);
          window.localStorage.setItem(
            "SignUpBaza",
            JSON.stringify(SignUpLocal)
          );
          // window.localStorage.setItem("users", JSON.stringify(signData));
          setTimeout(() => {
            title.innerHTML = "Log In";
            email.classList.add("active");
            btn.innerHTML = "Log In";
            headerButtom.innerHTML = "Sign Up";
            allInput.forEach((input) => {
              input.value = "";
              input.style.border = "2px solid black";
            });
          }, 2000);
        }
      } else {
        const getItemData = window.localStorage.getItem("SignUpBaza");
        const getItemData2 = JSON.parse(getItemData);
        console.log(getItemData2);
        // const localDate = window.localStorage.getItem("users");
        // const res = JSON.parse(localDate);
        let yoxla = getItemData2.some(
          (item) =>
            item.name == loginData.name && item.password == loginData.password
        );
        if (yoxla) {
          btn.setAttribute("href", "./movie/movie.html");
          location.href = "./movie/movie.html";
          allInput.forEach((inp) => {
            inp.style.border = "2px solid green";
          });
          error.forEach((err) => {
            err.style.display = "none";
          });
        } else {
          allInput.forEach((inp) => {
            if (inp.value == "") {
              inp.style.border = "2px solid red";
            } else {
              inp.style.border = "2px solid black";
              console.log("Qara");
            }
          });
          e.preventDefault();
          btn.setAttribute("href", "");
          error.forEach((e) => {
            e.style.display = "block";
          });
        }
      }
    }
  });
});

// All input value

allInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    const inputClass = input.getAttribute("class");

    if (headerButtom.innerHTML === "Log In") {
      if (inputClass == "name") {
        signData.name = e.target.value;
      } else if (inputClass == "password") {
        signData.password = e.target.value;
      } else {
        signData.email = e.target.value;
      }
    } else {
      if (inputClass == "name") {
        loginData.name = e.target.value;
      } else {
        loginData.password = e.target.value;
      }
    }
  });
});

let newLocal = window.localStorage.setItem("SignUpBaza", JSON.stringify([]));
if (!newLocal) {
  window.localStorage.setItem("SignUpBaza", JSON.stringify([]));
}

// button login / sign up

btn.addEventListener("click", (e) => {
  if (headerButtom.innerHTML === "Log In") {
    const all = [...allInput];
    const missingInput = all.filter((inp) => inp.value.length === 0).length;
    if (missingInput !== 0) {
      e.preventDefault();
      headerButtom.innerHTML = "Log In";
      email.classList.remove("active");
      btn.innerHTML = "Sign Up";
      title.innerHTML = "Sign Up";
      allInput.forEach((inp) => {
        if (inp.value == "") {
          inp.style.border = "2px solid red";
        } else {
          inp.style.border = "2px solid black";
        }
      });
    } else {
      allInput.forEach((inp) => {
        e.preventDefault();
        inp.value = "";
        inp.style.border = "2px solid green";
      });
      const SignUpLocal = JSON.parse(localStorage.getItem("SignUpBaza"));
      SignUpLocal.push(signData);
      window.localStorage.setItem("SignUpBaza", JSON.stringify(SignUpLocal));
      // window.localStorage.setItem("users", JSON.stringify(signData));
      setTimeout(() => {
        title.innerHTML = "Log In";
        email.classList.add("active");
        btn.innerHTML = "Log In";
        headerButtom.innerHTML = "Sign Up";
        allInput.forEach((input) => {
          input.value = "";
          input.style.border = "2px solid black";
        });
      }, 2000);
    }
  } else {
    const getItemData = window.localStorage.getItem("SignUpBaza");
    const getItemData2 = JSON.parse(getItemData);
    console.log(getItemData2);
    // const localDate = window.localStorage.getItem("users");
    // const res = JSON.parse(localDate);
    let yoxla = getItemData2.some(
      (item) =>
        item.name == loginData.name && item.password == loginData.password
    );
    if (yoxla) {
      btn.setAttribute("href", "./movie/movie.html");
      allInput.forEach((inp) => {
        inp.style.border = "2px solid green";
      });
      error.forEach((err) => {
        err.style.display = "none";
      });
    } else {
      allInput.forEach((inp) => {
        if (inp.value == "") {
          inp.style.border = "2px solid red";
        } else {
          inp.style.border = "2px solid black";
          console.log("Qara");
        }
      });
      e.preventDefault();

      btn.setAttribute("href", "");
      error.forEach((e) => {
        e.style.display = "block";
      });
    }
  }
});

// localStorage Array yollamaq
// window.localStorage.setItem("SignUpBaza",JSON.stringify([]))
