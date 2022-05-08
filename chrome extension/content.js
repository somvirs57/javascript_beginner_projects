const srk_images = [
  'https://images.indianexpress.com/2020/06/Shah-Rukh-Khan-759-2.jpg',
  'https://inc42.com/wp-content/uploads/2022/03/Feature-SRK-680x510.png',
  'https://www.telugu360.com/wp-content/uploads/2019/04/Bollywood-Badshah-Shah-Rukh-Khan-set-for-South-debut-1200x800.jpg',
  'https://thebusinessofesports.com/wp-content/uploads/2022/02/nationalherald_2021-10_9836f56e-59fa-4022-bfa6-7257513886ee_Stop_taking_sanskari_swipes_at_Shah_Rukh_Khan.jpg',
  'https://static.theprint.in/wp-content/uploads/2021/11/SRK-DDLJ.jpeg',
  'https://images.news18.com/ibnlive/uploads/2021/11/shah-rukh-khan-2-1-16358380694x3.jpg',
  'http://www.womansera.com/wp-content/uploads/2021/06/shah-rukh-khan-latest-wallpaper-1498380624-e1623476149339.jpg',
];

const siteImages = document.getElementsByTagName('img');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);

  if (request.task === 'iamsrk') {
    for (let i = 0; i < siteImages.length; i++) {
      const randImg = Math.floor(Math.random() * srk_images.length);
      siteImages[i].src = srk_images[randImg];
    }
  }

  const response = { status: 'done' };
  sendResponse(response);
});
