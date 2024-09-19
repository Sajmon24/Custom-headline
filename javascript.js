// User's Input
let colors = prompt(
  "Enter 3 number separated with coma (000-359)",
  "023, 159, 266"
);

// Cancel button
if (!colors) {
  alert("You need to confirm your choice, by clicking 'OK'");
  location.reload();
}

// function for applying randomized choosen color
const loadAPI = async (color1, color2, color3) => {
  //Editing of input for better functionality
  color1 = color1.trim();
  color2 = color2.trim();
  color3 = color3.trim();
  if (color1.length !== 3 || color2.length !== 3 || color3.length !== 3) {
    throw new Error(
      alert(
        "Input must contain 3 numbers with 3 digits from 000 to 359! (separated with coma)!"
      ),
      location.reload()
    );
  }

  // Variables for styling
  const headlineH1 = document.querySelector("h1");
  const colorClass1 = document.querySelectorAll(".color1");
  const colorClass2 = document.querySelectorAll(".color2");
  const colorClass3 = document.querySelectorAll(".color3");

  //fetching random shades based of input
  let promiseAPI;
  try {
    promiseAPI = await Promise.all([
      (await fetch(`https://x-colors.yurace.pro/api/random/${color1}`)).json(),
      (await fetch(`https://x-colors.yurace.pro/api/random/${color2}`)).json(),
      (await fetch(`https://x-colors.yurace.pro/api/random/${color3}`)).json(),
    ]);
    // Aplying style
    headlineH1.style.color = promiseAPI[0].rgb;
    headlineH1.style["-webkit-text-stroke-color"] = promiseAPI[1].rgb;
    headlineH1.style.background = promiseAPI[2].rgb;
    for (let i = 0; i < 2; i++) {
      colorClass1[i].style.backgroundColor = promiseAPI[0].rgb;
      colorClass2[i].style.backgroundColor = promiseAPI[1].rgb;
      colorClass3[i].style.backgroundColor = promiseAPI[2].rgb;
    }
  } catch (err) {
    console.log(err, err.message, "error");
    alert("Error:", err.message);
  }
};

loadAPI(...colors.split(","));
