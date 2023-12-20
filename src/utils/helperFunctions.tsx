//Map on orderBY string[] to converting to string

import axiosClient from "@/configs/axios-client";
import moment from "moment";

//generate orderBY
export const orderByToString = (orderBy: any): string | void => {
  let orderBy_string = "";
  if (orderBy) {
    for (const key in orderBy) {
      if (orderBy.hasOwnProperty(key)) {
        const value = orderBy[key];
        orderBy_string += `OrderBy=${key}:${value}&`;
      }
    }
    return orderBy_string;
  } else {
    return "";
  }
};
// convert duration in hours to duration in (hours, days,months, years)

export const convertFromHours = (hours: number): string => {
  const hoursInDay = 24;
  const daysInWeek = 7;
  const daysInMonth = 30; // Assuming an average of 30 days in a month
  const daysInYear = 365; // Assuming 365 days in a year

  if (hours < hoursInDay) {
    return `${hours} hours`;
  } else if (hours < hoursInDay * daysInWeek) {
    const days = Math.floor(hours / hoursInDay);
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours < hoursInDay * daysInWeek * daysInMonth) {
    const weeks = Math.floor(hours / (hoursInDay * daysInWeek));
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  } else if (hours < hoursInDay * daysInMonth * daysInYear) {
    const months = Math.floor(hours / (hoursInDay * daysInMonth));
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(hours / (hoursInDay * daysInYear));
    return `${years} year${years > 1 ? 's' : ''}`;
  }
};
//convert  duration in (hours, days,weeks,months, years) to duration in hours
export const convertToHours = (
  duration: number,
  durationType: "hours" | "days" | "weeks" | "months" | "years"
): number => {
  const hoursInDay = 24;
  const daysInWeek = 7;
  const daysInMonth = 30; // Assuming an average of 30 days in a month
  const daysInYear = 365; // Assuming 365 days in a year

  switch (durationType) {
    case "hours":
      return duration;
    case "days":
      return duration * hoursInDay;
    case "weeks":
      return duration * hoursInDay * daysInWeek;
    case "months":
      return duration * hoursInDay * daysInMonth;
    case "years":
      return duration * hoursInDay * daysInYear;
    default:
      throw new Error(
        "Invalid duration type. Supported types are hours, days, weeks, months, and years."
      );
  }
};

//conveting to format 12.356.25
export function formatNumber(number: number): string {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat();
  return formatter.format(number);
}

export function getFirstElement(obj: any): any {
  const firstKey = Object.keys(obj)[0];
  const firstArray = obj[firstKey];
  const firstElement = firstArray[0];
  return firstElement;
}
//time in local
export function parseToLocal(date: string, time: boolean = false) {
  if (date === "") return "-";
  let options: any = { year: "numeric", month: "short", day: "numeric" };
  const localDate = getLocalTime(date);
  if (time) options = { ...options, hour12: true, hour: "numeric", minute: "numeric" };
  let dateObj = new Date(localDate).toLocaleString("en-US", options);
  return dateObj;
}
//time in utc
export function parstToUtc(date: string, time: boolean = false) {
  if (date === "") return "-";
  let options: any = { year: "numeric", month: "short", day: "numeric" };
  const localDate = getUtcTime(date);
  if (time) options = { ...options, hour12: true, hour: "numeric", minute: "numeric" };
  let dateObj = new Date(localDate).toLocaleString("en-US", options);
  return dateObj;
}

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
  if (walletType === "Card") {
    return `Card ** ${walletMask}`;
  }
  return walletType;
}

export function createQueryUrl(url: string, filters: any): string {
  url = url + "?";
  for (const key in filters) {
    const value = filters[key];
    if ((value !== null && value !== undefined && value !== "") || value === 0) {
      url = url + `${key}=${value}&`;
    }
  }
  return url;
}

export function getFileNameFromUrl(url: string) {
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];
  return lastSegment;
}
function removeDomainFromURL(url: string) {
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

export const showErrorMessage: (err: any) => string = (err: any) => {
  if (err?.response?.status == 404) {
    return "404 Not Found";
  } else if (err?.response?.status == 400 || err?.response?.status == 422) {
    if (
      (err?.response?.data?.message?.message || err?.response?.data?.message?.Message) &&
      typeof err?.response?.data?.message?.message == "string"
    ) {
      console.log(err?.response?.data?.message?.message);
      return err?.response?.data?.message?.message || err?.response?.data?.message?.Message;
    } else if (
      err?.response?.data?.message?.message &&
      typeof err?.response?.data?.message?.message === "object"
    ) {
      return err?.response?.data?.message?.message[0];
    } else if (
      (err?.response?.data?.message || err?.response?.data?.Message) &&
      (typeof err?.response?.data?.message == "string" ||
        typeof err?.response?.data?.Message === "string")
    ) {
      return err?.response?.data?.message || err?.response?.data?.Message;
    }
  } else if (err?.response?.status == 500) {
    return err?.response?.data?.message;
  } else {
    return "unknown error occurred";
  }
};

export const Captalize = (word: any) => {
  if (typeof word == "string")
    return word.toLowerCase().charAt(0).toUpperCase() + word.substring(1);
  return word;
};
