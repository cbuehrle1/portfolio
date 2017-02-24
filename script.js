var title = document.querySelector(".title-container");
var shader = document.querySelector(".container-shader");
var about = document.querySelector(".about-container");
var aboutFloat = document.querySelectorAll(".float-div");
var aboutContent = document.querySelectorAll('.float-centering');
var headerDiv = document.querySelector('header');

var toggled = [false, false]

var insertText = ["About 8 months ago I decided I enjoyed problem-solving so much, that I wanted to pursue a career in web development. Coming from a background in technical sales, I bring excellent communication skills and attention to detail along with my quickly developing new set of technical knowledge.",
"Technologies I have used:; HTML5; CSS3; JavaScript; React.js; Node.js; Express.js; MongoDB; Mysql; Gulp; With a list of tools that continues to grow daily!"]

function parser (item) {

  if (item.indexOf(";") === -1) {
    return item;
  }

  var itemArr = item.split("; ");

  var list = function(itemArr) {
    var newArr = []
    for (var i = 1; i < itemArr.length; i++) {
      newArr.push(itemArr[i]);
    }
    return newArr;
  }

  var itemObj = {
    title: itemArr[0],
    techList: list(itemArr)
  }

  return itemObj;
}

aboutContent.forEach(function(div, index) {
  div.setAttribute("float-index", index);
});

var adjustedHeight = window.innerHeight / 2

title.style.height = window.innerHeight + "px";
shader.style.height = window.innerHeight + "px";
shader.style.width = window.innerWidth + "px";
about.style.height = adjustedHeight + "px";

aboutFloat.forEach(function (div) {
  div.style.height = adjustedHeight + "px";
});

var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");

window.addEventListener("optimizedResize", function() {
  title.style.height = window.innerHeight + "px";
  shader.style.height = window.innerHeight + "px";
  about.style.height = adjustedHeight + "px";
  shader.style.width = window.innerWidth + "px";

  aboutFloat.forEach(function (div) {
    div.style.height = adjustedHeight + "px";
  });

});

about.addEventListener("click", function(evt) {
  var index;
  var targetElement;

  if (evt.target.className === "float-centering") {
    index = evt.target.getAttribute("float-index");
    targetElement = evt.target.children[0];
  }
  else if (evt.target.parentElement.className === "float-centering") {
    index = evt.target.parentElement.getAttribute("float-index");
    targetElement = evt.target;
  }
  else if (evt.target.parentElement.parentElement.className === "float-centering") {
    index = evt.target.parentElement.parentElement.getAttribute("float-index");
    targetElement = evt.target.parentElement;
  }
  else {
    return;
  }


  if (toggled[index]) {

    targetElement.innerHTML = "";
    var header = document.createElement("h1");

    if (index == 0) {
      header.textContent = "My Story"
    }
    else if (index == 1) {
      header.textContent = "My Skill Set"
    }
    targetElement.appendChild(header);
    toggled[index] = false;
    aboutFloat[index].style.height = adjustedHeight + "px";
    about.style.height = adjustedHeight + "px";
  }
  else {

    var test = parser(insertText[index]);

    if (typeof test === "object") {
      var contentP = document.createElement("p");
      var techList = document.createElement("ul");
      contentP.textContent = test.title;

      contentP.style.textAlign = "left";
      techList.style.textAlign = "left";

      test.techList.forEach(function(item) {
        var li = document.createElement("li")
        li.textContent = item;
        techList.appendChild(li);
      });
      targetElement.appendChild(contentP);
      targetElement.appendChild(techList);
    }
    else if (typeof test === "string") {
      var contentP = document.createElement("p");
      contentP.style.textAlign = "left";
      contentP.textContent = insertText[index];
      targetElement.appendChild(contentP);
    }

    toggled[index] = true;
    aboutFloat[index].style.height = window.innerHeight + "px";
    about.style.height = window.innerHeight + "px";
  }

});

window.addEventListener("scroll", function() {

  if (window.scrollY >= window.innerHeight) {
    headerDiv.className = "content-header";
  }
  else if (window.scrollY < window.innerHeight) {
    headerDiv.className = "";
  }

});
