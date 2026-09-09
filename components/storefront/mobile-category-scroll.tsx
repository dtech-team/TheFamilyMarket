import { getAllCategories } from "@/lib/services/category.service";
import Link from "next/link";
import Image from "next/image";

// Map category name → emoji icon (có thể mở rộng hoặc lưu DB sau)
const categoryIcons: Record<string, string> = {
  "rau củ quả": "🥦",
  "trái cây": "🍊",
  "thịt": "🥩",
  "cá": "🐟",
  "hải sản": "🦐",
  "sữa": "🥛",
  "trứng": "🥚",
  "bánh": "🍞",
  "đồ uống": "🧃",
  "gia vị": "🧂",
  "đồ khô": "🌾",
  "snack": "🍿",
  "đông lạnh": "🧊",
  "chăm sóc": "🧴",
};

function getCategoryIcon(name: string): string {
  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lowerName.includes(key)) return icon;
  }
  return "🛒";
}

export async function MobileCategoryScroll() {
  const { data: categories } = await getAllCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex justify-center lg:hidden w-full overflow-hidden ">
      <div className="flex items-start gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-3 pt-1 snap-x snap-mandatory px-4 md:px-8 max-w-full">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?categories=${category.id}`}
            className="flex flex-col items-center gap-2 min-w-[70px] md:min-w-[80px] shrink-0 snap-start group"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[18px] bg-card/60 backdrop-blur-md border border-border/50 shadow-sm flex items-center justify-center overflow-hidden relative group-hover:border-primary group-hover:shadow-md group-hover:bg-primary/5 transition-all duration-300">
              {category.image_url ? (
                <Image src={category.image_url} alt={category.name} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <span className="text-[28px] md:text-[32px] group-hover:scale-110 transition-transform duration-500">
                  {getCategoryIcon(category.name)}
                </span>
              )}
            </div>
            <span className="text-[11px] md:text-xs font-semibold text-center text-foreground/80 leading-tight group-hover:text-primary transition-all line-clamp-2 px-0.5">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
