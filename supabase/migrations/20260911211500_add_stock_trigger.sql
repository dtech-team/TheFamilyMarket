-- Tạo hàm tự động xử lý tồn kho và số lượng bán
CREATE OR REPLACE FUNCTION update_stock_and_sales_on_order()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. Trừ tồn kho và tăng số lượng đã bán cho Sản phẩm chính
  UPDATE public.products
  SET 
    stock_quantity = GREATEST(0, COALESCE(stock_quantity, 0) - NEW.quantity),
    sold_count = COALESCE(sold_count, 0) + NEW.quantity
  WHERE id = NEW.product_id;

  -- 2. Nếu khách mua một Tùy chọn (Biến thể) cụ thể, trừ luôn tồn kho của Tùy chọn đó
  IF NEW.variant_id IS NOT NULL THEN
    UPDATE public.product_variants
    SET stock_quantity = GREATEST(0, COALESCE(stock_quantity, 0) - NEW.quantity)
    WHERE id = NEW.variant_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Xóa trigger cũ nếu có để tránh trùng lặp
DROP TRIGGER IF EXISTS trigger_update_stock_on_order ON public.order_items;

-- Gắn Trigger vào bảng Chi tiết đơn hàng (order_items)
CREATE TRIGGER trigger_update_stock_on_order
AFTER INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_and_sales_on_order();
