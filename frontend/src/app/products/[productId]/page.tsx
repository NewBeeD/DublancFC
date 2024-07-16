
interface Param {

  params: {
    productId: string;
  }
}

export default function ProductDetails({ params }: Param){
  return <h1>Details about product { params.productId }</h1>
}