# 강아지 똥피하기

화면 위에서 움직이는 강아지가 계속 똥을 떨어뜨리고, 아래의 사람을 마우스나 터치로 움직여 오래 피하는 웹게임입니다.

## 실행

`index.html` 파일을 브라우저로 열면 바로 실행됩니다.

## 배포

Vercel에서는 GitHub 저장소를 연결한 뒤 Framework Preset을 `Other`로 두고 배포하면 됩니다. 빌드 명령과 출력 폴더는 비워도 됩니다.

GitHub 저장소 화면에서 `index.html`을 누르는 것은 게임 실행이 아니라 파일 미리보기입니다.

GitHub Pages로 실행하려면 저장소에 `index.html`, `src` 폴더, `README.md` 등이 저장소 최상단에 있어야 합니다. 그 다음 Settings > Pages에서 Source를 `Deploy from a branch`, Branch를 `main`, Folder를 `/root`로 선택한 뒤 저장하세요. 잠시 후 `https://계정명.github.io/저장소명/` 주소로 접속하면 게임이 열립니다.

만약 GitHub에 `smok` 폴더 자체를 올려서 저장소 안에 `smok/index.html` 형태가 됐다면 주소는 `https://계정명.github.io/저장소명/smok/` 입니다. 가장 쉬운 방법은 `smok` 폴더 안의 파일들을 전부 저장소 최상단으로 올리는 것입니다.

## Firebase

현재 게임 점수는 브라우저 `localStorage`에 저장됩니다. Firebase를 연결하려면 `src/firebase.example.js`를 참고해서 `src/firebase.js`를 만들고 Firestore에 최고 기록을 저장하도록 확장하면 됩니다.

Firebase 프로젝트 ID는 `mato-746f6`로 설정되어 있습니다.

Firestore 규칙은 `firestore.rules`에 있습니다. Firebase Console에서 적용하려면 Firestore Database > 규칙 탭에 들어가 `firestore.rules` 내용을 붙여넣고 게시하면 됩니다.
