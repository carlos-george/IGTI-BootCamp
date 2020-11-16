window.addEventListener("load", () => {
  console.log("Page loaded!!!");

  getData().then(res => {
    res.map(u => {
      const user = {
        name: `${u.name.first} ${u.name.last}`,
        image: u.picture.thumbnail,
        age: u.dob.age,
        gender: u.gender
      };
      users = [...users, user];
    });
  });

  render();
});

async function getData() {
  const list = fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  ).then(async response => {
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }

    throw new Error("Não foi possível pegar os dados");
  });

  return await list;
}

var users = [];
var filtersUsers = [];

var divUsers = document.querySelector("#users");
var divStatistics = document.querySelector("#statistics");

var filter = document.querySelector("input"),
  button = document.querySelector("button");

filter.addEventListener("keyup", setButtonBackgroudColor);
button.addEventListener("click", handleSearchUsers);

function usersIncludes(user) {
  const nameLower = user.name.first.toLowerCase();
  const inputValue = filter.value.toLowerCase();

  console.log(nameLower);
  console.log(inputValue);

  return nameLower.includes(inputValue);
}

function handleSearchUsers(event) {
  filtersUsers = users.filter(user => {
    // const nameFull = `${user.name.first} ${user.name.last}`;
    const inputValue = filter.value.toLowerCase();
    if (user.name.toLowerCase().includes(inputValue)) {
      return user;
    }
  });
  render();
}

function render() {
  divUsers.innerHTML = "";
  divStatistics.innerHTML = "";
  if (filtersUsers.length > 0) {
    setUsersResult();
    setStatitisticsResult();
  } else {
    var h2Users = document.createElement("h2");
    h2Users.textContent = "Nenhum usuário filtrado";
    var h2Statis = document.createElement("h2");
    h2Statis.textContent = "Nada a ser exibido";
    divUsers.appendChild(h2Users);
    divStatistics.appendChild(h2Statis);
  }
}

function setUsersResult() {
  var ul = document.createElement("ul");
  var p = document.createElement("p");
  var h2 = document.createElement("h2");
  h2.textContent = `${filtersUsers.length} Usuário(s) encontrado(s)`;
  p.appendChild(h2);

  for (var i = 0; i < filtersUsers.length; i++) {
    var li = document.createElement("li");
    var span = document.createElement("span");
    var img = document.createElement("img");
    img.src = filtersUsers[i].image;
    span.textContent = `${filtersUsers[i].name}, ${filtersUsers[i].age} anos`;
    li.appendChild(img);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divUsers.appendChild(p);
  divUsers.appendChild(ul);
}

function setStatitisticsResult() {
  var h2 = document.createElement("h2");
  h2.textContent = "Estatísticas";
  divStatistics.appendChild(h2);

  var male = document.createElement("p");
  var female = document.createElement("p");
  var age = document.createElement("p");
  var avaregeAge = document.createElement("p");

  var maleArray = filtersUsers.filter(user => {
    if (user.gender === "male") {
      return user;
    }
  });

  var femaleArray = filtersUsers.filter(user => {
    if (user.gender === "female") {
      return user;
    }
  });

  var ages = filtersUsers.map(user => user.age);

  function totalAge(total, num) {
    return total + num;
  }

  var tAge = ages.reduce(totalAge);

  male.textContent = `Sexo Masculino: ${maleArray.length}`;
  female.textContent = `Sexo feminino: ${femaleArray.length}`;
  age.textContent = `Soma das idades: ${tAge}`;
  avaregeAge.textContent = `Média das idades: ${tAge / filtersUsers.length}`;

  divStatistics.appendChild(male);
  divStatistics.appendChild(female);
  divStatistics.appendChild(age);
  divStatistics.appendChild(avaregeAge);
}

function setButtonBackgroudColor(event) {
  var text = event.target.value;

  if (event.type === "keyup" && text.trim() !== "") {
    button.className = "form-button-focus";
    button.removeAttribute("disabled");
  } else if (text.trim() === "") {
    button.className = "form-button";
    button.disabled = true;
    filtersUsers = [];
    render();
  }
  if (event.key === "Enter" && text.trim() !== "") {
    handleSearchUsers();
  }
}
