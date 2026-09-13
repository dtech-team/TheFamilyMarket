import { supabase } from "../supabase/client";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export async function getFeaturedReviews(limit = 10) {
  // Fetch reviews that have high ratings, joined with user profile and product details
  const { data, error } = await supabase
    .from("product_reviews")
    .select(`
      id,
      rating,
      comment,
      created_at,
      profiles (
        id,
        full_name,
        avatar_url
      ),
      products (
        id,
        name,
        image_url
      )
    `)
    .gte("rating", 4) // Only 4 and 5 star reviews
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured reviews:", error);
    return [];
  }

  // Format the data to match the UI requirements
  return data.map((review: any) => {
    // Lấy trực tiếp image_url từ products
    const productImage = review.products?.image_url || "/icons/logo.png";

    return {
      id: review.id,
      name: review.profiles?.full_name || "Khách hàng",
      avatar: review.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.profiles?.full_name || 'KH')}&background=random`,
      rating: review.rating,
      text: review.comment || "",
      timeAgo: formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: vi }),
      product: review.products?.name || "Sản phẩm",
      productImage: productImage,
    };
  }).filter((r: any) => r.text && r.text.length > 10); // Lọc bớt review quá ngắn
}
