import UserC from "../../../../Components/UserC";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  return <UserC userId={id} />;
}
