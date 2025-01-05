

const accesskey = "ctWMSvpgdm1riYKkETR79GSygKT0IcDllAqhNCxOPZY";

const formE1 = document.querySelector("form");
const searchInputE1 = document.getElementById("search-input"); 
const searchResultE1 = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputE1.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }
        const data = await response.json();

        if (page === 1) {
            searchResultE1.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const imageWraper = document.createElement("div");
            imageWraper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWraper.appendChild(image);
            imageWraper.appendChild(imageLink);
            searchResultE1.appendChild(imageWraper);
        });

        page++;

        if (page > 1) {
            showMoreButton.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; 
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});





































