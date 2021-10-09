(function () {

    const URL = "../../data.json",
        main__container = document.querySelector(".main__container"),
        post__template = document.getElementById("post__template"),
        API_KEY = "563492ad6f9170000100000120c4713381704856b73e53642541346a",
        URL__PROFILE = "https://api.pexels.com/v1/search?query=profile",
        URL__IMAGES = "https://api.pexels.com/v1/search?query=rome";

    for (let i = 0; i < 3; i++) {
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

    allData.then((response) => {
        console.log(response);
        main__container.innerHTML = "";

        response[0].forEach((data) => {
            const div = post__template.content.cloneNode(true);

            div.querySelector(".top__section .top__section--text").innerHTML = `
                <h4>${data.name}</h4>
                <p>${data.job} at ${data.company}</p>
            `;

            div.querySelector(".body__section .description").innerHTML = `
                <p>${data.description}</p>
            `;

            response[1].photos.forEach((data) => {
                div.querySelector(".top__section > img").src = data.src.original;
            });

            response[2].photos.forEach((data) => {
                div.querySelector(".body__section > img").src = data.src.original;
            });

            main__container.append(div);
        });

    });

})();