import UserC from "@/app/Components/UserC";

export default async function Page({ params }) {
  const { id } = await params;
  return <UserC userId={id} />;
}
