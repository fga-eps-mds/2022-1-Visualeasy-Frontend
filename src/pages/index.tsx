import DisplayHome from "./components/DisplayHome"
const Home = ({person}) => {
  return (
    <DisplayHome displayHomeData = {person}/>
  )
}

export default Home


export async function getServerSideProps(context) {
  let query = context.query

  const tidp = query.variavel
  if (query) {
  var array = tidp?.split(',').map((n)=> {
    return n;
  })
  const person =
  {
    id: query.id,
    intervalo: Number(query.intervalo),
    startDate:query.startDate,
    endDate:query.endDate,
    granularity:query.granularity,
    variavel:array,
    graphName:query.graphName
  };

  return {
    props: {person}, // will be passed to the page component as props
  }}
  return{props:{}}
}