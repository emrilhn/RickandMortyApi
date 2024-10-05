// API'den karakterleri çekme fonksiyonu
const fetchCharacters = async (page) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    console.log(data);
    displayCharacters(data.results);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Karakterleri ekleyecegimiz fonksiyon
const displayCharacters = (characters) => {
  const characterGrid = document.getElementById('characters');
  characterGrid.innerHTML = ''; // Önceki karakterleri temizle
  characters.forEach((character) => {
    characterGrid.innerHTML += createCharacterCard(character);
  });
};

// Karakter kartı oluşturma fonksiyonu
const createCharacterCard = (character) => {
  const genderTranslation = character.gender === "Male" ? "Erkek" : character.gender === "Female" ? "Kadın" : "Belirsiz";
  const originTranslation = character.origin.name === "Earth" ? "Dünya" : character.origin.name
  const statusTranslation = character.status === "Alive" ? "Canlı" : character.status === "Dead" ? "Ölü" : "canlı veya ölü bilgisi yok";

  return `
    <div style=" border: 1px solid #000; margin: 10px; padding: 10px; display: inline-block; width: 300px; text-align: center; height: auto; background-color: white; ">
      <img src="${character.image}" alt="${character.name}" style="width: 100%; height: auto;">
      <h5 style="margin: 5px 0;">${character.name}</h5>
      <p style="margin: 5px 0;">Cinsiyet: ${genderTranslation}</p>
      <p style="margin: 5px 0;">Köken: ${originTranslation}</p>
      <p style="margin: 5px 0;">Durum: ${statusTranslation}</p>
    </div>
  `;
};

// Sayfa yüklendiğinde ilk olarak 1. sayfa karakterlerini listeledik
document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters(1);  

  // Butona tıklanınca sayfa numarası girmeyi sağlayan prompt 
  const pagePromptButton = document.getElementById('prompt-button');
  pagePromptButton.addEventListener('click', () => {
    const userInput = prompt("1-42 arasında bir sayfa numarası giriniz:");

   
    if (userInput && !isNaN(userInput) && userInput >= 1 && userInput <= 42) {
      fetchCharacters(userInput); 
    } else {
      alert("Geçersiz bir giriş yaptınız. Lütfen 1-42 arasında bir sayı giriniz.");
    }
  });
});
