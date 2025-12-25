import ProductC from "@/app/Components/ProductC";

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductC productId={id} />;
}
