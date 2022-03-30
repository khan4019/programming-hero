const apiUrl = "https://hq.programming-hero.com/api/v1/team-members";
const main = document.getElementById("main");

teams(apiUrl);
function teams(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      teamData = data.data;
      console.log(teamData)
      teamData.forEach((users) => {

        //create elements dom
        const el = document.createElement("div");
        const image = document.createElement("img");
        const name = document.createElement("h2");
        const designation = document.createElement("p");

//        var imagePrefix = "https://phero-web.nyc3.cdn.digitaloceanspaces.com/website-prod-images/";

        //set data element
        name.innerHTML = `${users.fullName}`;
        designation.innerHTML = `${users.designation}`;
        image.src = `${users.profileImage}`
        //image.src = `${imagePrefix}${member.profileImage}`

        //append data dom
        el.appendChild(image);
        el.appendChild(name);
        el.appendChild(designation);
        main.appendChild(el);
      });
    });
}