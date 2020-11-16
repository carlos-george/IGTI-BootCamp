window.addEventListener("load", start);

    function start() {
      console.log("Page loaded!!!");
      setColor();
    }

    var div = document.querySelector("#div"),
      red = document.querySelector("#red"),
      green = document.querySelector("#green"),
      blue = document.querySelector("#blue"),
      red_out = document.querySelector("#red_out"),
      green_out = document.querySelector("#green_out"),
      blue_out = document.querySelector("#blue_out");

    function setColor() {
      var rgb = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
      red_out.value = red.value;
      green_out.value = green.value;
      blue_out.value = blue.value;
      div.style.backgroundColor = rgb;
    }

    red.addEventListener("change", setColor);
    red.addEventListener("input", setColor);

    green.addEventListener("change", setColor);
    green.addEventListener("input", setColor);

    blue.addEventListener("change", setColor);
    blue.addEventListener("input", setColor);