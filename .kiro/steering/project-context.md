---
inclusion: always
---

# Daily UI Generator — Kiro Auto-Build Context

## สิ่งที่ต้องทำทันทีเมื่อเปิด workspace นี้

1. อ่านไฟล์ `scripts/daily-context.json` ในโฟลเดอร์นี้
2. สร้าง UI ใหม่ทั้งหมดตาม theme spec ใน JSON นั้น
3. รัน `pnpm build`
4. ถ้า build สำเร็จ → เขียน `scripts/build-done.flag`

**ไม่ต้องรอคำสั่งจากใคร — ทำอัตโนมัติเลย**

---

## บริบทของ workspace นี้

workspace นี้คือ **daily UI project** ที่ถูกสร้างขึ้นอัตโนมัติทุกวัน
- clone มาจาก `x-template` (ต้นฉบับ)
- ชื่อโฟลเดอร์รูปแบบ `x-template-NNN`
- มี `scripts/daily-context.json` บอก theme ที่ต้องสร้าง

## โครงสร้าง workspace นี้
```
x-template-NNN/          ← workspace นี้
├── src/
│   ├── App.tsx          ← แก้ไขตาม theme
│   ├── App.css          ← แก้ไขตาม theme
│   └── index.css        ← แก้ไขตาม theme
├── scripts/
│   ├── daily-context.json   ← อ่านจากนี้
│   └── build-done.flag      ← เขียนเมื่อ build สำเร็จ
├── package.json         ← อัปเดต version
└── .kiro/
    ├── hooks/
    │   ├── on-context-ready.json
    │   └── on-build-done.json
    └── steering/
        └── project-context.md  ← ไฟล์นี้
```

## หน้าที่ของ Kiro ในระบบนี้

เมื่อ Hook `on-context-ready` trigger (scripts/daily-context.json เปลี่ยน):
1. อ่าน `scripts/daily-context.json`
2. เขียน `src/App.tsx` ใหม่ทั้งหมด
3. เขียน `src/App.css` ใหม่ทั้งหมด
4. เขียน `src/index.css` ใหม่ทั้งหมด
5. อัปเดต version ใน `package.json`
6. รัน `pnpm build`
7. ถ้า build สำเร็จ → เขียน `scripts/build-done.flag`
8. ถ้า build fail → แก้ TypeScript errors แล้ว rebuild

## daily-context.json Schema
```json
{
  "day": 1,
  "date": "YYYY-MM-DD",
  "version": "1.1.0",
  "project_name": "x-template-001",
  "theme": { "name": "...", "style": "...", "mood": "..." },
  "palette": {
    "background": "#hex", "surface": "#hex", "primary": "#hex",
    "accent": "#hex", "text": "#hex", "muted": "#hex"
  },
  "typography": { "heading": "font", "body": "font", "size": "small|medium|large" },
  "layout": { "structure": "centered|asymmetric|grid|split", "density": "...", "border_style": "..." },
  "animation": { "level": "none|minimal|moderate|high", "style": "..." },
  "components": {
    "hero_text": "MAIN HEADING",
    "subtitle": "subtitle text",
    "button_label": "button text",
    "badge_text": "badge text"
  },
  "commit_message": "feat: UI Day N — Theme Name"
}
```

## กฎสำคัญสำหรับ App.tsx

- **คง imports เดิมไว้ทั้งหมด:**
  ```tsx
  import { useState, useEffect, useRef } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from './assets/vite.svg'
  import heroImg from './assets/hero.png'
  import './App.css'
  ```
- คง `CounterNum` component ไว้ (useRef + useEffect animation)
- คง counter button ไว้ (onClick setCount handler)
- คง Documentation section ไว้ (Vite/React links)
- คง Social section ไว้ (GitHub/Discord/X/Bluesky links + SVG icons)
- **ห้ามใช้ CSS custom properties (--var-name) ใน inline style** — TypeScript จะ error

## Stack
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (ติดตั้งแล้ว)
- pnpm

## GitHub
- Owner: `Ex2-Axon`
- Daily repos: `x-template-001`, `x-template-002`, ...
- Live: `https://ex2-axon.github.io/x-template-NNN/`
