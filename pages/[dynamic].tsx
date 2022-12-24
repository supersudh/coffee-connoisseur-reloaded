import { useRouter } from "next/router";
import Head from 'next/head';

const DynamicRoute = () => {
  const router = useRouter();
  // const { dynamic } = router.query;
  const {
    query: {
      dynamic
    }
  } = router;
  return (
    <div>
      <Head><title>{dynamic}</title></Head>
      Hello There, I am a dynamic Route!
    </div>
  );
};

export default DynamicRoute;
