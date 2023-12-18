const projectsContainer = document.getElementById('projects-screen');
let projects = null;

fetch('projects.json')
  .then(response => response.json())
  .then(jsonData => {
    projects = jsonData.projects;
    buildPage();
  })
  .catch(error => console.error('Error while loading file: ', error));

function buildPage() {
  projects.forEach((o) => {
    const container = document.createElement("div");
    container.className = "project-container";

    const info = document.createElement("div");
    info.className = "project-info";

    const iconBG = document.createElement("div");
    iconBG.className = "project-icon-bg";

    const icon = document.createElement("img");
    icon.src = o.icon;

    const name = document.createElement("h2");
    name.textContent = o.title;

    const descr = document.createElement("p");
    descr.textContent = o.description;

    const statusContainer = document.createElement("div");
    const statusDefaultText = document.createElement("p");
    statusDefaultText.textContent = "Status >> "
    const status = document.createElement("p");
    status.textContent = o.status;
    statusContainer.className = "project-status";

    if (o.status == "Complete") {
      status.className = "status-green";
    } else if (o.status == "InDev") {
      status.className = "status-orange";
    } else if (o.status == "Deffered" || o.status == "Outdated") {
      status.className = "status-red";
    }

    const link = document.createElement("a");
    const button = document.createElement("button");
    button.textContent = "Go To Project";

    if (o.link != "null") {
      link.href = o.link;
      link.target= "_blank";
      button.className = "project-action";
    } else {
      button.className = "project-action action-disabled";
    }


    container.appendChild(info);
    info.appendChild(iconBG);
    iconBG.appendChild(icon);
    info.appendChild(name);

    container.appendChild(descr);
    container.appendChild(statusContainer);
    statusContainer.appendChild(statusDefaultText);
    statusContainer.appendChild(status);
    container.appendChild(link);
    link.appendChild(button);

    projectsContainer.appendChild(container);
  });
}
