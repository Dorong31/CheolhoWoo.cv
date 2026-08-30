# 연구 포트폴리오 사이트

YAML 파일만 고치면 되는 정적 CV/포트폴리오. Astro로 **빌드 시점에** 렌더하므로
목록 전체가 HTML에 그대로 들어갑니다 (검색엔진·링크 미리보기·인쇄 모두 정상 동작).

- 한국어 `/` · 영어 `/en/` 두 페이지, 데이터는 하나
- 논문·발표·과제는 "대표 항목만 / 전체 보기" 토글 (JS 없으면 전체 노출 → 색인에 유리)
- 인쇄 스타일 내장 → 브라우저 `Ctrl+P` → **PDF로 저장** 하면 CV PDF가 나옵니다
- OG 이미지 자동 생성 스크립트 포함

---

## 1. 처음 한 번

```bash
npm install
npm run dev        # http://localhost:4321
```

## 2. 배포 전 반드시 고칠 3곳

| 파일 | 고칠 것 |
|---|---|
| `astro.config.mjs` | `site`, `base` — 파일 상단 주석의 A/B/C 중 택1 |
| `src/data/profile.yml` | 이름·소속·이메일·ORCID·Scholar·GitHub |
| `public/files/og.png` | `python3 scripts/make-og.py` 로 재생성 |

**레포 이름에 따른 설정** (현재는 A로 맞춰져 있습니다)

| 레포 이름 | 주소 | `base` |
|---|---|---|
| `cheolho.woo` | `https://dorong.github.io/cheolho.woo/` | `'/cheolho.woo'` |
| `dorong.github.io` | `https://dorong.github.io/` | `'/'` |
| 커스텀 도메인 | `https://example.com/` | `'/'` + `public/CNAME`

## 3. GitHub Pages 배포

```bash
# 압축을 푼 폴더에서
git init
git branch -M main
git add .
git commit -m "init: research portfolio"
git remote add origin https://github.com/dorong/cheolho.woo.git
git push -u origin main
```

푸시한 뒤 GitHub → **Settings → Pages → Source** 를 **GitHub Actions** 로 바꾸면
`.github/workflows/deploy.yml` 이 돌면서 배포됩니다. 이후에는 `main` 에 푸시할 때마다 자동 갱신.

첫 배포는 2~3분 걸리고, 진행 상황은 레포의 **Actions** 탭에서 볼 수 있습니다.

## 4. 내용 갱신

`src/data/*.yml` 만 고치고 커밋하면 됩니다. HTML은 건드릴 일이 없습니다.

| 파일 | 내용 | 메모 |
|---|---|---|
| `profile.yml` | 이름·소속·한 줄 소개·링크 | |
| `interests.yml` | 연구 관심사 | 연구분야 4 + 도구 1 구성 |
| `education.yml` | 학력 | |
| `work.yml` | 대표 결과물 | **가장 먼저 읽히는 섹션.** 3~4개만 |
| `projects.yml` | 참여 연구과제 | 학생 CV의 핵심. `role` 은 실제 직위로 |
| `pubs.yml` | 논문 | `status: published / in-review / in-prep` 필수 |
| `talks.yml` | 학회 발표 | `kind: oral/poster`, `scope: intl/domestic` |
| `skills.yml` | 분석 도구 | 도구마다 "어디에 썼는지" 한 줄 |
| `experience.yml` | 실무 경력(대학원 입학 전) | 아래 주의사항 참조 |
| `programs.yml` | 연구지원사업(인력양성·펠로십) | |
| `writing.yml` | 기고·분석 글 | |

**공통 규칙**

- `{ko: ..., en: ...}` 형태는 언어별 표기. `en` 을 비우면 한국어가 대신 나옵니다.
- `featured: true` 인 항목만 기본 노출됩니다. 하나도 없으면 전체가 대표 항목이 됩니다.
- `authors` 의 `**본인이름**` 은 굵게 표시됩니다.
- 값 안에 `콜론+공백`이 들어가면 따옴표로 감싸세요. → `role: "참여연구원 (담당: 홍수 부문)"`

## 5. 실무 경력 — 게시 전 확인

`experience.yml` 상단에도 같은 내용이 주석으로 들어 있습니다.

1. 용역계약서의 **비밀유지 조항** — 발주처명·과업명·데이터 공개 가능 여부
2. **이미 공개된 정보만** 기재: 나라장터 공고 / 발간등록번호 있는 보고서 / 공개 발표자료
3. 실적 귀속은 기관에 있음 → "수행"이 아니라 **"참여연구원(담당: ○○)"**
4. 게시 전 지도교수와 상의

고객사명·프로젝트명은 비밀유지 대상인 경우가 많습니다. 업무 유형 수준으로만 적는 편이 안전합니다.
항목을 전부 지우면 해당 섹션 자체가 사라지고, 뒤 섹션 번호가 하나씩 당겨집니다.

## 6. CV PDF

브라우저 인쇄가 기본 경로입니다. 색인·토글 버튼은 인쇄에서 자동으로 빠지고,
"전체 보기" 상태와 무관하게 **모든 항목**이 인쇄됩니다.

`Ctrl+P` → 대상: PDF로 저장 → 배경 그래픽 켜기 → 저장 → `public/files/cv.pdf` 로 커밋

> 서식을 더 통제하고 싶으면 나중에 Typst 템플릿을 붙여 같은 YAML에서
> 웹·PDF를 동시에 뽑는 방식으로 올릴 수 있습니다. 지금은 의존성 없이 굴러가는 쪽을 택했습니다.

## 7. 나중에 붙일 만한 것

