'use strict';

// Check if enabled
chrome.storage.sync.get('enabled', function (data) {
  if (data.enabled) login();
});

// Deobfuscate stored credentials
const deobfuscate = function (input) {
  let i = Math.floor((input.length - 1) / 1.23);
  if (input.length % 2 == 1) {
    return atob(input.slice(0, i) + input.slice(i + 1));
  } else {
    return atob(input.slice(0, input.length - i) + input.slice(input.length - i + 1));
  }
}

// Fill form and click login button
const login = function () {
  chrome.storage.sync.get(['user', 'password'], function (result) {
    try {
      document.getElementsByName('name')[0].value = deobfuscate(result.user);
      document.getElementsByName('pw')[0].value = deobfuscate(result.password);
      [...document.getElementsByTagName('input')].forEach((i) => {
        if (i.type == 'submit' && i.value == 'OK') i.click();
      });
    } catch {
      console.log('Tiss Auto Login: Something went wrong while trying to log you in.')
    }
  });
}