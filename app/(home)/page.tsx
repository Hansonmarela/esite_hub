import { HomeCarousel } from "@/components/shared/home/home-carousel";
import { HomeCard } from "@/components/shared/home/home-card";
import { getProductsForCard, getAllCategories, getProductsByTag } from "@/lib/actions/product.actions";
import { Card, CardContent } from "@/components/ui/card";
import ProductSlider from "@/components/shared/product/product-slider";
import { toSlug } from "@/lib/utils";


export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({ tag: "new-arrivals", limit: 4 });
  const featureds = await getProductsForCard({ tag: "featured", limit: 4 });
  const bestSellers = await getProductsForCard({ tag: "best-sellers", limit: 4 });

  const cards = [
    {
      title: "Categories to explore",
      link: { text: "See More", href: "/search" },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: "Explore New Arrivals",
      items: newArrivals,
      link: { text: "View More", href: "/search?tag=new-arrival" },
    },
    {
      title: "Discover Best Sellers",
      items: bestSellers,
      link: { text: "View All", href: "/search?tag=new-arrival" },
    },
    {
      title: "Featured Products",
      items: featureds,
      link: { text: "Shop Now", href: "/search?tag=new-arrival" },
    },
  ];

  const data = {
    carousel: [
      {
        title: "Summer Sale",
        url: "/summer-sale",
        image: "/images/banner1.jpg",
        buttonCaption: "Shop Now",
      },
      {
        title: "New Arrivals",
        url: "/new-arrivals",
        image: "/images/banner2.jpg",
        buttonCaption: "Explore",
      },
      {
        title: "Best Sellers",
        url: "/best-sellers",
        image: "/images/banner3.jpg",
        buttonCaption: "View Deals",
      },
    ],
  };

  const todaysDeals = await getProductsByTag({ tag: "todays-deal" });
  const bestSellingProducts = await getProductsByTag({ tag: "best-seller" });

  return (
    <>
      <HomeCarousel items={data.carousel} />
      <div className="md:p-4 md:space-y-4 bg-border">
        <HomeCard cards={cards} />
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider title="Today's Deals" products={todaysDeals} />
          </CardContent>
        </Card>

        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider title="Best Selling Product" products={bestSellingProducts} hideDetails />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
