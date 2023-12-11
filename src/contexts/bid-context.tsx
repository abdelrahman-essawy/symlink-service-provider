import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IBid, IOffer } from "@/@types/bid";
import { get_Bids,get_Bid_id,get_attached_file,get_list_of_offer} from "../environment/apis"
export const BidContext = createContext<BidContextType | undefined>(undefined);
//TODO: move this to types folder

const BidContextProvider = ({ children }: any) => {
  const [bids, setBids] = useState<IBid[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [Selectedbid, setSelectedBid] = useState<IBid>({} as IBid);
  const [count, setCount] = useState<number>(3);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBids = async ( PageNumber: number , PageSize: number ,SearchString?:string) => {
   await axiosClient
      .get(get_Bids(PageNumber, PageSize, SearchString))
      .then((res) => {
        setBids(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };
  const fetchlistoffers = async ( PageNumber: number , PageSize: number ,SearchString?:string) => {
   await axiosClient
      .get(get_list_of_offer(PageNumber, PageSize, SearchString))
      .then((res) => {
        setOffers(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };
  const fetchAttachedFile =  (page: number, rowsPerPage: number,bidID:string) => {
    axiosClient
      .get(get_attached_file(page,rowsPerPage,bidID))
      .then((res) => {
        setFiles(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };

  const getBid =  (id: string) => {
    axiosClient
      .get(get_Bid_id(id))
      .then((res) => {
        setSelectedBid(res.data.data as IBid);
      })
      .catch((error) => {});
  };

  //TODO: replace with BK-end function
  const AddBid = (bid: any) => {
    const newBid: IBid = {
      ...bid,
      id: (bids?.length + 1).toString(),
    };
    setBids([...bids, newBid]);
    setCount(count + 1);
  };


  return (
    <BidContext.Provider
      value={{
        bids,
        offers,
        files,
        Selectedbid,
        count,
        pageSize,
        totalPages,
        fetchBids,
        fetchlistoffers,
        getBid,
        AddBid,
      }}
    >
      {children}
    </BidContext.Provider>
  );
};

export default BidContextProvider;

export type BidContextType = {
  bids: IBid[];
  offers: IOffer[];
  files: any[];
  count: number;
  pageSize: number;
  totalPages: number;
  Selectedbid: IBid;
  fetchBids:  ( PageNumber: number , PageSize: number ,SearchString?:string) => void;
  fetchlistoffers:  ( PageNumber: number , PageSize: number ,SearchString?:string) => void;
  getBid: ( id: string) => void;
  AddBid: (bid: IBid) => void;
};
