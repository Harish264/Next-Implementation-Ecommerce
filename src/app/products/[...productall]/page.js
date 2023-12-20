
import PDPpage from "@/components/PDPpage";
import PLPpage from "@/components/PLPpage";


const Productpage = ({params}) => {


if (params.productall?.length === 2) {
  return (
    <PDPpage params={params}/>
  )
} else if (params.productall?.length === 1) {
  return (
    <PLPpage params={params}/>
  )
}
  return (
   null
  );
};

export default Productpage;
