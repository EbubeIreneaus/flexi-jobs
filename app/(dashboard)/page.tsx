import VisualDisplay from "@/components/VisualDisplay";

export default async function Home() {

  const res = await fetch(`https://jsearch.p.rapidapi.com/search?query=jobs`,{
    method:'GET',
    headers:{
      'X-RapidAPI-Key': process.env.RapidApiKey as string,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  })

  const data  = await res.json();
 
  return (
    <>
    <VisualDisplay initialData={data?.data} />
    </>
  );
}
