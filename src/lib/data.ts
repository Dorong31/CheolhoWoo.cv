import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const DIR = path.join(process.cwd(), 'src', 'data');

/** src/data/<name>.yml 을 빌드 시점에 읽습니다. (클라이언트 JS 없음 → 검색엔진에 그대로 노출) */
export function load<T = any>(name: string): T {
  const file = path.join(DIR, `${name}.yml`);
  return yaml.load(fs.readFileSync(file, 'utf8')) as T;
}

export type Lang = 'ko' | 'en';

/** {ko, en} 또는 문자열을 언어에 맞게 풀어냅니다. en이 비면 ko로 대체. */
export function t(value: unknown, lang: Lang): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  const v = value as Record<string, string>;
  return v[lang] || v.ko || v.en || '';
}

/** authors 필드의 **본인 이름** 을 <strong> 으로. 그 외 HTML은 이스케이프. */
export function emphasize(raw: string): string {
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="self">$1</strong>');
}

/** featured 가 하나도 없으면 전체를 대표 항목으로 취급합니다. */
export function featuredOf<T extends { featured?: boolean }>(items: T[]): T[] {
  const picked = items.filter((i) => i.featured);
  return picked.length ? picked : items;
}
