const input = document.querySelector(".input input");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const main = document.querySelector(".main");
const container = document.querySelector(".container");
const BASE_URL = "https://image.tmdb.org/t/p/original";
const night = document.querySelector(".night");
const span = document.querySelector(".sp");
const icon = document.querySelector(".icon");
const cateqorys = document.querySelectorAll(".cat p");
const home = document.querySelector(".fa-house");
const icons = document.querySelectorAll(".icons");

window.addEventListener("load", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=all"
  );
  const data = await response.json();
  let moviesData = data.results
    .map((item, index) => {
      let p = item.overview.substring(0, 30);
      let h1 = item.title.substring(0, 20);
      let img = BASE_URL + item.poster_path;
      let twiceImg = BASE_URL + "/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg";
      return `<a href="../about/about.html" class="box" id=${index}><img src="${
        item.poster_path ? img : twiceImg
      }"> <h1 class="h1clas">${h1}</h1> <p> ${p}</p> <video src="./video.mp4" autoplay controls loop muted class="video"> </a>`;
    })
    .join();
  main.innerHTML = moviesData;

  // ********
  const singleMovie = document.querySelectorAll(".box");
  
  singleMovie.forEach((movie,index) => {
    movie.addEventListener("click", () => {
      const id = movie.getAttribute("id");
      data.results.map((item, index) => {
        if (id == index) {
          window.localStorage.setItem("movie", JSON.stringify(item));
        }
      });
    });

    movie.addEventListener("mouseover",()=>{
      const video = movie.lastChild
      video.style.display = "block"
      console.log(movie.children);
        movie.childNodes[0].style.display = "none"
        movie.childNodes[2].style.display = "none"
        movie.childNodes[4].style.display = "none"
    })
    movie.addEventListener("mouseout",()=>{
      const video = movie.lastChild
        video.style.display = "none"
         movie.childNodes[0].style.display = "block"
         movie.childNodes[2].style.display = "block"
         movie.childNodes[4].style.display = "block"
    })
  });

  input.addEventListener("input", (e) => {
    let inputValue = e.target.value;
    let Filter = data.results.filter((items) =>
      items.overview.toLowerCase().includes(inputValue.toLowerCase())
    );
    let moviesFilter = Filter.map((item, index) => {
      let p = item.overview.substring(0, 30);
      let h1 = item.title.substring(0, 20);
      let img = BASE_URL + item.poster_path;
      return `<a href="../about/about.html" class="box" id=${index}><img src="${img}"> <h1 class="h1clas">${h1}</h1> <p> ${p}</p> </a>`;
    }).join();
    main.innerHTML = moviesFilter;

    const boxs = document.querySelectorAll(".box");
    boxs.forEach((movie) => {
      movie.addEventListener("click", () => {
        const id = movie.getAttribute("id");
        Filter.map((item, index) => {
          if (id == index) {
            window.localStorage.setItem("movie", JSON.stringify(item));
          }
        });
      });
    });
  });
});

// Secimler

cateqorys.forEach((item) => {
  item.addEventListener("click", async () => {
    let Value = item.getAttribute("accesskey");
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=${Value}`
    );
    const data = await response.json();
    let moviesData = data.results
      .map((item, index) => {
        let p = item.overview.substring(0, 30);
        let h1 = item.title.substring(0, 20);
        let img = BASE_URL + item.poster_path;
        let twiceImg = BASE_URL + "/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg";
        return `<a href="../about/about.html" class="box" id=${index}><img src="${
          item.poster_path ? img : twiceImg
        }"> <h1 class="h1clas">${h1}</h1> <p> ${p}</p> </a>`;
      })
      .join();

    main.innerHTML = moviesData;
    const boxs = document.querySelectorAll(".box");
    boxs.forEach((movie) => {
      movie.addEventListener("click", () => {
        const id = movie.getAttribute("id");
        data.results.map((item, index) => {
          if (id == index) {
            window.localStorage.setItem("movie", JSON.stringify(item));
          }
        });
      });
    });
  });
});

cateqorys.forEach((item) => {
  item.addEventListener("click", () => {
    cateqorys.forEach((item) => {
      item.classList.remove("active8");
    });
    item.classList.add("active8");
  });
});

// icon click top 0

searchIcon.addEventListener("click", () => {
  // console.log("active");
  input.classList.toggle("active");
});
window.addEventListener("scroll", () => {
  mesafe = window.scrollY;
  if (mesafe > 1000) {
    icon.classList.add("active6");
  } else {
    icon.classList.remove("active6");
  }
});

icon.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

//night mode
let darkMode = localStorage.getItem("darkMode");

const enabledDark = () => {
  span.classList.add("active3");
  container.classList.add("active2");
  night.classList.add("active4");
  localStorage.setItem("darkMode", "enabled");
};

const disabledDark = () => {
  span.classList.remove("active3");
  container.classList.remove("active2");
  night.classList.remove("active4");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enabledDark();
}

span.addEventListener("click", () => {
  let darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enabledDark();
    console.log(darkMode);
  } else {
    disabledDark();
    console.log(darkMode);
  }
  // container.classList.toggle("active2");
});
span.addEventListener("click", () => {
  icons.forEach((item) => {
    if (item.style.color !== "aqua") {
      item.style.color = "aqua";
    } else if (item.style.color === "aqua") {
      item.style.color = "white";
    } else {
      item.style.color = "white";
    }
  });
});
span.addEventListener("click", () => {
  cateqorys.forEach((item) => {
    item.classList.toggle("active9");
  });
});
//Home click

home.addEventListener("click", async () => {
  main.innerHTML = "";
  cateqorys.forEach((item) => {
    item.classList.remove("active8");
  });
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=all"
  );
  const data = await response.json();
  let moviesData = data.results
    .map((item, index) => {
      let p = item.overview.substring(0, 30);
      let h1 = item.title.substring(0, 20);
      let img = BASE_URL + item.poster_path;
      return `<a href="../about/about.html" class="box" id="${index}"><img src="${img}"> <h1 class="h1clas">${h1}</h1> <p> ${p}</p> </a>`;
    })
    .join();
  main.innerHTML = moviesData;
  const boxs = document.querySelectorAll(".box");
  boxs.forEach((movie) => {
    movie.addEventListener("click", () => {
      const id = movie.getAttribute("id");
      data.results.map((item, index) => {
        if (id == index) {
          window.localStorage.setItem("movie", JSON.stringify(item));
        }
      });
    });
  });
});

function blinkText() {
  $(".h1").fadeOut(1500);
  $(".h1").fadeIn(1500);
}
setInterval(blinkText, 1000);

$(".h1").click(function () {
  $("html").animate({ scrollTop: 5000 }, "slow");
});

