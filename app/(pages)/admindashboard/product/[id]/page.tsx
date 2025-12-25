import ProductC from "@/app/Components/ProductC";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ProductC productId={id} />;
}
