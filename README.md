# 멍멍! 똥 피하기

강아지가 떨어뜨리는 똥을 피해 오래 살아남는 모바일 대응 웹게임입니다.

## 배포

이 폴더의 파일을 GitHub 저장소에 모두 올린 뒤 Vercel에서 저장소를 Import하면 바로 배포됩니다. 빌드 설정은 필요하지 않습니다.

## Firebase 온라인 랭킹 연결

1. Firebase에서 Realtime Database를 생성합니다.
2. `database.rules.json` 내용을 Realtime Database의 규칙에 적용합니다.
3. `firebase-config.js`에는 이전에 만든 `ps11-be76a` Firebase 프로젝트가 이미 연결되어 있습니다.

Firebase 규칙 적용 전에는 브라우저 로컬 랭킹으로 동작합니다.