- **Pagefind** — 정적 전문검색. `npm i -D pagefind` 후 빌드 뒤 `dist` 색인
- **MapLibre + PMTiles** — 연구지역·특강 지도. 정적 호스팅만으로 벡터타일 서빙 가능
- **giscus** — GitHub Discussions 기반 댓글
- **RSS + 블로그** — `src/pages/notes/` 에 MDX 추가
- **링크 점검** — `.github/workflows/linkcheck.yml` 이 매월 1일 실행됩니다

## 디자인 메모

- 색: 수문·식생 계열 순차 색계 5단(`--r1`~`--r5`) 하나로 통일. 강조색을 늘리지 않았습니다.
- 좌측 `목차` 패널은 지도 범례를 본뜬 것으로, 번호·제목 옆 숫자는 **실제 항목 수**입니다.
  실적이 늘면 목차가 같이 자랍니다. 섹션 번호는 `nav` 배열 순서대로 자동 부여됩니다.
- 글꼴: 본문 Pretendard, 데이터·라벨 IBM Plex Mono.
- 토큰은 전부 `src/styles/global.css` 최상단 `:root` 에 있습니다.

---

## 부록 — 어디를 고치면 무엇이 바뀌는가

`src/data/` 안의 YAML만 고칩니다. `.astro` / `.css` 는 손댈 일이 없습니다.

### 학력 및 경력 — `src/data/education.yml`

```yaml
- year: "2024–"          # 좌측 연도 칸. 문자열이므로 따옴표 유지
  degree:                # 굵은 제목 줄
    ko: 석·박사통합과정 (재학)
    en: Integrated MS–PhD (in progress)
  org:                   # 기관 줄
    ko: 고려대학교 환경생태공학과
    en: Korea University, ...
  note:                  # 회색 보조 줄. 필요 없으면 note 블록 3줄 삭제
    ko: 지도교수 ○○○ · 졸업예정 2029.02
```

항목 추가는 `- year:` 부터 통째로 복사해 붙이면 됩니다. **최신이 위로** 가도록 직접 정렬하세요(자동 정렬 안 함).

### 학회 발표 — `src/data/talks.yml`

```yaml
- year: "2026.06"
  title: { ko: 발표 제목, en: Title }
  venue: { ko: 학회·대회명, en: Conference }
  place: { ko: 서울, en: Seoul }   # 선택. 비우면 학회명만 표시
  # year 에 월을 붙일 때는 반드시 따옴표. year: 2025.10 은 숫자 2025.1 로 깨집니다.
  kind: oral             # oral | poster        → 태그로 표시
  scope: domestic        # domestic | intl      → 태그로 표시
  featured: true         # 기본 노출 여부. 빼면 "전체 보기"에서만 보임
```

### 논문 실적 — `src/data/pubs.yml`

```yaml
- year: 2026
  authors: "**우철호**, ○○○"   # **본인 이름** 이 굵게 처리됨. 따옴표 필수
  title: "논문 제목"           # {ko: ..., en: ...} 로 주면 영문 페이지에 영문 제목이 나옵니다
  venue: "학술지명, 17(3), 483–492"
  type: SCI                    # SCI | SCIE | SSCI | KCI | preprint | chapter
  status: accepted             # published | accepted | in-review | in-prep
  doi: "10.xxxx/xxxxx"         # 있으면 제목이 doi.org 링크가 됩니다. 없으면 줄 삭제
  featured: true
```

`status` 는 초기 연구자에게 특히 중요합니다. 심사 중·작성 중 항목을 감추지 말고 상태를 명시하는 편이 신뢰를 줍니다.

### 활용 도구 — `src/data/skills.yml`

2단 구조입니다. `group`(분류) 아래 `items`(도구).

```yaml
- group: { ko: 공간분석, en: Geospatial }
  items:
    - name: QGIS / GDAL       # 왼쪽 굵은 칸. 언어 구분 없음
      use:                    # 선택. 생략하면 도구명만 한 줄로 표시됩니다
        ko: 어디에 썼는지 한 줄
        en: What you used it for
```

그룹을 쓴 순서가 화면 순서입니다.

분류를 통째로 추가·삭제해도 되고, 좌측 색인의 `TLS` 숫자는 전체 도구 개수로 자동 갱신됩니다.

### 그 밖에

| 바꾸고 싶은 것 | 파일 / 위치 |
|---|---|
| 이름·직위·소속·연구실·이메일 | `profile.yml` |
| 한 줄 소개 되살리기 | `profile.yml` 의 `tagline` 에 문장 입력 |
| ORCID·Scholar·GitHub 버튼 되살리기 | `profile.yml` 의 `links:` 주석 해제 |
| 연구 관심사 | `interests.yml` — 항목 수만큼 색 농도가 자동 배분됨 |
| 논문 상태 배지 | `pubs.yml` 의 `status` — 게재 / 게재 확정 / 심사 중 / 작성 중 |
| 대표 결과물 | `work.yml` — `links` 를 넣으면 저장소 버튼, `status: private` 이면 "비공개" 배지 |
| 참여 연구과제 | `projects.yml` — `kind: rnd` → R&D 딱지, `kind: service` → 용역 딱지 |
| 실무 경력 | `experience.yml` — 항목 전부 삭제 시 섹션 자체가 사라짐 |
| 연구지원사업·기고 | `programs.yml`, `writing.yml` |
| 섹션 순서·번호(01, 02…) | `src/components/Cv.astro` 의 `nav` 배열 순서. 번호는 자동 부여 |
| 색·글꼴 | `src/styles/global.css` 최상단 `:root` |
| 최종 갱신 표기 | `profile.yml` 의 `updated` |

**주의 하나**: YAML 값 안에 `콜론+공백`이 들어가면 반드시 따옴표로 감싸세요.
`role: 참여연구원 (담당: 홍수)` → 빌드 실패. `role: "참여연구원 (담당: 홍수)"` → 정상.
