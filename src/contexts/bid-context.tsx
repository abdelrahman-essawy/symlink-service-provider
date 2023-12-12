import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IBid, IOffer } from "@/@types/bid";
import { get_Bids,get_Bid_id,get_attached_file,get_list_of_offer} from "../environment/apis"
export const BidContext = createContext<BidContextType | undefined>(undefined);
//TODO: move this to types folder

const BidContextProvider = ({ children }: any) => {
  const [bids, setBids] = useState<IBid[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [Selectedbid, setSelectedBid] = useState<IBid>({} as IBid);
  const [countBids, setCountBids] = useState<number>(0);
  const [countOffers, setCountOffers] = useState<number>(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBids = async ( PageNumber: number , PageSize: number ,SearchString?:string) => {
   await axiosClient
      .get(get_Bids(PageNumber, PageSize, SearchString))
      .then((res) => {
        setBids(res.data.data);
        setCountBids(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };
  const fetchlistOffers = async (multi_RFP_id :string, PageNumber: number , PageSize: number ,SearchString?:string) => {
   await axiosClient
      .get(get_list_of_offer(multi_RFP_id,PageNumber, PageSize, SearchString))
      .then((res) => {
        setOffers(res.data.data);
        setCountOffers(res.data.meta.itemCount);
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


  return (
    <BidContext.Provider
      value={{
        bids,
        offers,
        Selectedbid,
        countBids,
        countOffers,
        pageSize,
        totalPages,
        fetchBids,
       fetchlistOffers,
        getBid,
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
  countBids: number;
  countOffers: number;
  pageSize: number;
  totalPages: number;
  Selectedbid: IBid;
  fetchBids:  ( PageNumber: number , PageSize: number ,SearchString?:string) => void;
  fetchlistOffers:  (multi_RFP_id :string, PageNumber: number , PageSize: number ,SearchString?:string) => void;
  getBid: ( id: string) => void;
};
