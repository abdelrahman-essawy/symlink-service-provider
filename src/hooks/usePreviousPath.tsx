// hooks/usePreviousPath.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function usePreviousPath() {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState<string>('/');
  const [isinnerPath,setIsinnerPath] = useState(false);
  const [isProfilePath,setIsProfilePath] = useState(false);
  const innerPathsList = ["/bid/rfp-name","/profile","/certificate","/experience","/educational-info"]
  const innerProfilePathsList = ["/profile","/certificate","/experience","/educational-info"]
  const checkIfInnerPath = ()=>{
    if(innerPathsList?.includes(router.pathname)){
      setIsinnerPath(true);

      if(innerProfilePathsList.includes(router.pathname)){
        setIsProfilePath(true);
      }
      else{
        setIsProfilePath(false);
      }
    }
    else {
      setIsinnerPath(false);
      setIsProfilePath(false);
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

  return {previousPath,isinnerPath,isProfilePath};
}