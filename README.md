# 모바일 청첩장 💐

GitHub Pages로 호스팅하는 단일 파일(`index.html`) 모바일 청첩장.

**구성**: 표지 · 인사말 · 달력/D-day · 갤러리 · 오시는 길(카카오맵) · 계좌 복사 · RSVP · 방명록 · 카톡 공유

## 1. 배포 (GitHub Pages)

Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)` → Save

몇 분 뒤 `https://kimdaiyeon-git.github.io/wedding/` 에서 확인.

## 2. 내용 수정

전부 `index.html` 안에 있습니다.

| 항목 | 위치 |
|---|---|
| 이름·날짜·장소·인사말 | HTML 본문 (김OO, 이OO, OO웨딩홀 등 검색해서 교체) |
| 예식 일시 (달력·D-day 자동 계산) | `CONFIG.weddingDate` |
| 계좌번호 | "마음 전하실 곳" 섹션의 `data-copy` 속성과 표시 텍스트 |
| 사진 | `picsum.photos` URL을 실제 사진으로 교체 — 레포에 `photos/` 폴더 만들어 올리고 상대경로 사용 |
| 공유 썸네일 | `<meta property="og:image">` + `CONFIG.shareImage` |

## 3. 카카오 키 (지도 + 카톡 공유)

1. [developers.kakao.com](https://developers.kakao.com) → 앱 생성 → **JavaScript 키** 복사
2. 앱 설정 → 플랫폼 → Web → 사이트 도메인에 `https://kimdaiyeon-git.github.io` 등록
3. `CONFIG.kakaoJsKey`에 키 입력, `CONFIG.venueLat/Lng`에 예식장 좌표 입력
   (좌표는 카카오맵에서 장소 검색 → 공유 → URL의 좌표 참고)

키를 넣지 않아도 나머지 기능은 정상 동작합니다.

## 4. RSVP · 방명록 (Google Sheets + Apps Script)

`apps-script.gs` 상단 주석의 4단계 그대로:

1. Google Sheets 생성 → `rsvp`, `guestbook` 시트 2개
2. 확장 프로그램 → Apps Script → `apps-script.gs` 내용 붙여넣기
3. 배포 → 웹 앱 (실행: 나 / 액세스: 모든 사용자)
4. `/exec` URL을 `CONFIG.appsScriptUrl`에 입력

URL을 비워두면 해당 기능은 안내 문구만 표시됩니다.

## ⚠️ 주의

- public 저장소이므로 **실제 계좌번호·개인정보를 넣은 뒤에는 노출을 감수**해야 합니다. 신경 쓰이면 GitHub Pro의 private 저장소 + Pages 조합을 고려하세요.
- Apps Script URL은 공개돼도 시트 내용은 읽기 API로 정의한 방명록만 노출됩니다 (RSVP는 조회 불가).
