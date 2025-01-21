import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

// Helper for price validation
const Price = (field: string) =>
  z
    .coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      { message: `${field} must have exactly two decimal places (e.g. 49.99)` }
    );

export const ProductInputSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  images: z.array(z.string()).min(1, { message: "Product must have at least one image" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  isPublished: z.boolean(),
  price: Price("Price"),
  listPrice: Price("List price"),
  countInStock: z
    .coerce
    .number()
    .int()
    .nonnegative({ message: "Count in stock must be a non-negative number" }),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z
    .coerce
    .number()
    .min(0, { message: "Average rating must be at least 0" })
    .max(5, { message: "Average rating must be at most 5" }),
  numReviews: z
    .coerce
    .number()
    .int()
    .nonnegative({ message: "Number of reviews must be a non-negative number" }),
  ratingDistribution: z
    .array(
      z.object({
        rating: z.number(),
        count: z.number(),
      })
    )
    .max(5, { message: "Rating distribution can have at most 5 items" }),
  reviews: z.array(z.string()).default([]),
  numSales: z
    .coerce
    .number()
    .int()
    .nonnegative({ message: "Number of sales must be a non-negative number" }),
});
