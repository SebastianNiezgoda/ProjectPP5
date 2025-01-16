const apartmentList = [];



  function showForm(){
    document.getElementById("client-form").style.display = "block";
    document.getElementById("apartment-list1").style.display = "none";
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
            listItem.innerText = `${index + 1}. ${apartment.street}, mieszkanie nr ${apartment.flatNumber}, ${apartment.city}, powierzchnia mieszkania: ${apartment.surface} m²`;
            listContainer.appendChild(listItem);
        });
    }

    document.getElementById("client-form").style.display = "none";
    document.getElementById("apartment-list1").style.display = "block";
}
  
  async function save(event) {
    event.preventDefault();
    let newApartment = new Apartment();
    newApartment.street = document.getElementById("street").value;
    newApartment.flatNumber = document.getElementById("flatNumber").value;
    newApartment.city = document.getElementById("city").value;
    newApartment.surface = document.getElementById("surface").value;
    newApartment.floor = document.getElementById("floor").value;
    newApartment.disctrict = document.getElementById("district").value;
    newApartment.comments = document.getElementById("comments").value;
    newApartment.furnished = document.getElementById("furnished").value;
    newApartment.zipCode = document.getElementById("zipcode").value;

    try {
      const { latitude, longitude, city } = await getCoordinates(newApartment.street);
      newApartment.latitude = latitude;
      newApartment.longitude = longitude;
      newApartment.city = city; // Nadpisanie, jeśli potrzebne
    } catch (error) {
      console.error("Błąd pobierania koordynatów:", error);
    }
    console.log(newApartment)
    let foundApartment = null;
    for (let i = 0; i < apartmentList.length; i++) {
      if(apartmentList[i].street == newApartment.street && apartmentList[i].flatNumber == newApartment.flatNumber){
        foundApartment = apartmentList[i];
        apartmentList[i] = newApartment;
      }
    }
    if(foundApartment == null){
      apartmentList.push(newApartment);
    }
    console.log(apartmentList)
    showList()
  }