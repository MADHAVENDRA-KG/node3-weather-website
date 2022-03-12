// console.log("Hey this is the js file");

const form = document.querySelector("form");
const input = document.querySelector("input");
const p1 = document.querySelector("#para1");
const p2 = document.querySelector("#para2");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(input.value);
  p1.textContent = "loading";
  p2.textContent = "";
  fetch("/weather?address=" + input.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = data.error;
      } else {
        p1.textContent = data.location;
      }
    });
  });
});
