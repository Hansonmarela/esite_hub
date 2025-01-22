import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import { getProductsForCard, getAllCategories, getProductsByTag } from "@/lib/actions/product.actions";
import { Card, CardContent } from "@/components/ui/card"; // Adjust the import path as necessary
import ProductSlider  from "@/components/shared/product/product-slider"; // Adjust the import path as necessary
import { toSlug } from "@/lib/utils"

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: 'new-arrivals',
    limit: 4
  });
  const featureds = await getProductsForCard({
    tag: 'featured',
    limit: 4
  });
  const bestSellers = await getProductsForCard({
    tag: 'best-sellers',
    limit: 4
  });


  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category: string) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals || [], // Ensure items have a fallback
      link: {
        text: 'View More',
        href: '/search?tag=new-arrivals',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers || [], // Ensure items have a fallback
      link: {
        text: 'View All',
        href: '/search?tag=best-sellers',
      },
    },
    {
      title: 'Featured Products',
      items: featureds || [], // Ensure items have a fallback
      link: {
        text: 'Shop Now',
        href: '/search?tag=featured',
      },
    },
  ];

  const data = {
    carousel: [
      { title: 'Item 1', url: '/item1', image: '/banner1.jpg', buttonCaption: 'Shop Now' },
      { title: 'Item 2', url: '/item2', image: '/banner2.jpg', buttonCaption: 'Shop Now' },
      { title: 'Item 3', url: '/item3', image: '/banner3.jpg', buttonCaption: 'Shop Now' },
    ]
  };
  
const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })

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
      </div>
    </>
  );
}  
