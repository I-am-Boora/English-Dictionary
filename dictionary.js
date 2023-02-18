const input = document.querySelector(".input-data input");
const contentContainer = document.querySelector(".content-container");
const definitionContainer = document.querySelector(".defination");
const searchBtn = document.querySelector(".search-btn");
const soundBtn = document.querySelector(".sound-btn");
const word = document.querySelector(".word span");
const phonetic = document.querySelector(".phonetic-def");
const wordSound = document.querySelector(".music audio");
const defination = document.querySelector(".word-defination");
const loading = document.querySelector(".loading-container");
const errorContainer = document.querySelector(".error");
const example1 = document.querySelector(".example1");
const example2 = document.querySelector(".example2");

var soundRecord = "";

// when user click on the Enter Button call getDictionary function

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getDictionary();
  }
});

// when user click on the Search Button call getDictionary function

searchBtn.addEventListener("click", (e) => {
  if (input.value == "") {
    alert("Please Enter Valid Data!!!");
  } else {
    getDictionary();
  }
});

// function to use fetch Api and set data to the html tag

async function getDictionary() {
  try {
    contentContainer.classList.add("active");
    loading.classList.remove("hide");
    errorContainer.classList.add("error-hide");
    const ApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
    const res = await fetch(ApiUrl);
    const data = await res.json();
    if (data.title == "No Definitions Found") {
      //when definition of the word is not found
      input.value = "";
      contentContainer.classList.add("active");
      loading.classList.add("hide");
      errorContainer.classList.remove("error-hide");
    } else {
      contentContainer.classList.remove("active");
      word.innerHTML = data[0].word; //set word
      soundRecord = data[0].phonetics[0].audio; //set the audio of word
      if (soundRecord) {
        wordSound.setAttribute("src", soundRecord);
      } else {
        //if user doesn't get any audio then set empty value
        soundRecord = "";
        wordSound.setAttribute("src", soundRecord);
        soundBtn.innerHTML = "volume_off";
      }

      example1.innerHTML = "";
      const phoneticWord = data[0].phonetic; // set the example value
      if (!phoneticWord) {
        // when user dosen't get example
        phonetic.innerHTML = "Unavailable";
      } else {
        phonetic.innerHTML = data[0].phonetic;
      }

      defination.innerHTML = data[0].meanings[0].definitions[0].definition; // set definition
      const eg1 = data[0].meanings[0].definitions[0].example;
      if (eg1) {
        //when user get the value of example
        example1.innerHTML = `eg:- ${eg1}`;
      }

      input.value = "";
      loading.classList.add("hide");
    }
  } catch (error) {
    //when user get any error

    alert("Something went wrong!!!");
    loading.classList.add("hide");
  }
}
//when user click on the audio button

soundBtn.addEventListener("click", () => {
  wordSound.play();
});
