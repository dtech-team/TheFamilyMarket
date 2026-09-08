-- ==============================================================================
-- Migration: Fix Storage RLS policies to use SECURITY DEFINER functions
-- Date: 2026-09-08
-- Description: 
--   Các policy cũ trên storage.objects sử dụng JOIN trực tiếp vào profiles + roles,
--   gây Infinite Recursion vì bảng profiles cũng có RLS.
--   Chuyển sang sử dụng các hàm check_is_admin() / check_is_staff_or_admin()
--   (SECURITY DEFINER) để bypass RLS khi kiểm tra vai trò.
--   Đồng thời bổ sung policy cho bucket products-bucket.
-- ==============================================================================

-- ==========================================
-- 1. FIX BUCKET: public_assets
-- ==========================================

-- Đảm bảo bucket tồn tại
INSERT INTO storage.buckets (id, name, public)
VALUES ('public_assets', 'public_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Xóa tất cả policy cũ (dùng JOIN trực tiếp gây lỗi recursion)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

-- 1.1. Ai cũng đọc được (bucket public)
CREATE POLICY "public_assets: Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'public_assets');

-- 1.2. Staff & Admin được upload
CREATE POLICY "public_assets: Staff and Admin Insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public_assets' AND public.check_is_staff_or_admin()
);

-- 1.3. Staff & Admin được update
CREATE POLICY "public_assets: Staff and Admin Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'public_assets' AND public.check_is_staff_or_admin()
);

-- 1.4. Chỉ Admin được xóa
CREATE POLICY "public_assets: Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'public_assets' AND public.check_is_admin()
);


-- ==========================================
-- 2. FIX BUCKET: products-bucket
-- ==========================================

-- Đảm bảo bucket tồn tại
INSERT INTO storage.buckets (id, name, public)
VALUES ('products-bucket', 'products-bucket', true)
ON CONFLICT (id) DO NOTHING;

-- Xóa policy cũ nếu có
DROP POLICY IF EXISTS "products-bucket: Public Read" ON storage.objects;
DROP POLICY IF EXISTS "products-bucket: Staff and Admin Insert" ON storage.objects;
DROP POLICY IF EXISTS "products-bucket: Staff and Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "products-bucket: Admin Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read products-bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin upload products-bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin update products-bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin delete products-bucket" ON storage.objects;

-- 2.1. Ai cũng đọc được (bucket public)
CREATE POLICY "products-bucket: Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'products-bucket');

-- 2.2. Staff & Admin được upload
CREATE POLICY "products-bucket: Staff and Admin Insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products-bucket' AND public.check_is_staff_or_admin()
);

-- 2.3. Staff & Admin được update
CREATE POLICY "products-bucket: Staff and Admin Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products-bucket' AND public.check_is_staff_or_admin()
);

-- 2.4. Chỉ Admin được xóa
CREATE POLICY "products-bucket: Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products-bucket' AND public.check_is_admin()
);


-- ==========================================
-- 3. FIX BUCKET: avatars (nếu có dùng cho avatar user)
-- ==========================================

-- Đảm bảo bucket tồn tại
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Xóa policy cũ nếu có
DROP POLICY IF EXISTS "avatars: Public Read" ON storage.objects;
DROP POLICY IF EXISTS "avatars: Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "avatars: Owner Update" ON storage.objects;
DROP POLICY IF EXISTS "avatars: Owner Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload avatars" ON storage.objects;

-- 3.1. Ai cũng đọc được
CREATE POLICY "avatars: Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- 3.2. User đăng nhập được upload avatar
CREATE POLICY "avatars: Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND auth.role() = 'authenticated'
);

-- 3.3. User được update file của mình (hoặc Admin)
CREATE POLICY "avatars: Owner Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR public.check_is_admin()
  )
);

-- 3.4. User được xóa file của mình (hoặc Admin)
CREATE POLICY "avatars: Owner Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR public.check_is_admin()
  )
);
