"use client";

import { useMemo, useState } from "react";

type SchemaType = "Article" | "Product" | "LocalBusiness" | "Event" | "Recipe" | "Review";

export function SchemaMarkupGenerator() {
  const [type, setType] = useState<SchemaType>("Article");

  // Article
  const [articleHeadline, setArticleHeadline] = useState("How to Use UTM Parameters");
  const [articleAuthor, setArticleAuthor] = useState("Jay");
  const [articleDatePublished, setArticleDatePublished] = useState("2026-04-22");
  const [articleImage, setArticleImage] = useState("https://freetoolarea.com/og.png");
  const [articleUrl, setArticleUrl] = useState("https://freetoolarea.com/guides/utm");

  // Product
  const [productName, setProductName] = useState("Free Tool Area Pro");
  const [productImage, setProductImage] = useState("https://freetoolarea.com/og.png");
  const [productDescription, setProductDescription] = useState("All-in-one SEO and marketing toolkit.");
  const [productBrand, setProductBrand] = useState("Free Tool Area");
  const [productPrice, setProductPrice] = useState("29.00");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productAvailability, setProductAvailability] = useState("InStock");

  // LocalBusiness
  const [bizName, setBizName] = useState("Jay's Coffee Shop");
  const [bizStreet, setBizStreet] = useState("123 Main St");
  const [bizCity, setBizCity] = useState("Seattle");
  const [bizRegion, setBizRegion] = useState("WA");
  const [bizPostal, setBizPostal] = useState("98101");
  const [bizCountry, setBizCountry] = useState("US");
  const [bizPhone, setBizPhone] = useState("+1-555-0100");
  const [bizUrl, setBizUrl] = useState("https://example.com/");

  // Event
  const [eventName, setEventName] = useState("SEO Summit 2026");
  const [eventStart, setEventStart] = useState("2026-06-15T09:00");
  const [eventEnd, setEventEnd] = useState("2026-06-15T17:00");
  const [eventLocationName, setEventLocationName] = useState("Convention Center");
  const [eventLocationAddress, setEventLocationAddress] = useState("500 Pike St, Seattle, WA");

  // Recipe
  const [recipeName, setRecipeName] = useState("Classic Chocolate Chip Cookies");
  const [recipeAuthor, setRecipeAuthor] = useState("Jay");
  const [recipePrepTime, setRecipePrepTime] = useState("PT15M");
  const [recipeCookTime, setRecipeCookTime] = useState("PT12M");
  const [recipeIngredients, setRecipeIngredients] = useState(
    "2 cups flour\n1 cup butter\n1 cup chocolate chips\n1/2 cup sugar",
  );
  const [recipeInstructions, setRecipeInstructions] = useState(
    "Preheat oven to 375F.\nMix wet ingredients.\nCombine with flour.\nBake for 12 minutes.",
  );

  // Review
  const [reviewItem, setReviewItem] = useState("Free Tool Area");
  const [reviewAuthor, setReviewAuthor] = useState("Jane Doe");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewBody, setReviewBody] = useState("Excellent free tools, super fast and ad-free.");

  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    let data: Record<string, unknown> = {};
    if (type === "Article") {
      data = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleHeadline,
        author: { "@type": "Person", name: articleAuthor },
        datePublished: articleDatePublished,
        image: articleImage,
        mainEntityOfPage: articleUrl,
      };
    } else if (type === "Product") {
      data = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        image: productImage,
        description: productDescription,
        brand: { "@type": "Brand", name: productBrand },
        offers: {
          "@type": "Offer",
          price: productPrice,
          priceCurrency: productCurrency,
          availability: `https://schema.org/${productAvailability}`,
        },
      };
    } else if (type === "LocalBusiness") {
      data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: bizName,
        address: {
          "@type": "PostalAddress",
          streetAddress: bizStreet,
          addressLocality: bizCity,
          addressRegion: bizRegion,
          postalCode: bizPostal,
          addressCountry: bizCountry,
        },
        telephone: bizPhone,
        url: bizUrl,
      };
    } else if (type === "Event") {
      data = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: eventName,
        startDate: eventStart,
        endDate: eventEnd,
        location: {
          "@type": "Place",
          name: eventLocationName,
          address: eventLocationAddress,
        },
      };
    } else if (type === "Recipe") {
      data = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: recipeName,
        author: { "@type": "Person", name: recipeAuthor },
        prepTime: recipePrepTime,
        cookTime: recipeCookTime,
        recipeIngredient: recipeIngredients.split("\n").map((s) => s.trim()).filter(Boolean),
        recipeInstructions: recipeInstructions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((text) => ({ "@type": "HowToStep", text })),
      };
    } else if (type === "Review") {
      data = {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: { "@type": "Thing", name: reviewItem },
        author: { "@type": "Person", name: reviewAuthor },
        reviewRating: {
          "@type": "Rating",
          ratingValue: reviewRating,
          bestRating: "5",
        },
        reviewBody,
      };
    }
    return JSON.stringify(data, null, 2);
  }, [
    type,
    articleHeadline, articleAuthor, articleDatePublished, articleImage, articleUrl,
    productName, productImage, productDescription, productBrand, productPrice, productCurrency, productAvailability,
    bizName, bizStreet, bizCity, bizRegion, bizPostal, bizCountry, bizPhone, bizUrl,
    eventName, eventStart, eventEnd, eventLocationName, eventLocationAddress,
    recipeName, recipeAuthor, recipePrepTime, recipeCookTime, recipeIngredients, recipeInstructions,
    reviewItem, reviewAuthor, reviewRating, reviewBody,
  ]);

  const scriptBlock = `<script type="application/ld+json">\n${jsonLd}\n</script>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(scriptBlock);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Schema type
        </span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SchemaType)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <option value="Article">Article</option>
          <option value="Product">Product</option>
          <option value="LocalBusiness">LocalBusiness</option>
          <option value="Event">Event</option>
          <option value="Recipe">Recipe</option>
          <option value="Review">Review</option>
        </select>
      </label>

      {type === "Article" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Headline" value={articleHeadline} onChange={setArticleHeadline} wide />
          <Field label="Author" value={articleAuthor} onChange={setArticleAuthor} />
          <Field label="Date published" value={articleDatePublished} onChange={setArticleDatePublished} />
          <Field label="Image URL" value={articleImage} onChange={setArticleImage} wide />
          <Field label="Canonical URL" value={articleUrl} onChange={setArticleUrl} wide />
        </div>
      )}

      {type === "Product" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" value={productName} onChange={setProductName} wide />
          <Field label="Image URL" value={productImage} onChange={setProductImage} wide />
          <Field label="Description" value={productDescription} onChange={setProductDescription} wide />
          <Field label="Brand" value={productBrand} onChange={setProductBrand} />
          <Field label="Price" value={productPrice} onChange={setProductPrice} />
          <Field label="Currency" value={productCurrency} onChange={setProductCurrency} />
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Availability
            </span>
            <select
              value={productAvailability}
              onChange={(e) => setProductAvailability(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="InStock">InStock</option>
              <option value="OutOfStock">OutOfStock</option>
              <option value="PreOrder">PreOrder</option>
            </select>
          </label>
        </div>
      )}

      {type === "LocalBusiness" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business name" value={bizName} onChange={setBizName} wide />
          <Field label="Street" value={bizStreet} onChange={setBizStreet} />
          <Field label="City" value={bizCity} onChange={setBizCity} />
          <Field label="Region/State" value={bizRegion} onChange={setBizRegion} />
          <Field label="Postal code" value={bizPostal} onChange={setBizPostal} />
          <Field label="Country" value={bizCountry} onChange={setBizCountry} />
          <Field label="Phone" value={bizPhone} onChange={setBizPhone} />
          <Field label="URL" value={bizUrl} onChange={setBizUrl} wide />
        </div>
      )}

      {type === "Event" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Event name" value={eventName} onChange={setEventName} wide />
          <Field label="Start (ISO)" value={eventStart} onChange={setEventStart} />
          <Field label="End (ISO)" value={eventEnd} onChange={setEventEnd} />
          <Field label="Location name" value={eventLocationName} onChange={setEventLocationName} />
          <Field label="Location address" value={eventLocationAddress} onChange={setEventLocationAddress} />
        </div>
      )}

      {type === "Recipe" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Recipe name" value={recipeName} onChange={setRecipeName} wide />
          <Field label="Author" value={recipeAuthor} onChange={setRecipeAuthor} />
          <Field label="Prep time (ISO duration)" value={recipePrepTime} onChange={setRecipePrepTime} />
          <Field label="Cook time (ISO duration)" value={recipeCookTime} onChange={setRecipeCookTime} />
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Ingredients (one per line)
            </span>
            <textarea
              value={recipeIngredients}
              onChange={(e) => setRecipeIngredients(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Instructions (one step per line)
            </span>
            <textarea
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
            />
          </label>
        </div>
      )}

      {type === "Review" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Item reviewed" value={reviewItem} onChange={setReviewItem} wide />
          <Field label="Author" value={reviewAuthor} onChange={setReviewAuthor} />
          <Field label="Rating (1-5)" value={reviewRating} onChange={setReviewRating} />
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Review body
            </span>
            <textarea
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            JSON-LD
          </p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">
          {scriptBlock}
        </pre>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
}) {
  return (
    <label className={`block${wide ? " sm:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
