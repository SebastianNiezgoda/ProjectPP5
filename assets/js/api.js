
async function getCoordinates(address) {
    const url = 'https://nominatim.openstreetmap.org/search';
    const params = {
        q: address,
        format: 'json',
        addressdetails: 1 // Aby uzyskać szczegółowe informacje o adresie
    };
    const headers = {
        'User-Agent': 'app.js/1.0 (kontakt@example.com)'
    };

    try {
        const response = await axios.get(url, { params, headers, timeout: 10000 });

        if (response.status !== 200) {
            console.error("Error: Received non-200 status code");
            return { latitude: null, longitude: null, city: null };
        }

        const data = response.data;

        if (data && data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);

            // Wyodrębnienie miasta z odpowiedzi
            const addressDetails = data[0].address || {};
            let city = addressDetails.city || addressDetails.town || addressDetails.village;

            if (!city) {
                // Jeśli miasto nie jest dostępne, próbujemy inne pola
                city = addressDetails.county || 'Nieznane';
            }

            return { latitude, longitude, city };
        } else {
            console.error("Nie znaleziono współrzędnych dla podanego adresu.");
            return { latitude: null, longitude: null, city: null };
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return { latitude: null, longitude: null, city: null };
    }
}

/**
 * Sprawdza, czy miasto jest wspierane przez model. Jeśli nie, zwraca 'Warszawa' jako domyślne.
 * 
 * @param {string} city - Nazwa miasta jako string
 * @returns {string} - Nazwa wspieranego miasta
 */
function extractCitySupported(city) {
    const supportedCities = ['Kraków'];
    if (supportedCities.includes(city)) {
        return city;
    } else {
        console.warn(`Miasto '${city}' nie jest wspierane. Domyślnie użyto 'Warszawa'.`);
        return 'Kraków';
    }
}

