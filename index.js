//The first thing we need to do is to import the fetch function from the API.
async function getFeaturedRestaurant() {
    //fetch the data from the URL
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants/top-rated');
    const restaurants = await response.json();
    let toHTML = "";

    try {
        for (let resInfo of restaurants) {
            let ertekelesHTML = "";

            //After we fetch the data and store it, after we check the rating,and we add the stars to the card.
            for (let i = 1; i <= 5; i++) {
                let csillag = document.createElement('img');
                csillag.src = i <= resInfo.rating ? './assets/images/star.png' : './assets/images/star.png';
                csillag.alt = 'Star';
                if (i - 1 >= resInfo.rating) {
                    csillag.classList.add('gray');
                }
                ertekelesHTML += csillag.outerHTML;
            }

            //After we add the stars to the card, add the next data to the card and add the next card to the card holder.
            toHTML += `
                <div class="card">
                    <div class="card-img">
                        <img src="${resInfo.image}" alt="">
                    </div>
                    <div class="card-nameandrate">
                        <h2>${resInfo.name}</h2>
                        <div class="ratestars">
                            ${ertekelesHTML}
                        </div>
                    </div>
                    <div class="card-description">
                        <p>${resInfo.description}</p>
                    </div>
                    <a class="card-viewrestaurant" href="#">View restaurant »</a>
                </div>
            `;
        }

    } catch (error) {
        console.error(error);
    }

    document.getElementById('cardholder').innerHTML += toHTML;
}
//Call the function to get the featured restaurant.
getFeaturedRestaurant();



// this variable contains the first 3 card, and the second variable contains the another cards.
let toHTMLlater = "";
let toHTML = "";
//The second function is used to get the ALL restaurants from the API.
async function getAllRestaurant() {

    //fetch the data from the URL
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants');
    const restaurants = await response.json();
    let curCard = 0;

    try {
        for (let resInfo of restaurants) {
            curCard += 1;
            let ertekelesHTML = "";

            //add the stars to the card.
            for (let i = 1; i <= 5; i++) {
                let csillag = document.createElement('img');
                csillag.src = i <= resInfo.rating ? './assets/images/star.png' : './assets/images/star.png';
                csillag.alt = 'Star';
                if (i - 1 >= resInfo.rating) {
                    csillag.classList.add('gray');
                }
                ertekelesHTML += csillag.outerHTML;
            }
            // This IF checks the stored card. If we stored the first 3 cards after the else sectionn add the another acard to the toHTMLLater varible.
            if (curCard >= 4) {

                //after everything is ok we add the card to the card holder.
                toHTMLlater += `
                    <div class="card">
                        <div class="card-img">
                            <img src="${resInfo.image}" alt="">
                        </div>
                        <div class="card-nameandrate">
                            <h2>${resInfo.name}</h2>
                            <div class="ratestars">
                                ${ertekelesHTML}
                            </div>
                        </div>
                        <div class="card-description">
                            <p>${resInfo.description}</p>
                        </div>
                        <a class="card-viewrestaurant" href="#">View restaurant »</a>
                    </div>
                `;
            }
            else{
                //after everything is ok we add the card to the card holder.
                toHTML += `
                    <div class="card">
                        <div class="card-img">
                            <img src="${resInfo.image}" alt="">
                        </div>
                        <div class="card-nameandrate">
                            <h2>${resInfo.name}</h2>
                            <div class="ratestars">
                                ${ertekelesHTML}
                            </div>
                        </div>
                        <div class="card-description">
                            <p>${resInfo.description}</p>
                        </div>
                        <a class="card-viewrestaurant" href="#">View restaurant »</a>
                    </div>
                `;
            }
        }

    } catch (error) {
        console.error(error);
    }

    document.getElementById('AllRestaurantCard').innerHTML += toHTML;
}

getAllRestaurant();



// this 2 function checks the button state. If the button is the Show more button, we add the cards from the toHTMLLater variable, set the button state none and enable the show less button and vice versa
function loadAllRes() {
    var btn = document.getElementById('showMoreBtn');
    var lessbtn = document.getElementById('showLessBtn');

    if (btn.style.display != 'none') {
        document.getElementById('AllRestaurantCard').innerHTML += toHTMLlater;
    }

    btn.style.display = 'none';
    lessbtn.style.display = 'flex';
}

function ShoLessRes() {
    var btn = document.getElementById('showLessBtn');
    var morebtn = document.getElementById('showMoreBtn');

    if (btn.style.display != 'none') {
        document.getElementById('AllRestaurantCard').innerHTML = toHTML;
    }

    btn.style.display = 'none';
    morebtn.style.display = 'flex';
}