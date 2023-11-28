//Map on orderBY string[] to converting to string

import axiosClient from "@/configs/axios-client"; 
import moment from "moment";

//generate orderBY 
export const  orderByToString = (orderBy :any):string|void=> {
    let orderBy_string="";
    if(orderBy)
  {
      for (const key in orderBy) {
        if (orderBy.hasOwnProperty(key)) {
          const value = orderBy[key];
          orderBy_string += `OrderBy=${key}:${value}&`;
        }
      }
      return orderBy_string 
  }else{
    return "";
  }
  }

  // CASH_IN to Cash In
export  function keyToTitleCase(key:string):string {
  if(!key) return "";
    var text = key.toLowerCase().replace(/_/g, " ");
    return text.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
//conveting to format 12.356.25
export function formatNumber(number: number): string {
    const formatter: Intl.NumberFormat = new Intl.NumberFormat();
    return formatter.format(number);
  }

  export  function getFirstElement(obj: any): any {
    const firstKey = Object.keys(obj)[0];
    const firstArray = obj[firstKey];
    const firstElement = firstArray[0];
    return firstElement;
  }
//time in local
export function parseToLocal(date: string, time: boolean = false) {
    if (date === "") return "-";
    let options: any = {year: "numeric", month: "short", day: "numeric"};
    const localDate = getLocalTime(date);
    if (time) options = {...options, hour12: true, hour: "numeric", minute: "numeric"}
    let dateObj = new Date(localDate).toLocaleString("en-US" ,options);
    return dateObj;
};
//time in utc
export function parstToUtc(date: string, time: boolean = false) {
    if (date === "") return "-";
    let options: any = {year: "numeric", month: "short", day: "numeric"};
    const localDate = getUtcTime(date);
    if (time) options = {...options, hour12: true, hour: "numeric", minute: "numeric"}
    let dateObj = new Date(localDate).toLocaleString("en-US" ,options);
    return dateObj;
};

export function getLocalTime(utcTime: string): Date {
  const utcDate = new Date(utcTime); // Create a new Date object from the UTC time
  const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000); // Convert the UTC time to local time
  return localDate;
}
export function getUtcTime(utcTime: string): Date {
  const utcDate = new Date(utcTime); 
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000); // Convert the UTC time to local time
  return localDate;
}
export function getDateString(date: Date): string {
  return moment(date).format().slice(0, -6);
}

export function getWalletTypeName(walletType?: string, walletMask?: string): string | undefined {
  if (walletType === "Cash") {
    return "Advance";
  }
  if (walletType === "OutOfPocket") {
    return "Out-of-pocket";
  }
  if(walletType === "Card"){
    return `Card ** ${walletMask}`;
  }
  return walletType;
}

export function createQueryUrl(url: string, filters: any): string {
  url = url +"?";
  for (const key in filters) {
    const value = filters[key];
    if((value !== null && value !== undefined && value !== '') || value === 0){
      url = url + `${key}=${value}&`
    }
  }
  return url;
}

export function getFileNameFromUrl(url: string) {
  const segments = url.split('/');
  const lastSegment = segments[segments.length - 1];
  return lastSegment;
}
function removeDomainFromURL(url:string) {
  const urlObject = new URL(url);
  const pathAndQuery = urlObject.pathname + urlObject.search + urlObject.hash;
  return pathAndQuery;
}
export async function downloadFileUsingFetch(url: string, fileName: string) {
  
  // const response = await fetch(url);
  const res = await axiosClient.get("expense/download-image?urlPath=" + url, {
    responseType: "blob",
  });
  
  // const blob = await res.data.blob();
  const blob = new Blob([res.data], { type: "image/png" });
  // Create a temporary URL for the Blob
  const blobURL = URL.createObjectURL(blob);
  // Create a link element to simulate the download
  const downloadLink = document.createElement("a");
  downloadLink.href = blobURL;
  downloadLink.download = "image.png"; // Specify the desired filename

  // Simulate a click on the link to initiate the download
  downloadLink.click();

  // Clean up the temporary URL
  URL.revokeObjectURL(blobURL);
}

export const showErrorMessage = (err:any)=>{
  if (err?.response?.status == 400) {
    if (err?.response?.data?.Message || err?.response?.data?.message) {
      return err?.response?.data?.Message || err?.response?.data?.message;
    }
  } else if (err?.response?.status == 500) {
    if (err?.response?.data?.Message) {
      return err?.response?.data?.Message;
    }
  } else {
    return "unknown error occurred";
  }
}

export const Captalize = (word: | any) => {
  if (typeof word == "string")
    return word
      .toLowerCase().charAt(0).toUpperCase() + word.substring(1);
  return word;
};