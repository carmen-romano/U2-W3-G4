const URL_PEXELS = "https://api.pexels.com/v1/search?query=";
const URL_PEXELS_MODAL = "https://api.pexels.com/v1/photos/";
let randomViewImages = Math.floor(Math.random() * 10);
let page = "&page=" + randomViewImages;
let currentQuery = "sea";
const btnCartoon = document.getElementById("btnCartoon");
const btnSunset = document.getElementById("btnSunset");
const searchImg = document.getElementById("searchImg");

const loadModalDetails = (photoId) => {
  fetch(URL_PEXELS_MODAL + photoId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "wybsMdEQfaih71lVvIIkMdVmmVZ9w5XD5L46FuljxXMPZIqsiNNXxem3",
    },
  })
    .then((response) => response.json())
    .then((modalDate) => {
      let staticBackdropLabel = document.getElementById("staticBackdropLabel");
      staticBackdropLabel.innerText = "Photographer: " + modalDate.photographer;
      let imgModal = document.getElementById("imgModal");
      imgModal.src = modalDate.src.portrait;
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

searchImg.addEventListener("input", () => {
  const searchValue = searchImg.value;
  if (searchValue !== "") {
    currentQuery = searchValue;
    pexelsOnLoad();
  }
});

btnCartoon.addEventListener("click", () => {
  currentQuery = "cartoon";
  pexelsOnLoad();
});
btnSunset.addEventListener("click", () => {
  currentQuery = "sunset";
  pexelsOnLoad();
});

const pexelsOnLoad = () => {
  fetch(URL_PEXELS + currentQuery + page, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "wybsMdEQfaih71lVvIIkMdVmmVZ9w5XD5L46FuljxXMPZIqsiNNXxem3",
    },
  })
    .then((response) => response.json())
    .then((pexelsData) => {
      rowContainer.innerHTML = "";
      console.log(pexelsData);
      pexelsData.photos.forEach((photo) => {
        let col = document.createElement("div");
        col.classList.add("col-md-4");

        let card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");

        let imgCard = document.createElement("img");
        imgCard.src = photo.src.portrait;
        imgCard.alt = photo.alt;
        imgCard.classList.add("card-img-top", "object-fit-cover", "w-100");
        imgCard.onclick = () => {
          window.location.href = "details.html?id=" + photo.id;
        };

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = photo.photographer;

        let cardFooter = document.createElement("div");
        cardFooter.classList.add(
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        let divBtnGroup = document.createElement("div");
        divBtnGroup.classList.add("btn-group");

        let btnView = document.createElement("button");
        btnView.classList.add(
          "btn",
          "btn-sm",
          "btn-outline-secondary",
          "btn-view"
        );
        btnView.setAttribute("data-bs-toggle", "modal");
        btnView.setAttribute("data-bs-target", "#staticBackdrop");
        btnView.setAttribute("data-attribute", `${photo.id}`);
        btnView.textContent = "View";
        ///CREAZIONE MODALE PER IMG

        const btnViewList = document.querySelectorAll(".btn-view");
        btnViewList.forEach((btnView) => {
          btnView.addEventListener("click", () => {
            const photoId = btnView.getAttribute("data-attribute");
            console.log("ID dell'immagine:", photoId);
            loadModalDetails(photoId);
          });
        });

        let btnHide = document.createElement("button");
        btnHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
        btnHide.textContent = "Hide";
        btnHide.addEventListener("click", () => {
          card.parentNode.remove();
        });

        let divSmall = document.createElement("div");

        let small = document.createElement("small");
        small.classList.add("text-muted");
        small.textContent = photo.id;

        col.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(cardFooter);
        cardFooter.appendChild(divBtnGroup);
        divBtnGroup.appendChild(btnView);
        divBtnGroup.appendChild(btnHide);
        divSmall.appendChild(small);

        cardFooter.appendChild(divSmall);

        rowContainer.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

window.onload = () => {
  rowContainer = document.getElementById("container-row");
  pexelsOnLoad();
};
