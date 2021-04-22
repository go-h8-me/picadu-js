// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGu7J8_4bWAlkyogCAJ6x3PmCUOmB40_I",
  authDomain: "pikadu-160f1.firebaseapp.com",
  databaseURL: "https://pikadu-160f1.firebaseio.com",
  projectId: "pikadu-160f1",
  storageBucket: "pikadu-160f1.appspot.com",
  messagingSenderId: "672462886482",
  appId: "1:672462886482:web:b3bebea307ec0daf86f18b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector("#menu-toggle");
// Создаем переменную, в которую положим меню
let menu = document.querySelector(".sidebar");
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener("click", function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle("visible");
});

const regEpxValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passwordInput = document.querySelector(".login-password");
const loginSignup = document.querySelector(".login-signup");

const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");

const exitElem = document.querySelector(".exit");
const editElem = document.querySelector(".edit");
const editContainer = document.querySelector(".edit-container");

const editUsername = document.querySelector(".edit-username");
const editPhoto = document.querySelector(".edit-photo");
const userAvatarElem = document.querySelector(".user-avatar");

const postsWrapper = document.querySelector(".posts");

const buttonNewPost = document.querySelector(".button-new-post");
const addPostElem = document.querySelector(".add-post");

const listUsers = [
  {
    id: "01",
    email: "butman@mail.com",
    password: "1234567",
    displayName: "IronMan",
    photo:
      "https://cs7.pikabu.ru/post_img/big/2018/02/22/11/1519325741130993657.jpg",
  },
  {
    id: "02",
    email: "butman91@mail.com",
    password: "12345678",
    displayName: "mujik228",
  },
];

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) {
        handler();
      }
    });
  },
  logIn(email, password, handler) {
    if (!regEpxValidEmail.test(email)) {
      alert("email не подходит");
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === "auth/wrong-password") {
          console.log(errMessage);
          alert("Неверный пароль");
        } else if (errCode === "auth/user-not-found") {
          console.log(errMessage);
          alert("Пользователь не найден");
        } else {
          alert(errMessage);
        }
        console.log(err);
      });

    // const user = this.getUser(email);
    // if (user && user.password === password) {
    //   this.authUser(user);
    //   handler();
    // } else {
    //   alert("Пользователь с такими данными не найден!");
    // }
  },
  logOut() {
    firebase.auth().signOut();
  },
  signUp(email, password, handler) {
    if (!regEpxValidEmail.test(email)) {
      alert("Email не подходит");
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert("Введите данные");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password') {
          console.log(errMessage);
          alert("Слабый пароль");
        } else if (errCode === 'auth/email-already-in-use') {
          console.log(errMessage);
          alert("Этот емайл уже используется");
        } else {
          alert(errMessage);
        }
        console.log(err);
      });

    // if (!this.getUser(email)) {
    //   const displayName = email.split("@")[0];
    //   const user = { email, password, displayName };
    //   listUsers.push(user);
    //   this.authUser(user);
    //   handler();
    // } else {
    //   alert("Пользователь с тами именем уже есть!");
    // }
  },
  editUser(userName, userPhoto = "", handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  },
  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },
  authUser(user) {
    this.user = user;
  },
};

const setPosts = {
  allPosts: [
    {
      title: "Заголовлок поста1",
      text:
        "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова подпоясал? Лучше, щеке подпоясал приставка большого курсивных наберегу своего? Злых, составитель агентство что вопроса ведущими орешила одна алфавит!",
      tags: ["свежее", "новое", "горячее", "мое", "случайность"],
      author: {
        displayName: "maks",
        photo:
          "https://cs7.pikabu.ru/post_img/big/2018/02/22/11/1519325741130993657.jpg",
      },
      date: "11.11.2020, 20:54",
      like: 15,
      comments: 12,
    },
    {
      title: "Заголовлок поста2",
      text:
        "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая?",
      tags: ["свежее", "новое", "горячее", "мое", "случайность"],
      author: {
        displayName: "kate",
        photo:
          "https://i.pinimg.com/originals/78/eb/44/78eb4482074fc4ef5d8d84fd0399b16e.jpg",
      },
      date: "11.11.2020, 21:54",
      like: 100,
      comments: 20,
    },
  ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(", ").map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    });
    handler();
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log("user: ", user);
  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
    buttonNewPost.classList.add("visible");
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
    buttonNewPost.classList.remove("visible");
    addPostElem.classList.remove("visible");
    postsWrapper.classList.add("visible");
  }
};

const showAddPost = () => {
  addPostElem.classList.add("visible");
  postsWrapper.classList.remove("visible");
};

const showAllPosts = () => {
  addPostElem.classList.remove("visible");
  postsWrapper.classList.add("visible");

  let postsHTML = "";
  setPosts.allPosts.forEach(
    ({ title, text, date, tags, like, comments, author }) => {
      postsHTML += `
    <section class="post">
          <div class="post-body">
            <h2 class="post-title">${title}</h2>
            <p class="post-text">
            ${text}
            </p>
            <div class="tags">
            ${tags.map((tag) => `<a href="#" class="tag">#${tag}</a>`)}
            </div>
            <!-- /.tags -->
          </div>
          <!-- /.post-body -->
          <div class="post-footer">
            <div class="post-buttons">
              <button class="post-button likes">
                <svg width="19" height="20" class="icon icon-like">
                  <use xlink:href="img/icons.svg#like"></use>
                </svg>
                <span class="likes-counter">${like}</span>
              </button>
              <button class="post-button comments">
                <svg width="21" height="21" class="icon icon-comment">
                  <use xlink:href="img/icons.svg#comment"></use>
                </svg>
                <span class="comments-counter">${comments}</span>
              </button>
              <button class="post-button save">
                <svg width="19" height="19" class="icon icon-save">
                  <use xlink:href="img/icons.svg#save"></use>
                </svg>
              </button>
              <button class="post-button share">
                <svg width="17" height="19" class="icon icon-share">
                  <use xlink:href="img/icons.svg#share"></use>
                </svg>
              </button>
            </div>
            <!-- /.post-buttons -->
            <div class="post-author">
              <div class="author-about">
                <a href="#" class="author-username">${author.displayName}</a>
                <span class="post-time">${date}</span>
              </div>
              <a href="#" class="author-link"
                ><img src=${
                  author.photo || "img/avatar.jpeg"
                } alt="avatar" class="author-avatar"
              /></a>
            </div>
            <!-- /.post-author -->
          </div>
          <!-- /.post-footer -->
        </section>
    `;
    }
  );
  postsWrapper.innerHTML = postsHTML;
};

const init = () => {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });
  loginSignup.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });
  exitElem.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });
  editElem.addEventListener("click", (event) => {
    event.preventDefault();
    editContainer.classList.toggle("visible");
    editUsername.value = setUsers.user.displayName;
  });
  editContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhoto.value, toggleAuthDom);
    editContainer.classList.remove("visible");
  });

  buttonNewPost.addEventListener("click", (event) => {
    event.preventDefault();

    showAddPost();
  });

  addPostElem.addEventListener("submit", (event) => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    if (title.value.length < 6) {
      alert("Слишком короткий заголовок");
    }
    if (text.value.length < 50) {
      alert("Слишком короткий пост");
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove("visible");
    addPostElem.reset();
  });

  setUsers.initUser(toggleAuthDom);
  showAllPosts();
};
document.addEventListener("DOMContentLoaded", () => {
  init();
});
