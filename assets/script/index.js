window.onload = function() {
    // Check if cookies are enabled and if any cookies are stored
    if (navigator.cookieEnabled && !getCookie('preferences')) {
      setTimeout(function() {
        document.getElementById('cookieModal').style.display = 'block';
      }, 1000); // Show after a small delay
      
    } else {
      // If preferences cookie is present, log its value
      var preferences = getCookie('preferences');
      //alert(preferences);
      if (preferences) {
        preferences = JSON.parse(preferences);
        console.log('Cookie settings:', formatPreferences(preferences));
      }
    }
  };
  
  function setCookie(name, value, seconds, sameSite = 'Lax') {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    var sameSiteValue = sameSite ? "; SameSite=" + sameSite : "";
    
    document.cookie = name + "=" + (value || "")  + expires + sameSiteValue + "; path=/";
}
 

function setAllCookies() {
    var browserName = getBrowserName();
    var osName = getOSName();
    var preferences = {
      browser: browserName,
      operatingSystem: osName,
      screenWidth: screen.width,
      screenHeight: screen.height
    };
    setCookie('preferences', JSON.stringify(preferences), 15);
    console.log('Saved cookie settings:', formatPreferences(preferences));
}

 
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  
  // Event listeners for buttons
  document.getElementById('acceptAll').onclick = function() {
    setAllCookies();
    document.getElementById('cookieModal').style.display = 'none';
  };
  
  document.getElementById('settings').onclick = function() {
    document.getElementById('cookieModal').style.display = 'none';
    document.getElementById('settingsModal').style.display = 'block';
  };
  
  document.getElementById('savePreferences').onclick = function() {
    var browserName = getBrowserName();
    var osName = getOSName();
    var preferences = {
      browser: document.getElementById('browser').checked ? browserName : null,
      operatingSystem: document.getElementById('operatingSystem').checked ? osName : null,
      screenWidth: document.getElementById('screenWidth').checked ? screen.width : null,
      screenHeight: document.getElementById('screenHeight').checked ? screen.height : null
    };
    setCookie('preferences', JSON.stringify(preferences), 15);
    console.log('Saved cookie settings:', formatPreferences(preferences));
    document.getElementById('settingsModal').style.display = 'none';
  };

  function formatPreferences(preferences) {
    return {
      browser: preferences.browser ? `${preferences.browser}` : "Rejected",
      operatingSystem: preferences.operatingSystem ? `${preferences.operatingSystem}` : "Rejected",
      screenWidth: preferences.screenWidth ? `${preferences.screenWidth}px` : "Rejected",
      screenHeight: preferences.screenHeight ? `${preferences.screenHeight}px` : "Rejected"
    };
  }
  
function getOSName() {
    var platform = navigator.platform;
    var userAgent = navigator.userAgent;
    var osName = "Unknown";

    if (platform.startsWith("Win")) {
        osName = "Windows";
    } else if (platform.startsWith("Mac")) {
        osName = "macOS";
    } else if (platform.startsWith("Linux")) {
        osName = "Linux";
    } else if (/Android/.test(userAgent)) {
        osName = "Android";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        osName = "iOS";
    }
    return osName;
}

  
  function getBrowserName() {
    var userAgent = navigator.userAgent;
    var browserName = "Unknown";

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
    } else if (userAgent.match(/msie|trident/i)) {
        browserName = "Internet Explorer";
    }
    return browserName;
}

  