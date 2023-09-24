// hooks/usePreviousPath.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function usePreviousPath() {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [isinnerPath,setIsinnerPath] = useState(false);
  const innerPathsList = ["/bid/rfp-name","/profile"]
  const checkIfInnerPath = ()=>{
    if(innerPathsList?.includes(router.pathname)){
      setIsinnerPath(true);
    }
    else {
      setIsinnerPath(false);
    }
  }
  useEffect(() => {
    const handleRouteChange = (url: string) => {
     if(!innerPathsList?.includes(router.pathname)) {
        setPreviousPath(router.pathname);
      }
    };

    checkIfInnerPath();
    
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return {previousPath,isinnerPath};
}