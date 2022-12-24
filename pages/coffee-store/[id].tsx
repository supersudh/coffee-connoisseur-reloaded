import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/dynamic">
        Go to dynamic page
      </Link>
    </div>
  );
};

export default CoffeeStore;
