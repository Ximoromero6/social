(function () {

    const URL = "../../data.json",
        main__container = document.querySelector(".main__container"),
        post__template = document.getElementById("post__template"),
        API_KEY = "563492ad6f9170000100000120c4713381704856b73e53642541346a",
        URL__PROFILE = "https://api.pexels.com/v1/search?query=profile",
        URL__IMAGES = "https://api.pexels.com/v1/search?query=paris";

    for (let i = 0; i < 15; i++) {
        main__container.append(post__template.content.cloneNode(true));
    }

    const fetchReq1 = fetch(URL).then((res) => res.json());

    const fetchReq2 = fetch(URL__PROFILE, {
        headers: {
            "Authorization": API_KEY
        }
    }).then((res) => res.json());

    const fetchReq3 = fetch(URL__IMAGES, {
        headers: {
            "Authorization": API_KEY
        }
    }).then((res) => res.json());

    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3]);

    setTimeout(() => {
        allData.then((response) => {
            console.log(response);

            main__container.innerHTML = "";

            for (let i = 0; i < response[1].photos.length; i++) {
                const div = post__template.content.cloneNode(true);

                let data__text = response[0][i];

                /* Añadimos el nombre, el puesto y la compañia */
                div.querySelector(".top__section .top__section--text").innerHTML = `
                    <h4>${data__text.name}</h4>
                    <p>${data__text.job} at ${data__text.company}</p>
                `;

                /* Añadimos la descripción */
                div.querySelector(".body__section--description").innerHTML = `
                    <p>${data__text.description}</p>
                `;

                /* Añadimos la foto de perfil */
                div.querySelector(".top__section--image").innerHTML = `
                    <img src="${response[1].photos[i].src.landscape}" alt="">
                `;

                /* Añadimos la foto de fondo */
                div.querySelector(".body__section--image").innerHTML = `
                    <img src="${response[2].photos[i].src.landscape}" alt="">
                `;

                main__container.append(div);

            }

        });
    }, 4000);

})();