
// const categoryButtons = document.querySelectorAll(".bottn button");
// categoryButtons.forEach((button)=>{
//     button.addEventListener("click",async ()=>{
//         const category=button.dataset.category;
//         const requestURL=`https://jsonfakery.com/movies/random`;
//         // fetch('https://imdb.iamidiotareyoutoo.com/search?v=1')
//         // fetch('https://imdb.iamidiotareyoutoo.com/justwatch?q=&L=en_IN')

//         const response= await fetch(requestURL);
//         const result=await response.json();
//         movieGrid.innerHTML="";
//         result.forEach((movie)=>{

//            let thumbnail=document.createElement("img");
//            let div=document.createElement("div");
//            let title=document.createElement("h3");
//            let para=document.createElement("p");
//            let details=document.createElement("div")
//            let btn=document.createElement("button");
//            btn.textContent = "+";
//            console.log(btn);


//           movieGrid.appendChild(div);
//           div.appendChild(thumbnail);
//           div.appendChild(details);
//           details.appendChild(title);
//           details.appendChild(para);
//           details.appendChild(btn)


//           div.className="grid-row";
//           thumbnail.className="img"
//           details.className="info";
//           para.className="p";
//           title.className="h3";
//           btn.className="save-btn";

//           thumbnail.src=movie.posterURL;
//           title.textContent=movie.title; 
//           para.textContent=movie.year;
//         })


//     })

// })

let paginate = document.querySelector(".paginate");
let mv = document.querySelector(".mv");
let numbers = [];
for (i = 1; i <= 10; i++) {
    numbers.push(i);
}
let moviess = [];
let page = 1;
let myList = JSON.parse(localStorage.getItem("myList")) || [];
let EmptyWatchList = document.querySelector("#watchlist");
let counter = document.querySelector("#count");
let displayOthers = true;

async function ok(page = 1) {
    const requestURL = `https://jsonfakery.com/movies/simple-paginate?current_page=${page}`;
    const response = await fetch(requestURL);
    const result = await response.json();
    moviess = [] = result.data;
    moviess.forEach((movie, index) => {
        if (mv) {
            mv.innerHTML += `
    <div class="items" id="${movie.id}">
       <img src=${movie.poster_path}>
       <div class="last">
          <h2>${movie.original_title}</h2>
          <p>${movie.popularity}</p>
          <button class="btnn"> + </button>
       </div>
    </div>`;
        };
        counter.textContent = myList.length;
    });
    let btns = document.querySelectorAll(".btnn");

    btns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const selectedMovie = moviess[index]
            console.log(selectedMovie)
            myList.push(selectedMovie);
            const myListJSON = JSON.stringify(myList);
            localStorage.setItem("myList", myListJSON);
            counter.textContent = myList.length;


        });
    });


    let cards = document.querySelectorAll(".items");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            let cardId = card.id;
            moviess.forEach(movie => {
                if (cardId == movie.id) {
                    localStorage.setItem("title", `${movie.original_title}`);
                    localStorage.setItem("description", `${movie.overview}`);
                    localStorage.setItem("poster", `${movie.backdrop_path}`);
                    localStorage.setItem("rating", `${movie.vote_average}`);
                    localStorage.setItem("casts", `${movie.casts}`);
                    window.open("Movie.html", "_self");
                    // console.log(card)

                };

            });
        });

    });


    const highestRate = moviess.filter((item) => item.vote_average >= 6);
    //console.log(highestRate)
    highestRate.forEach((movie, id) => {
        if (document.querySelector(".higher-rating")) {
            document.querySelector(".higher-rating").innerHTML += `
            <div class="single">
                <img src=${movie.poster_path}>
                <div class="info-bot">
                    <div class="info">
                       <h2>${movie.original_title}</h2>
                       <p>${movie.vote_average}</p>
                  </div> 
                  <div class="bottom">  
                      <p>${movie.vote_count}</p>
                   </div>
                </div>
             
           </div>`
        }
    })
}


let searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener("change", (event) => {
        const filteredMovie = moviess.filter((movie) => movie.original_title = event.target.value);
        displayMovies(filteredMovie);
        console.log(displayMovies)
    });
}

function displayMovies() {
    moviess.forEach((movie, index) => {
        if (mv) {
            mv.innerHTML = `
          <div class="items" id="${movie.id}">
          <img src=${movie.poster_path}>
          <div class="last">
              <h2>${movie.original_title}</h2>
               <p>${movie.popularity}</p>
          <button class="btnn">+</button>
       </div>
    </div>`;
        }
    })
    displayOthers = false;
}

function VisibilityMonitor(element, showfn, hidefn) {
    let isshown = false;
    function check() {
        if (rectsIntersect(getPageRect(), getElementRect(element)) !== isshown) {
            isshown = !isshown;
            isshown ? showfn() : hidefn();
        }
    };
    window.onscroll = window.onresize = check;
    check();
}

function getPageRect() {
    let isquirks = document.compatMode !== 'BackCompat';
    let page = isquirks ? document.documentElement : document.body;
    let x = page.scrollLeft;
    let y = page.scrollTop;
    let w = 'innerWidth' in window ? window.innerWidth : page.clientWidth;
    let h = 'innerHeight' in window ? window.innerHeight : page.clientHeight;
    return [x, y, x + w, y + h];
}

function getElementRect(element) {
    let x = 0, y = 0;
    if (element) {
        let w = element.offsetWidth, h = element.offsetHeight;
        while (element.offsetParent !== null) {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return [x, y, x + w, y + h];
    }
}

function rectsIntersect(a, b) {
    if (a & b) {
        return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
    }
}

VisibilityMonitor(
    document.getElementById('importantdiv'),
    function () {
        if (displayOthers == true) {
            ok(page);
            page++
        }
    },
    function () {
        //alert('div gone away!');
    }
);


// console.log(localStorage.getItem("myList"))
const movies = JSON.parse(localStorage.getItem("myList"));
if (movies) {
    movies.forEach((movie, index) => {
        // console.log(selectedMovie);
        if (EmptyWatchList) {
            EmptyWatchList.innerHTML += `
             <div class="items">
                 <img src=${movie.poster_path}>
                 <div class="last">
                     <h2>${movie.original_title}</h2>
                     <p>${movie.popularity}</p>
                     <button class="remove"> - </button>
                 </div>
             </div>`;
        };
    });
}
let removes = document.querySelectorAll(".remove");

console.log(removes)
removes.forEach((remove, index) => {
    console.log(remove)
    remove.addEventListener("click", () => {
        myList = [
            ...myList.slice(0, index),
            ...myList.slice(index + 1)
        ];
        const myListJSON = JSON.stringify(myList);
        // console.log(myList)
        localStorage.setItem("myList", myListJSON);
        window.open("list.html", "_self");
    })
    counter.textContent = myList.length;
})

