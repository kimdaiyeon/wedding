/**
 * 모바일 청첩장 — RSVP · 방명록 백엔드 (Google Apps Script)
 *
 * 설정 방법:
 * 1. Google Sheets 새 문서 생성 → 시트 2개 만들기: "rsvp", "guestbook"
 *    - rsvp 1행:      timestamp | name | side | attend | count
 *    - guestbook 1행: timestamp | name | msg
 * 2. 확장 프로그램 → Apps Script → 이 코드 붙여넣기
 * 3. 배포 → 새 배포 → 웹 앱
 *    - 실행 계정: 나 / 액세스 권한: 모든 사용자
 * 4. 발급된 /exec URL을 index.html의 CONFIG.appsScriptUrl에 입력
 */

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');

  if (data.type === 'rsvp') {
    ss.getSheetByName('rsvp').appendRow([now, data.name, data.side, data.attend, data.count]);
  } else if (data.type === 'guestbook') {
    ss.getSheetByName('guestbook').appendRow([now, data.name, data.msg]);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (e.parameter.type !== 'guestbook') {
    return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('guestbook');
  const rows = sheet.getDataRange().getValues().slice(1); // 헤더 제외
  const list = rows.reverse().slice(0, 50).map(function (r) {
    return { date: String(r[0]), name: String(r[1]), msg: String(r[2]) };
  });
  return ContentService.createTextOutput(JSON.stringify(list))
    .setMimeType(ContentService.MimeType.JSON);
}
