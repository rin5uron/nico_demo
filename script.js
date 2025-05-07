// ハンバーガーメニュー動作
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});



// スライダー動作
document.addEventListener('DOMContentLoaded', function() {
  // スライダー初期化
  const swiper = new Swiper('.mySwiper', {
    // 基本設定
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    speed: 500, // トランジション速度
    observer: true, // DOMの変更を監視
    observeParents: true, // 親要素の変更も監視
    
    // ページネーション
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    
    // ナビゲーション
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    
    // レスポンシブ設定
    breakpoints: {
      // スマホ表示は1枚ずつ
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false // ✅ スマホ時は中央寄せを解除！
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true // ✅ デスクトップ時は中央寄せを有効化！
      }
    }
  });
  
  // スライド切り替え時の処理（デバッグ用）
  swiper.on('slideChange', function() {
    console.log('現在のスライドインデックス:', swiper.realIndex);
  });
});
