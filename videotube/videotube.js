(() => {
  const throttle = (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = () => {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

(obj => {
  obj = obj || window;
  obj.animation = (elem, prop, cb) => {
    const count = prop.count;
    let counter = 0;
    if (prop.start) {
      prop.start.forEach(item => {
        elem.style[item[0]] = item[1];
      });
    }

    const allAnimation = [];

    prop.anim.forEach(([style, from, to]) => {
      const max = Math.max(from, to);
      const min = Math.min(from, to);
      const step = (max - min) / count;
      allAnimation.push({ style, from, to, step, reverse: min === to });
    });

    const rafAnimation = () => {
      allAnimation.forEach(item => {
        if (item.reverse) {
          item.from -= item.step;
        } else {
          item.from += item.step;
        }

        elem.style[item.style] = item.from;
      });

      counter++;
      if (counter < count) {
        requestAnimationFrame(rafAnimation);
      } else {
        if (prop.end) {
          prop.end.forEach(item => {
            elem.style[item[0]] = item[1];
          });
        }
        if (cb) cb();
      }
    };
    requestAnimationFrame(rafAnimation);
  };
})();

const init = () => {
  const overlay = document.createElement('div');
  overlay.className = 'videotube-modal-overlay';
  document.body.insertAdjacentElement('beforeend', overlay);

  const video = document.createElement('div');
  video.id = 'videotube-modal-container';

  const sizeBlockList = [
    [3200, 1800],
    [2133.33, 1200],
    [1600, 900],
    [1066.67, 600],
    [711.67, 350],
    [533.33, 300],
    [355, 200],
  ];

  const sizeVideo = () => {
    const sizeBlock =
      sizeBlockList.find(item => item[0] < window.visualViewport.width) ||
      sizeBlockList[sizeBlockList.length - 1];

    const iframe = document.getElementById('videotube-modal');
    iframe.width = sizeBlock[0];
    iframe.height = sizeBlock[1];
    video.style.cssText = `
			width: ${sizeBlock[0]};
			height: ${sizeBlock[1]};
		`;
  };

  const sizeContainer = () => {
    const wh = window.visualViewport.height;
    const ww = window.visualViewport.width;
    const fw = video.style.width;
    const fh = video.style.height;

    video.style.left = (ww - fw) / 2;
    video.style.top = (wh - fh) / 2;
    overlay.style.height = document.documentElement.clientHeight;
  };

  const sizeVideoTubeModal = () => {
    sizeContainer();
    sizeVideo();
  };

  const closeVideoTubeModal = () => {
    animation(
      overlay,
      {
        end: [['display', 'none']],
        anim: [['opacity', 1, 0]],
        count: 20,
      },
      () => {
        overlay.textContent = '';
      },
    );
    window.removeEventListener('optimizedResize', sizeVideoTubeModal);
    document.removeEventListener('keyup', closeContainerEsc);
  };

  const closeContainerEsc = e => {
    if (e.keyCode === 27) {
      closeVideoTubeModal();
    }
  };

  const openVideoTubeModal = e => {
    const target = e.target.closest('.tube');
    if (!target) return;

    const videoTitle = target.getAttribute('videoTitle');
    const directorName = target.getAttribute('directorName');
    const operator = target.getAttribute('operator');

    const href = target.href;
    let idVideo;
    let isYoutube;

    if (href.includes('vimeo')) {
      const vimeoMatch = href.match(/\/video\/(\d+)/);
      const videoId = href.substring(href.lastIndexOf('/') + 1);
      if (vimeoMatch) {
        idVideo = videoId;
        isYoutube: false;
      }
    } else {
      const search = href.includes('youtube');
      idVideo = search
          ? href.match(/(\?|&)v=([^&]+)/)[2]
          : href.match(/(\.be\/)([^&]+)/)[2];
      isYoutube = true;
    }

    if (!idVideo) return;
    const srcVideo = isYoutube ?
        `https://youtube.com/embed/${idVideo}?autoplay=1` :
        `https://player.vimeo.com/video/${idVideo}`;
    e.preventDefault();

    animation(overlay, {
      start: [['display', 'flex']],
      anim: [['opacity', 0, 1]],
      count: 20,
    });

    overlay.insertAdjacentHTML(
      'beforeend',
      `
			<div id="videotube-modal-close">&#10006;</div>
			<div id="videotube-modal-container">
				<iframe src="${srcVideo}" 
					frameborder="0"
					id="videotube-modal" 
					allowfullscreen
					allow="autoplay">
				</iframe>
				<div id="videotube-modal-loading">
                  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
				<h1 class="video-title">${videoTitle}</h1>
				<p class="description-video">Director | ${directorName}</p>
				<p class="description-video">Director of Photography | ${operator}</p>
			</div>
		`,
    );

    sizeVideo();
    sizeContainer();

    window.addEventListener('optimizedResize', sizeVideoTubeModal);
    document.addEventListener('keyup', closeContainerEsc);
  };

  const openPhotoModal = e => {
    const target = e.target.closest('.phot');
    if (!target) return;

    const image1 = target.getAttribute('url1');
    const image2 = target.getAttribute('url2');
    const image3 = target.getAttribute('url3');
    const image4 = target.getAttribute('url4');
    const image5 = target.getAttribute('url5');
    const image6 = target.getAttribute('url6');
    const image7 = target.getAttribute('url7');
    const image8 = target.getAttribute('url8');
    const image9 = target.getAttribute('url9');
    const image10 = target.getAttribute('url10');
    const image11 = target.getAttribute('url11');
    const image12 = target.getAttribute('url12');

    const videoTitle = target.getAttribute('videoTitle');
    const directorName = target.getAttribute('directorName');
    const operator = target.getAttribute('operator');

    e.preventDefault();

    animation(overlay, {
      start: [['display', 'block']],
      anim: [['opacity', 0, 1]],
      count: 20,
    });

    overlay.insertAdjacentHTML(
        'beforeend',
        `
      <div id="videotube-modal-loading"></div>
      <div id="videotube-modal-close">&#10006;</div>
      <div id="videotube-modal-container">
          <div class="show-collage">
            <div class="show-slider">
              <img src="${image1}" alt="col4">
              <img src="${image2}" alt="col4">
              <img src="${image3}" alt="col4">
              <img src="${image4}" alt="col4">
              <img src="${image5}" alt="col4">
              <img src="${image6}" alt="col4">
              <img src="${image7}" alt="col4">
              <img src="${image8}" alt="col4">
              <img src="${image9}" alt="col4">
              <img src="${image10}" alt="col4">
              <img src="${image11}" alt="col4">
              <img src="${image12}" alt="col4">
            </div>
          </div>
          		<h1 class="photo-title">${videoTitle}</h1>
				<p class="description-photo">Director | ${directorName}</p>
				<p class="description-photo">Director of Photography | ${operator}</p>
      </div>
    `,
    );

    sizeContainer();

    document.addEventListener('keyup', closeContainerEsc);
  };

  document.addEventListener('click', openPhotoModal);

  overlay.addEventListener('click', closeVideoTubeModal);
  document.addEventListener('click', openVideoTubeModal);
};

document.addEventListener('DOMContentLoaded', init);
