
function savePost() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!currentUser || isLoggedIn !== "true") {
    alert("Please login first to post an ad!");
    return;
  }

  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;
  const category = document.getElementById("category").value.toLowerCase() + "s";
  const price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  if (title === "" || description === "" || price === "") {
    document.getElementById("info").innerHTML = "<p style='color:red;'>Please fill all required fields.</p>";
    return;
  }

  if (image === "") {
    image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqVnsw_gO8hSyK7yInvJ0K2Nh9bxI2U_1SMA&s";
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const newPost = {
    id: "local-" + new Date().getTime(),
    title: title,
    description: description,
    category: category,
    price: price,
    image: image,
    date: new Date()
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("info").innerHTML = "<p style='color:green;'>Ad posted successfully! Redirecting...</p>";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}
