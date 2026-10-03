'use client'
import ProductCard from "./ProductCard";
import { useReducer } from "react";
import Link from "next/link";

export default function CarPanel() {
    const compareReducer = (compareList:Set<string>, action:{type:string, carName:string}) => {
        switch(action.type) {
            case 'add': {
                return new Set(compareList.add(action.carName));
            }
            case 'remove': {
                compareList.delete(action.carName);
                return new Set(compareList);
            }
            default: return compareList;
        }
    }

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Set<string>());

    /**
     * Mock Data for Demontration Only
     */
    const mockCarRepo = [
        {cid: "001", name: "Honda Civic", image: "/img/civic.jpg"},
        {cid: "002", name: "Honda Accord", image: "/img/accord.jpg"},
        {cid: "003", name: "Toyota Fortuner", image: "/img/fortuner.jpg"},
        {cid: "004", name: "Tesla Model 3", image: "/img/tesla.jpg"}
    ];

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
                flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                    {
                    mockCarRepo.map((carItem)=>(
                        <Link href={`/car/${carItem.cid}`} className="w-1/5" key={carItem.cid}>
                        <ProductCard carName={carItem.name} imgSrc={carItem.image}
                            onCompare={(car:string) => {dispatchCompare({type:'add', carName:car})}}
                        />
                        </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-medium">Compare List: {compareList.size}</div>
            {Array.from(compareList).map( (car)=><div key={car} 
                onClick={()=>dispatchCompare({type:'remove', carName:car})}>
                {car}</div> )}
        </div>
    );
}