interface Params{

  params: {
    slug: string[],
  }
}

export default function Docs({ params }: Params){


  if(params.slug?.length === 2){
    return <>Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}</>
  }
  else if(params.slug?.length === 1){
    return <>Viewing docs for feature {params.slug[0]}</>
  }


  return <>Docs Home Page</>
}