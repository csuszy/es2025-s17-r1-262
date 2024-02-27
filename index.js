async function getFeaturedRestaurant() {
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants/top-rated');
    const restaurants = await response.json();
    let toHTML = "";

    try {
        for (let resInfo of restaurants) {
            let ertekelesHTML = "";

            for (let i = 1; i <= 5; i++) {
                let csillag = document.createElement('img');
                csillag.src = i <= resInfo.rating ? './assets/images/star.png' : './assets/images/star.png';
                csillag.alt = 'Star';
                if (i - 1 >= resInfo.rating) {
                    csillag.classList.add('gray');
                }
                ertekelesHTML += csillag.outerHTML;
            }

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

getFeaturedRestaurant();




let toHTMLlater = "";
let toHTML = "";
async function getAllRestaurant() {
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants');
    const restaurants = await response.json();
    let curCard = 0;

    try {
        for (let resInfo of restaurants) {
            curCard += 1;
            let ertekelesHTML = "";

            for (let i = 1; i <= 5; i++) {
                let csillag = document.createElement('img');
                csillag.src = i <= resInfo.rating ? './assets/images/star.png' : './assets/images/star.png';
                csillag.alt = 'Star';
                if (i - 1 >= resInfo.rating) {
                    csillag.classList.add('gray');
                }
                ertekelesHTML += csillag.outerHTML;
            }
            if (curCard >= 4) {
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


