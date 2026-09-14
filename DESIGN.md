# The Family Market — Design System

> Tài liệu này được trích xuất từ mã nguồn thực tế của dự án (`globals.css`, `layout.tsx`, `tailwind.config`, các component). Đây là nguồn sự thật duy nhất về hệ thống thiết kế của The Family Market.

---

## 1. Brand Identity

| Thuộc tính | Giá trị |
|---|---|
| **Tên thương hiệu** | The Family Market |
| **Slogan** | Mua sắm thông minh |
| **Phong cách tổng thể** | Fresh, Clean, Premium — lấy cảm hứng từ siêu thị hiện đại Đông Nam Á |
| **Màu đặc trưng** | Fresh Green (`oklch(0.627 0.194 142.89)`) |
| **Default Theme** | Light Mode |
| **Theme Switcher** | 3 trạng thái: Sáng / Tối / Hệ thống |

---

## 2. Color Palette

### 2.1 Light Mode (`:root`)

| Token | OKLCH | Mô tả |
|---|---|---|
| `--background` | `oklch(1 0 0)` | Trắng tinh — nền trang |
| `--foreground` | `oklch(0.145 0 0)` | Gần đen — chữ chính |
| `--card` | `oklch(1 0 0)` | Trắng — nền thẻ |
| `--card-foreground` | `oklch(0.145 0 0)` | Chữ trên thẻ |
| `--primary` | `oklch(0.627 0.194 142.89)` | **Fresh Green** — màu chủ đạo |
| `--primary-foreground` | `oklch(0.985 0 0)` | Trắng — chữ trên primary |
| `--secondary` | `oklch(0.988 0.031 105)` | **Light Yellow** — màu phụ |
| `--secondary-foreground` | `oklch(0.627 0.194 142.89)` | Green trên Yellow |
| `--muted` | `oklch(0.97 0 0)` | Xám rất nhạt — nền muted |
| `--muted-foreground` | `oklch(0.556 0 0)` | Xám vừa — chữ phụ |
| `--accent` | `oklch(0.988 0.031 105)` | Yellow Accent |
| `--accent-foreground` | `oklch(0.627 0.194 142.89)` | Green trên Accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Đỏ — lỗi/xóa |
| `--border` | `oklch(0.922 0 0)` | Xám nhạt — viền |
| `--input` | `oklch(0.922 0 0)` | Viền input |
| `--ring` | `oklch(0.627 0.194 142.89)` | Focus ring — Green |

### 2.2 Dark Mode (`.dark`)

| Token | OKLCH | Mô tả |
|---|---|---|
| `--background` | `oklch(0.145 0 0)` | Đen sâu — nền trang |
| `--foreground` | `oklch(0.985 0 0)` | Trắng — chữ chính |
| `--card` | `oklch(0.205 0 0)` | Đen nhạt — nền thẻ |
| `--primary` | `oklch(0.718 0.221 142.89)` | **Bright Green** — sáng hơn |
| `--primary-foreground` | `oklch(0.145 0 0)` | Đen — chữ trên primary |
| `--secondary` | `oklch(0.25 0.05 105)` | **Dark Yellow** — tối hơn |
| `--muted` | `oklch(0.269 0 0)` | Xám tối |
| `--muted-foreground` | `oklch(0.708 0 0)` | Xám sáng |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Đỏ sáng hơn |
| `--border` | `oklch(1 0 0 / 10%)` | Trắng 10% |
| `--input` | `oklch(1 0 0 / 15%)` | Trắng 15% |

---

## 3. Typography

### 3.1 Font Family

| Vai trò | Font | Source |
|---|---|---|
| **Body / Global** | **Prompt** | Google Fonts (`next/font/google`) |
| Subsets | `latin`, `thai`, `vietnamese` | Hỗ trợ đa ngôn ngữ |

### 3.2 Font Weights

| Weight | Giá trị CSS | Dùng khi |
|---|---|---|
| Light | `300` | Caption mờ, text phụ |
| Regular | `400` | Body text thông thường |
| Medium | `500` | Text nhấn nhẹ |
| SemiBold | `600` | Label, tiêu đề nhỏ |
| Bold | `700` | Nút bấm, badge |
| ExtraBold | `800` | Tiêu đề section |
| Black | `900` | Hero heading, tên sản phẩm |

### 3.3 Type Scale

| Class | Size | Dùng khi |
|---|---|---|
| `text-xs` | `12px` | Badge, label nhỏ |
| `text-sm` | `13–14px` | Body nhỏ, caption |
| `text-base` | `16px` | Body chuẩn |
| `text-lg` | `18px` | Subtitle |
| `text-xl` | `20px` | Tiêu đề nhỏ |
| `text-2xl` | `24px` | Tiêu đề section mobile |
| `text-3xl` | `30px` | Page title |
| `text-4xl` | `36px` | Hero title |

---

## 4. Border Radius

