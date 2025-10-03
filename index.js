
function randomLocation() {
  const locations = ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Quetta"];
  return locations[Math.floor(Math.random() * locations.length)];
}
function randomDaysAgo() {
  return Math.floor(Math.random() * 30) + " days ago";
}

function fetchDataAndStore() {
  const urls = [
    { url: "https://dummyjson.com/products/category/smartphones", category: "mobiles" },
    { url: "https://dummyjson.com/products/category/laptops", category: "laptops" },
    { url: "https://dummyjson.com/products/category/motorcycle", category: "bikes" },
    { url: "https://dummyjson.com/products/category/home-decoration", category: "properties" }
  ];

  let storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  if (storedPosts.length === 0) {
    Promise.all(urls.map(item => fetch(item.url).then(res => res.json())))
      .then(results => {
        results.forEach((result, index) => {
          const category = urls[index].category;
          result.products.forEach(product => {
            storedPosts.push({
              id: product.id,
              title: product.title,
              description: product.description,
              category: category,
              price: product.price * 280,
              image: product.thumbnail,
              date: new Date()
            });
          });
        });
        localStorage.setItem("posts", JSON.stringify(storedPosts));
        loadLocalPosts();
      });
  } else {
    loadLocalPosts();
  }
}

function loadLocalPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const containers = {
    mobiles: document.getElementById("mobiles"),
    laptops: document.getElementById("laptops"),
    bikes: document.getElementById("bikes"),
    properties: document.getElementById("properties")
  };

  for (let key in containers) {
    if (containers[key]) containers[key].innerHTML = "";
  }

  posts.forEach(post => {
    const container = containers[post.category];
    if (container) {
      container.innerHTML += `
            <a href='./product.html?id=${post.id}' target="_blank">
                <div class="card">
                    <div class="heart"></div>
                    <img src="${post.image}" alt="${post.title}" />
                    <div class="info">
                        <p class="price">Rs ${post.price}</p>
                        <p class="title">${post.title}</p>
                        <div class="meta">
                            <span>${randomLocation()}</span>
                            <span>${randomDaysAgo()}</span>
                        </div>
                    </div>
                </div>
            </a>
            `;
    }
  });
}

fetchDataAndStore();

// login
function showContainer() {
  document.getElementById("olxContainer").style.display = "none";
  document.getElementById("container").style.display = "block";
}

function goBack(){
  document.getElementById("olxContainer").style.display = "block";
  document.getElementById("container").style.display = "none";  
}

class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + " " + lastName;
    this.email = email;
    this.password = password;
  }
}


function showSignup(event) {
  event.preventDefault();
  document.getElementById("signupContainer").style.display = "block";
  document.getElementById("loginContainer").style.display = "none";
}

function showLogin(event) {
  event.preventDefault();
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("signupContainer").style.display = "none";
}

function details(event) {
  event.preventDefault();
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var message = document.getElementById("message");

  if (firstName === "" || lastName === "" || email === "" || password === "") {
    message.innerText = "Please fill all fields before signing up!";
    message.style.color = "red";
    return;
  }

  var users = JSON.parse(localStorage.getItem("olx user")) || [];

  let result = users.find((element) => element.email == email)
  if (result?.email) {
    alert("user already exist")
  } else {
    let user = new User(firstName, lastName, email, password)
    users.push(user)
    localStorage.setItem("olx user", JSON.stringify(users))
  }

  document.getElementById("signupContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
}

function login(event) {
  event.preventDefault();
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;
  var loginMessage = document.getElementById("loginMessage");

  var users = JSON.parse(localStorage.getItem("olx user")) || [];
  let loggedInUser = users.find((element) => element.email === loginEmail && element.password === loginPassword);

  if (loggedInUser) {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));//

    document.getElementById("olxContainer").style.display = "block";
    document.getElementById("container").style.display = "none";
    document.getElementById("sellBtn").disabled = false;
    document.getElementById("information").style.display = "inline-block";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    loginMessage.innerHTML = "Invalid email or password! Please try again.";
    loginMessage.style.color = "red";
    document.getElementById("sellBtn").disabled = true;
    document.getElementById("logoutBtn").style.display = "none";

  }
}

function sellBtn() {
  window.location.href = "post.html"
}
function information() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true" && currentUser) {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: `<h3>User Information:<h3/><p>Name: ${currentUser.fullName}<p/><p>Email: ${currentUser.email}<p/>`,
      showConfirmButton: false,
      timer: 2500
    });
  } else {
    alert(" No user is currently logged in.");
  }
}

function checkUser() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (isLoggedIn === "true" && currentUser) {
    document.getElementById("sellBtn").disabled = false;
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("information").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    document.getElementById("sellBtn").disabled = true;
    document.getElementById("loginBtn").style.display = "inline-block";
    document.getElementById("information").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
  }
};
checkUser();

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  checkUser();
}

