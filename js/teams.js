const apiUrl = "https://web.programming-hero.com/api/team-member/team-members";
const main = document.getElementById("main");

teamsURL(apiUrl);
function teamsURL(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      teamData = data.data;
      teamData.forEach((member) => {

        //create elements dom
        const el = document.createElement("div");
        const image = document.createElement("img");
        const name = document.createElement("h2");
        const designation = document.createElement("p");

        var imagePrefix = "https://phero-web.nyc3.cdn.digitaloceanspaces.com/website-prod-images/";

        //set data element
        name.innerHTML = `${member.name}`;
        designation.innerHTML = `${member.designation}`;
        image.src = `${imagePrefix}${member.image}`

        //append data dom
        el.appendChild(image);
        el.appendChild(name);
        el.appendChild(designation);
        main.appendChild(el);
      });
    });
}