| Token | Value | Pattern trong code |
|---|---|---|
| `--radius` | `0.625rem` (10px) | Base |
| `--radius-sm` | `6px` | Components nhỏ |
| `--radius-md` | `8px` | Components vừa |
| `--radius-xl` | `14px` | Cards, Modal |
| Custom `rounded-[16px]` | `16px` | Buttons, Images |
| Custom `rounded-[24px]` | `24px` | Cards, Panels |
| Custom `rounded-[32px]` | `32px` | Dialogs, Auth Modal |
| `rounded-full` | `9999px` | Badges, Pills |

---

## 5. Spacing System (Tailwind 4, base 4px)

| Class | Value | Dùng phổ biến |
|---|---|---|
| `gap-1` | `4px` | Icon spacing |
| `gap-2` | `8px` | Tag/Badge gap |
| `gap-3` | `12px` | Button icon-text gap |
| `gap-4` | `16px` | Card inner spacing |
| `gap-6` | `24px` | Section inner spacing |
| `gap-8` | `32px` | Grid gaps |
| `p-4` | `16px` | Card padding |
| `px-3 py-1.5` | `12px / 6px` | Badge padding |

---

## 6. Shadows & Elevation

| Pattern | CSS | Dùng ở |
|---|---|---|
| Price Banner | `shadow-[0_10px_35px_rgba(239,68,68,0.25)]` | Product price |
| Card base | `shadow-sm` | Thẻ sản phẩm |
| Primary CTA | `shadow-lg shadow-primary/20` | Nút thêm giỏ |
| Modal | `shadow-2xl shadow-primary/20` | Auth modal |
| Bottom Nav | `shadow-[0_-4px_20px_rgba(0,0,0,0.06)]` | Mobile bottom nav |

---

## 7. Glassmorphism

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.dark .glass-panel {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

Pattern trong code: `bg-card/80 backdrop-blur-xl border border-border/50`

---

## 8. Animation & Motion

| Tên | Duration | Easing | Dùng ở |
|---|---|---|---|
| `fade-in-up` | `0.6s` | `ease-out` | Reveal sections |
| `subtle-scale` | `8s` | `ease-in-out alternate` | Hero images hover |
| `animate-marquee` | `30s` | `linear infinite` | Testimonials |
| Theme circle reveal | `500ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Light/Dark switch |
| Hover scale button | `300ms` | `transition-all` | CTA buttons |

---

## 9. Component Patterns

### Buttons
```tsx
// Primary
"h-12 px-4 bg-primary text-primary-foreground font-bold rounded-[16px] shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"

// Secondary / Outline
"h-12 px-4 bg-card/80 backdrop-blur-md border-2 border-primary/20 text-primary font-bold rounded-[16px] hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
```

### Badges
```tsx
// Brand tag
"px-3 py-1.5 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-widest border border-primary/20"

// Info badge (Rating, Sold, Stock)
"flex items-center text-muted-foreground font-medium text-xs bg-muted/30 px-3 py-1.5 rounded-full border border-border/50"

// Discount
"bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white font-extrabold px-3.5 py-1.5 text-xs uppercase tracking-wider"
```

### Input Fields
```tsx
"h-12 rounded-[16px] bg-background/50 border-border/60 focus:bg-background transition-colors px-4 shadow-sm"
```

---

## 10. Layout & Responsive

| Breakpoint | Width | Layout |
|---|---|---|
| default | `< 640px` | Stack, mobile bottom nav |
| `sm` | `≥ 640px` | 2-col grids |
| `md` | `≥ 768px` | Desktop elements hiện |
| `lg` | `≥ 1024px` | Full desktop nav, ẩn mobile nav |
| `xl` | `≥ 1280px` | 4-col grids |

---

## 11. Navigation Architecture

- **Desktop Header**: Logo ← Search → Cart/Account — Category row bên dưới
- **Mobile Bottom Nav** (≤ `lg`): 5 tabs — Auth-required tabs mở modal thay vì navigate
- **Active State**: Line indicator trên đầu tab + primary color background

---

## 12. Toast Notifications

Sử dụng **Sonner** — `<Toaster position="top-center" richColors />`

| Loại | Dùng khi |
|---|---|
| `toast.success()` | Thêm giỏ, đăng nhập thành công |
| `toast.success()` + Action | Thêm giỏ → nút "Xem giỏ hàng" |
| `toast.error()` | Lỗi, vượt tồn kho, tài khoản bị khóa |

---

## 13. Icons

| Nguồn | Dùng ở |
|---|---|
| **Lucide React** | Navigation, UI actions |
| **Tabler Icons** | Admin dashboard (`@tabler/icons-react`) |
| **Material Symbols Outlined** | Product actions (CDN Google Fonts) |
| **PNG Icons** (`/public/icons/`) | Logo, specialty badges (`logo.png`, `discount1.png`) |

---

