import CalculatorPage from "../_components/CalculatorPage";

export default async function ElectrolytePage(props: {
  searchParams: Promise<{ sub?: string }>;
}) {
  const searchParams = await props.searchParams;
  const subParam = searchParams.sub;
  const sub = subParam === "na" || subParam === "k" ? subParam : undefined;

  return <CalculatorPage initialSub={sub} />;
}
