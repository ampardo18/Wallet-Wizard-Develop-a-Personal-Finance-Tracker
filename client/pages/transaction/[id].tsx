import Title from "@/components/Title";
import Transaction from "@/components/Transaction";
import {useRouter} from "next/router"; 

function Index(){
    const router = useRouter();
    const id = router.query.id as string;
    return(
        <div className="text-center">
            <Title />
            <div className="p-4 flex flex-col items-center">
                <h1 className="text-xl font-bold mb-4">Transaction Page</h1>
                <Transaction id={id}/>
            </div>
        </div>
    );
}

export default Index;

