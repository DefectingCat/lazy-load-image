// 在图片前创建一些内容
let content = [
  '🍏',
  '🍎',
  '🍐',
  '🍊',
  '🍋',
  '🍌',
  '🍉',
  '🍇',
  '🍓',
  '🍈',
  '🍒',
  '🍑',
  '🥭',
  '🍍',
  '🥥',
  '🥝',
  '🍅',
  '🍆',
  '🥑',
  '🥦',
  '🥬',
  '🥒',
  '🌽',
  '🥕',
  '🧄',
  '🧅',
  '🥔',
  '🍠',
  '🥐',
  '🥯',
  '🍞',
  '🥖',
  '🥨',
  '🧀',
  '🥚',
  '🍳',
  '🧈',
  '🥞',
  '🧇',
  '🥓',
  '🥩',
  '🍗',
  '🍖',
  '🦴',
  '🌭',
  '🍔',
  '🍟',
  '🍕',
  '🥪',
  '🥙',
  '🧆',
  '🌮',
  '🌯',
  '🥗',
  '🥘',
  '🥫',
  '🍝',
  '🍜',
  '🍲',
  '🍛',
];
function createLi() {
  let frag = document.createDocumentFragment();
  let ul = document.createElement('ul');
  for (let i of content) {
    let li = document.createElement('li');
    li.textContent = i;
    ul.append(li);
  }
  frag.append(ul);
  return frag;
}
let ul = createLi();
document.body.append(ul);

// /////////////内容会抖动///////////////// //
// 创建图片
function createImg() {
  let frag = document.createDocumentFragment();
  let num = 28;
  for (let i = 0; i < 9; i++) {
    let img = document.createElement('img');
    // placeholder 地址
    img.src = './img/placeholder.gif';
    // 图片真实地址
    img.setAttribute('data-src', `./img/file_49639${num}.webp`);
    num++;
    frag.append(img);
  }
  frag.append(document.createElement('hr'));
  return frag;
}
let images = createImg();
document.body.append(images);

// /////////////根据图片设置尺寸，防止内容抖动///////////////// //
// 请求携带尺寸的图片
let requestImg = [
  {
    src: './img/file_4963928.webp',
    ph: './img/placeholder/file_4963928.webp',
    w: 450,
    h: 512,
  },
  {
    src: './img/file_4963929.webp',
    ph: './img/placeholder/file_4963929.webp',
    w: 432,
    h: 512,
  },
  {
    src: './img/file_4963930.webp',
    ph: './img/placeholder/file_4963930.webp',
    w: 512,
    h: 478,
  },
  {
    src: './img/file_4963931.webp',
    ph: './img/placeholder/file_4963931.webp',
    w: 323,
    h: 512,
  },
  {
    src: './img/file_4963932.webp',
    ph: './img/placeholder/file_4963932.webp',
    w: 512,
    h: 480,
  },
  {
    src: './img/file_4963933.webp',
    ph: './img/placeholder/file_4963933.webp',
    w: 353,
    h: 512,
  },
  {
    src: './img/file_4963934.webp',
    ph: './img/placeholder/file_4963934.webp',
    w: 346,
    h: 512,
  },
  {
    src: './img/file_4963935.webp',
    ph: './img/placeholder/file_4963935.webp',
    w: 394,
    h: 512,
  },
  {
    src: './img/file_4963936.webp',
    ph: './img/placeholder/file_4963936.webp',
    w: 272,
    h: 512,
  },
];
// 创建图片
function createImg2() {
  let frag = document.createDocumentFragment();
  for (let i of requestImg) {
    let img = document.createElement('img');
    // placeholder 地址
    img.src = `${i.ph}`;
    // 图片真实地址
    img.setAttribute('data-src', `${i.src}`);
    // 根据请求的图片尺寸动态设置尺寸
    img.style.width = `${i.w}px`;
    img.style.height = `${i.h}px`;
    frag.append(img);
  }
  frag.append(document.createElement('hr'));
  return frag;
}
let images2 = createImg2();
document.body.append(images2);

// /////////////懒加载的实现///////////////// //

// /////////////懒加载的实现///////////////// //
// 选中所有懒加载的图片
let allImg = document.querySelectorAll('img[data-src]');
// 接受一个 img 元素作为参数
function loadImg(img) {
  img.src = `${img.getAttribute('data-src')}`;
  // 加载完成后移除 data-src 属性
  img.addEventListener('load', loadHandler);
  function loadHandler() {
    img.removeAttribute('data-src');
    // 执行一次后移除 load 监听器
    img.removeEventListener('load', loadHandler);
  }
}
// // forEach 遍历，加载每个图片
// allImg.forEach((val) => {
//   loadImg(val);
// });
// 创建一个 observer 对象，接受一个回调
let observer = new IntersectionObserver((entries, observer) => {
  // IntersectionObserverEntry 参数
  // console.log(entries);
  // entries 就是 IntersectionObserverEntry 的集合。
  entries.forEach((entry) => {
    // 当 IntersectionObserverEntry 的 isIntersecting 为 true 时，则图片出现
    if (entry.isIntersecting) {
      // 使用加载函数 加载目标，entry.target 就是目标图片
      loadImg(entry.target);
      // 加载完成后取消监听图片
      observer.unobserve(entry.target);
    }
  });
});
// 为所有图片监听
allImg.forEach((val) => {
  observer.observe(val);
});
