# Dog Poop Dodge

GitHub, Vercel, Firebase Realtime Database용 정적 웹게임입니다.

## GitHub에 올릴 파일

저장소 최상단에 아래 파일이 바로 보여야 합니다.

```text
index.html
src/
database.rules.json
vercel.json
package.json
README.md
```

## Vercel 배포

1. GitHub에 이 파일들을 올립니다.
2. Vercel에서 `Add New Project`를 누릅니다.
3. GitHub 저장소를 선택합니다.
4. Framework Preset은 `Other`로 둡니다.
5. Build Command는 비워둡니다.
6. Output Directory는 `.` 입니다.
7. Deploy를 누릅니다.

## Firebase Realtime Database 규칙

Firebase Console의 Realtime Database > 규칙에 `database.rules.json` 내용을 붙여넣고 게시하세요.

프로젝트 주소:

```text
https://console.firebase.google.com/project/mato33/database/mato33-default-rtdb/rules?hl=ko
```

게임은 Realtime Database REST API로 아래 주소에 점수를 저장합니다.

```text
https://mato33-default-rtdb.firebaseio.com/scores.json
```
