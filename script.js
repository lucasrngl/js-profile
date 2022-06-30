const input = document.querySelector("header input");
const main = document.querySelector("main");

function getInput() {
    const text = input.value;
    if (window.event.keyCode == 13 && text.length > 0) {
        input.value = "";
        searchProfile(text);
    }
}

async function searchProfile(name) {
    try {
        const profile = await fetch(`https://api.github.com/users/${name}`)
        .then(response => {
            if (response.status != 200) {
                alert("User not found");
                throw new Error("User not found");
            }

            return response.json();
        });
        
        renderProfile(profile);
    } catch(e) {
        console.log(e);
    }
}

function renderProfile(profile) {
    const img = document.createElement("img")
    img.setAttribute("src", `${profile.avatar_url}`);
    img.setAttribute("alt", `${profile.name.split(" ")[0]}'s Avatar`);
    img.setAttribute("title", `${profile.name.split(" ")[0]}'s Avatar`);

    main.appendChild(img);

    main.innerHTML = `<img src="${profile.avatar_url}" alt="${profile.name.split(" ")[0]}'s Avatar" title="${profile.name.split(" ")[0]}'s Avatar"
    <div id="container">
        <div id="main">
            <h1>${profile.name}</h1>
            <p>${profile.login}</p>
            <p>${profile.bio}</p>
        </div>
        <div id="info">
            <div id="follow">
                <p><strong>${profile.followers}</strong> followers</p>
                <p><strong>${profile.following}</strong> following</p>
            </div>
            <div id="links">
                <a href="https://${profile.blog}" target="_blank">${profile.blog}</a>
                <a href="${profile.html_url}" target="blank">Visit GitHub</a>
            </div>
    </div>`
}