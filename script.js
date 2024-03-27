document.addEventListener("DOMContentLoaded", function() {
  const radioStations = document.getElementsByName("station");
  const stationNameElement = document.getElementById("stationName");
  const nowPlayingElement = document.getElementById("nowPlaying");
  const playerElement = document.getElementById("player");
  let currentPlayer;

  // Function to update the "Now Playing" section
  function updateNowPlaying(stationName) {
    stationNameElement.textContent = stationName;
  }

  // Function to handle player ready event
  function onPlayerReady(event) {
    event.target.playVideo(); // Start playback
  }

  // Function to handle player error event
  function onPlayerError(event) {
    console.error('YouTube player error occurred:', event.data);
  }

  // Function to initialize the YouTube player
  function initializePlayer(station) {
    if (currentPlayer) {
      currentPlayer.destroy();
    }
    currentPlayer = new YT.Player('player', {
      height: '0',
      width: '0',
      videoId: station,
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'disablekb': 1,
        'fs': 0,
        'iv_load_policy': 3,
        'loop': 1,
        'modestbranding': 1,
        'playsinline': 1,
        'rel': 0,
        'enablejsapi': 1,
        'origin': window.location.origin
      },
      events: {
        'onReady': onPlayerReady,
        'onError': onPlayerError
      }
    });
    // Update "Now Playing" section
    updateNowPlaying(stationNameMap[station]);
    // Show "Now Playing" section
    nowPlayingElement.style.display = "block";
  }

  // Event listener for radio station change
  radioStations.forEach(function(radio) {
    radio.addEventListener("change", function() {
      initializePlayer(this.value);
    });
  });

  // Function to play sound effect
  function playSoundEffect() {
    const audio = new Audio('https://www.soundjay.com/communication/sounds/cassette-player-button-1.mp3');
    audio.play();
  }

  // Event listener for radio station change
  radioStations.forEach(function(radio) {
    radio.addEventListener("change", function() {
      initializePlayer(this.value);
      playSoundEffect(); // Call the function to play the sound effect
    });
  });

  // Station name mapping
  const stationNameMap = {
    'jfKfPfyJRdk': 'lofi hip hop radio 📚 - beats to relax/study to',
    '4xDzrJKXOOY': 'synthwave radio 🌌 - beats to chill/game to',
    'rUxyKA_-grg': 'lofi hip hop radio 💤 - beats to sleep/chill to',
    'Z-qo1DCvCT0': 'dark ambient radio 🌃 - music to escape/dream to'
  };

  // Hide "Now Playing" section initially
  nowPlayingElement.style.display = "none";

  // Load YouTube IFrame Player API asynchronously
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Theme select dropdown
  const themeSelect = document.getElementById('themeSelect');
  const mobileThemeSelect = document.getElementById('mobileThemeSelect'); // Get the mobile theme select dropdown

  // Function to apply selected theme
  function applyTheme(theme) {
    // Remove existing theme classes from body
    document.body.classList.remove('dark-theme', 'breeze-theme', 'violet-theme');

    // Remove existing theme stylesheets
    const darkThemeStyle = document.getElementById('dark-theme-style');
    if (darkThemeStyle) {
      darkThemeStyle.remove();
    }
    const breezeThemeStyle = document.getElementById('breeze-theme-style');
    if (breezeThemeStyle) {
      breezeThemeStyle.remove();
    }
    const violetThemeStyle = document.getElementById('violet-theme-style');
    if (violetThemeStyle) {
      violetThemeStyle.remove();
    }

    // Apply selected theme class to body
    if (theme === 'dark') {
      loadDarkTheme();
    } else if (theme === 'breeze.css') {
      loadBreezeTheme();
    } else if (theme === 'violet.css') {
      loadVioletTheme();
    } else {
      // Load the default styles.css
      loadDefaultTheme();
    }
  }

  // Function to load default styles.css theme
  function loadDefaultTheme() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'styles.css'; // Path to your styles.css file
    linkElement.id = 'default-theme-style';
    document.head.appendChild(linkElement);
  }

  // Function to load styles-dark.css theme
  function loadDarkTheme() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'styles-dark.css'; // Path to your styles-dark.css file
    linkElement.id = 'dark-theme-style';
    document.head.appendChild(linkElement);
  }

  // Function to load breeze.css theme
  function loadBreezeTheme() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'breeze.css'; // Path to your breeze.css file
    linkElement.id = 'breeze-theme-style';
    document.head.appendChild(linkElement);
  }

  // Function to load violet.css theme
  function loadVioletTheme() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'violet.css'; // Path to your violet.css file
    linkElement.id = 'violet-theme-style';
    document.head.appendChild(linkElement);
  }

  // Event listener for theme select change
  themeSelect.addEventListener('change', function() {
    const selectedTheme = this.value;
    applyTheme(selectedTheme);
  });

  // Event listener for mobile theme select change
  mobileThemeSelect.addEventListener('change', function() {
    const selectedTheme = this.value;
    applyTheme(selectedTheme);
  });

});

