// ===1.要素を取得===
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// ===2.関数を構築===
// 動画が停止していたら再生、再生していたら停止する
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// 再生ボタンの表示を変更する
function updateButton() {
const icon = this.paused ? '▶︎' : '❚ ❚';
toggle.textContent = icon;
}


//動画を前後指定した秒数でスキップする
function skip() {
  // console.log(this.dataset.skip);
  // console.log(video.currentTime);
  video.currentTime += parseFloat(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// 音量or再生速度を変更する
function handleRangeUpdate() {
  // console.log(this.name);
  // console.log(this.value);
  video[this.name] = this.value;
}

// 動画の再生率を計算して進捗バーを動かす
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// ===3.イベントリスナーとつなげる===
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// マウスを押しながら動かしている状態ならイベントが起動する
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);