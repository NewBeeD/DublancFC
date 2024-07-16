import { notFound } from "next/navigation";


interface Param {

  params: {
    productId: string,
    reviewId: string;
  }
}

export default function ProductDetails({ params }: Param){

  if(parseInt(params.reviewId) > 1000){
    notFound()
  }


  return <h1>Review {params.reviewId} for product {params.productId}</h1>
}