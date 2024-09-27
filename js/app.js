const button = document.querySelector('.button');
const list = document.querySelector('.gallery');
const url = 'https://api.thecatapi.com/v1/images/search?limit=20';
const errorMessage = document.getElementById("messages__errorMessage");

async function getImages() {
    try {
        document.getElementById("loader").style.display = "block";
        console.log('Показан лоадер');
        const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=20");
        console.log('загрузка выполнена');
        if (!res.ok) {
            throw new Error("Ошибка загрузки. Повторите позже");
        }
        const data = await res.json();
        console.log('Данные получены', data);
        if (data) {
            displayImage(data.message)
        }
    } catch (e) {
        console.error(e.message);
        errorMessage.textContent = e.message;
        errorMessage.style.display = "none";
    } finally {
        document.getElementById("loader").style.display = "none";
    }

    let response = await fetch(url);
    let content = await response.json();
    let key;
    for (key in content) {
        list.innerHTML += `
    <li>
      <img src="${content[key].url}" alt="images" class="img" width="100"> 
        </li> 
    `
    }
}
button.addEventListener("click", () => {
    getImages(url);
    console.log("Сработала кнопка");
})
