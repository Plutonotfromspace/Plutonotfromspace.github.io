// Function to fetch and display weather based on user's location
function displayWeather(latitude, longitude) {
    const apiKey = '78eef14f511e4ca387f210340242503';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data request failed');
            }
            return response.json();
        })
        .then(data => {
            const location = data.location?.name; // Use optional chaining to handle potential undefined properties
            const temperature = data.current?.temp_c; // Use optional chaining to handle potential undefined properties
            const description = data.current?.condition?.text; // Use optional chaining to handle potential undefined properties
            if (location !== undefined && temperature !== undefined && description !== undefined) {
                const weatherString = `Weather in ${location}: ${description}, Temperature: ${temperature}°C`;
                const weatherElement = document.getElementById('current-weather');
                if (weatherElement) {
                    weatherElement.textContent = weatherString;
                }
            } else {
                throw new Error('Weather data format is invalid');
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}

// Function to display current time
function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `Current time: ${timeString}`;
    }
}

// Function to initialize widgets
function initWidgets() {
    // Check if the user has already allowed location access
    const locationAllowed = localStorage.getItem('locationAllowed');
    if (locationAllowed === 'true') {
        // If location access is allowed, proceed to display weather
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            displayWeather(latitude, longitude);
        }, error => {
            console.error('Error getting user location:', error);
        });
    } else {
        // If location access is not allowed or not yet determined, prompt the user
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            displayWeather(latitude, longitude);
        }, error => {
            console.error('Error getting user location:', error);
        });
        // Set up event listener for location permission change
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            permissionStatus.onchange = () => {
                if (permissionStatus.state === 'granted') {
                    localStorage.setItem('locationAllowed', 'true');
                }
            };
        });
    }

    displayTime(); // Display current time initially

    // Set interval to update time every minute (60000 milliseconds)
    setInterval(displayTime, 1000);
}

// Call initWidgets when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initWidgets);
