import GeneralFeed from "@/components/homepage/GeneralFeed";
import { getAuthSession } from "@/lib/auth";

const page = async () => {
  const session = await getAuthSession();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Global feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* @ts-expect-error server component */}
        {session && <GeneralFeed />}
      </div>
    </>
  );
};

export default page;
