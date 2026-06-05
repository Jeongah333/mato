# 강아지 똥피하기

화면 위에서 움직이는 강아지가 계속 똥을 떨어뜨리고, 아래의 사람을 마우스나 터치로 움직여 오래 피하는 웹게임입니다.

## 실행

`index.html` 파일을 브라우저로 열면 바로 실행됩니다.

## 배포

Vercel에서는 GitHub 저장소를 연결한 뒤 Framework Preset을 `Other`로 두고 배포하면 됩니다. 빌드 명령과 출력 폴더는 비워도 됩니다.

## Firebase

현재 게임 점수는 브라우저 `localStorage`에 저장됩니다. Firebase를 연결하려면 `src/firebase.example.js`를 참고해서 `src/firebase.js`를 만들고 Firestore에 최고 기록을 저장하도록 확장하면 됩니다.
