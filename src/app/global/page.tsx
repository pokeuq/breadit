import GeneralFeed from "@/components/homepage/GeneralFeed";

export default async function Home() {
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Global feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* @ts-expect-error server component */}
        <GeneralFeed />
      </div>
    </>
  );
}
