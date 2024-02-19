import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
    return ( 
        <>
            <div>
                <Appbar />
            </div>
            <div className="m-5">
                <div className="pt-6">
                <Balance value={10000}/>
                </div>
                <div className="pt-8">
                <Users/>
                </div>
            </div>
        </>
    );
}
