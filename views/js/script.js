function login() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // submit bosilganda boshqa oynaga sakrab ketmasligi uchun preventDefault qoyiladi!

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3333/api/author/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Login successfully");

        // location.href = "/dashboard"; // agar kerak bo‘lsa sahifani o‘zgartirish
      });
  });
}

async function getAuthors() {
  let accessToken = localStorage.getItem("accessToken");

  const accessTokenExtTime = getTokenExpTime(accessToken);
  console.log(`accessTokenExtTime`, accessTokenExtTime);
  if (accessTokenExtTime) {
    const curTime = new Date();
    if (curTime < accessTokenExtTime) {
      console.log(`Access Token faol`);
    } else {
      console.log(`Access Token vaqti chiqib ketgan. `);
      accessToken = await refreshTokenAuthorddd();
    }
  } else {
    console.log(`Access token chiqish vaqti berilmagan`);
  }

  fetch("http://localhost:3333/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(`Request failed`, response.status);
      }
    })
    .then((authorData) => {
      console.log(authorData);
      displayAuthors(authorData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayAuthors(authorsData) {
  const authorsList = document.getElementById("list-authors");
  authorsData.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${author.first_name}-${author.last_name}-${author.email}`;
    authorsList.appendChild(listItem);
  });
}

function getTokenExpTime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshTokenAuthorddd() {
  const loginUrl = "/login";
  try {
    const response = await fetch("http://localhost:3333/api/author/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    });

    const data = await response.json();
    console.log(data);
    if (data.error?.message == "jwt expired") {
      console.log(`Refresh Tokenning vaqti chiqib ketgan`);
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordamida yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}
