import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios'

export function Dashboard() {

    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance');
                setValue(response.data.balance)
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [])

    return ( 
        <>
            <div>
                <Appbar />
            </div>
            <div className="m-5">
                <div className="pt-6">
                <Balance value={value}/>
                </div>
                <div className="pt-8">
                <Users/>
                </div>
            </div>
        </>
    );
}
