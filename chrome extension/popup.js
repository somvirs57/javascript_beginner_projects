console.log('testing');

const btn = document.getElementById('clickBtn');

btn.addEventListener('click', () => {
  let queryOptions = { active: true, currentWindow: true };
  tabs = chrome.tabs.query(queryOptions, tabs => {
    console.log(tabs[0].id);
    chrome.tabs.sendMessage(
      tabs[0].id,
      { task: 'iamsrk' },
      function (response) {
        console.log(response.status);
      }
    );
  });
});
