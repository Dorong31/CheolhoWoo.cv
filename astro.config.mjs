// @ts-check
import { defineConfig } from 'astro/config';

// ─────────────────────────────────────────────────────────────
// 배포 형태에 따라 두 줄만 고치면 됩니다.
//
//  A. 프로젝트 사이트 (레포명: CheolhoWoo.cv)   ← 현재 설정
//     https://dorong31.github.io/CheolhoWoo.cv/
//     site: 'https://dorong31.github.io',      base: '/CheolhoWoo.cv'
//
//  B. 사용자 사이트  (레포명: dorong31.github.io)
//     https://dorong31.github.io/
//     site: 'https://dorong31.github.io',      base: '/'
//
//  C. 커스텀 도메인 (도메인을 따로 구입한 경우)
//     site: 'https://example.com',           base: '/'
//     + public/CNAME 파일에 도메인 한 줄 기입
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://dorong31.github.io',
  base: '/CheolhoWoo.cv',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
