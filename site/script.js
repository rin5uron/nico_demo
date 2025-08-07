// ハンバーガーメニュー動作
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// スライダー動作
document.addEventListener('DOMContentLoaded', function() {
  // スライダー1 (Swiperデフォルト設定)
  const swiper1 = new Swiper('.mySwiper1', {
    loop: false, // デフォルトはループなし
    slidesPerView: 1, // デフォルトは1枚表示
    spaceBetween: 0, // デフォルトは間隔なし
    centeredSlides: false, // デフォルトは中央寄せなし
    speed: 500,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  // スライダー2 (異なる設定例: 複数表示、自動再生)
  const swiper2 = new Swiper('.mySwiper2', {
    loop: true,
    slidesPerView: 3, // 3枚表示
    spaceBetween: 15, // 間隔を狭める
    speed: 500,
    autoplay: {
      delay: 4000, // 4秒ごとにスライド
      disableOnInteraction: false
    },
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15
      }
    }
  });

  // スライダー3 (異なる設定例: フェードエフェクト)
  const swiper3 = new Swiper('.mySwiper3', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade', // フェードエフェクト
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
    autoplay: { // 自動再生を追加
      delay: 3000, // 3秒ごとにスライド
      disableOnInteraction: false // ユーザー操作後も自動再生を継続
    },
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  // スライド切り替え時の処理（デバッグ用）
  swiper1.on('slideChange', function() {
    console.log('スライダー1: 現在のスライドインデックス:', swiper1.realIndex);
  });
  swiper2.on('slideChange', function() {
    console.log('スライダー2: 現在のスライドインデックス:', swiper2.realIndex);
  });
  swiper3.on('slideChange', function() {
    console.log('スライダー3: 現在のスライドインデックス:', swiper3.realIndex);
  });
});