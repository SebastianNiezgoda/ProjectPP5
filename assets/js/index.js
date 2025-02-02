const apartmentList = [];

function showForm() {
  document.getElementById("client-form").style.display = "block";
  document.getElementById("apartment-list1").style.display = "none";
  document.getElementById("city").value = "Kraków";
  document.getElementById("city").setAttribute("readonly", true);
}

function showList() {
  const listContainer = document.getElementById("apartment-list");
  listContainer.innerHTML = "";

  if (apartmentList.length === 0) {
    listContainer.innerHTML = "<li class='list-group-item'>Brak mieszkań na liście.</li>";
  } else {
    apartmentList.forEach((apartment, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `
        <div class="summary" onmouseover="toggleDetails(this, true)" onmouseout="toggleDetails(this, false)">
          ${index + 1}. ${apartment.street}, mieszkanie nr ${apartment.flatNumber}
          <button class="btn btn-sm btn-warning" onclick="editApartment(${index})">Edytuj</button>
          <button class="btn btn-sm btn-danger" onclick="deleteApartment(${index})">Usuń</button>
        </div>
        <div class="details" style="display: none;">
          <p>Miasto: ${apartment.city}</p>
          <p>Powierzchnia: ${apartment.surface} m²</p>
          <p>Piętro: ${apartment.floor}</p>
          <p>Dzielnica: ${apartment.district}</p>
          <p>Komentarze: ${apartment.comments}</p>
          <p>Umeblowane: ${apartment.furnished ? "Tak" : "Nie"}</p>
          <p>Kod pocztowy: ${apartment.zipCode}</p>
        </div>
      `;
      listContainer.appendChild(listItem);
    });
  }

  document.getElementById("client-form").style.display = "none";
  document.getElementById("apartment-list1").style.display = "block";
}

function toggleDetails(element, show) {
  const details = element.nextElementSibling;
  details.style.display = show ? "block" : "none";
}

function editApartment(index) {
  const apartment = apartmentList[index];
  document.getElementById("street").value = apartment.street;
  document.getElementById("flatNumber").value = apartment.flatNumber;
  document.getElementById("city").value = "Kraków";
  document.getElementById("surface").value = apartment.surface;
  document.getElementById("floor").value = apartment.floor;
  document.getElementById("district").value = apartment.district;
  document.getElementById("comments").value = apartment.comments;
  document.getElementById("furnished").checked = apartment.furnished;
  document.getElementById("zipcode").value = apartment.zipCode;

  apartmentList.splice(index, 1); // Usunięcie przed ponownym zapisaniem
  showForm();
}

function deleteApartment(index) {
  apartmentList.splice(index, 1);
  showList();
}

async function save(event) {
  event.preventDefault();
  let newApartment = {
    street: document.getElementById("street").value,
    flatNumber: document.getElementById("flatNumber").value,
    city: "Kraków",
    surface: document.getElementById("surface").value,
    floor: document.getElementById("floor").value,
    district: document.getElementById("district").value,
    comments: document.getElementById("comments").value,
    furnished: document.getElementById("furnished").checked,
    zipCode: document.getElementById("zipcode").value
  };

  try {
    const { latitude, longitude } = await getCoordinates(newApartment.street);
    newApartment.latitude = latitude;
    newApartment.longitude = longitude;
  } catch (error) {
    console.error("Błąd pobierania koordynatów:", error);
  }

  apartmentList.push(newApartment);
  showList();
}