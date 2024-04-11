const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL_PEXELS = "https://api.pexels.com/v1/photos/";
const details = () => {
  fetch(URL_PEXELS + id, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "wybsMdEQfaih71lVvIIkMdVmmVZ9w5XD5L46FuljxXMPZIqsiNNXxem3",
    },
  })
    .then((response) => response.json())
    .then((detailsData) => {
      let h1Title = document.getElementById("h1Title");
      h1Title.textContent = detailsData.alt;
      let pDetails = document.getElementById("pDetails");
      pDetails.textContent = "By " + detailsData.photographer;

      let container = document.getElementById("container");
      let col = document.createElement("div");
      col.classList.add("card", "mb-3", "m-5");

      let imgCard = document.createElement("img");
      imgCard.src = detailsData.src.medium;
      imgCard.alt = detailsData.alt;
      imgCard.classList.add("card-img-top");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "text-center");

      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = detailsData.photographer;

      let p = document.createElement("p");
      p.classList.add("card-text");
      p.textContent = "ID: " + detailsData.id;

      let small = document.createElement("small");
      small.classList.add("text-body-secondary");
      p.appendChild(small);

      container.appendChild(col);
      col.appendChild(imgCard);
      col.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(p);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

window.onload = () => {
  details();
};
