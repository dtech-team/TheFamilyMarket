import { getAllCategories } from "@/lib/services/category.service";
import Link from "next/link";
import { ChevronRight, Tag } from "lucide-react";

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

export async function HomeCategorySidebar() {
  const { data: categories } = await getAllCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <aside className="hidden lg:block w-[220px] xl:w-[240px] shrink-0">
      <div className="sticky top-[80px]">
        <nav className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-primary text-primary-foreground">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Tag className="size-4" />
              Danh mục sản phẩm
            </h3>
          </div>

          {/* Category List */}
          <ul className="py-1">
            {categories.map((category, index) => (
              <li key={category.id}>
                <Link
                  href={`/products?categories=${category.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors group"
                >
                  <span className="text-base leading-none">
                    {getCategoryIcon(category.name)}
                  </span>
                  <span className="flex-1 truncate">{category.name}</span>
                  <ChevronRight className="size-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
                {index < categories.length - 1 && (
                  <div className="mx-4 border-b border-border/30" />
                )}
              </li>
            ))}
          </ul>

          {/* Footer link */}
          <div className="px-4 py-3 border-t border-border/40">
            <Link
              href="/products"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Xem tất cả sản phẩm
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
