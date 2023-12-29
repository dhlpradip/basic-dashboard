import {createContext, useEffect, useState} from "react";

const DataContext = createContext();

const DataContextProvider = ({children}) => {
    const [pageTitle, setPageTitle] = useState("");
    const [combinedData, setCombinedData] = useState([]);
    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await import("../data/users.json");
            setUsers(response.default);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchSubscriptions = async () => {
        try {
            setIsLoading(true);
            const response = await import("../data/subscriptions.json");
            setSubscriptions(response.default);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchSubscriptions();
    }, []);

    useEffect(() => {
        if (users) {
            if (subscriptions) {
                const combined = users.map((user) => ({
                    ...user,
                    package:
                        subscriptions.find(
                            (subscription) => parseInt(subscription.user_id) === user.id
                        )?.package || "-",
                    expires_on:
                        subscriptions.find(
                            (subscription) => parseInt(subscription.user_id) === user.id
                        )?.expires_on || "-",
                }));
                console.log({combined});
                setCombinedData(combined);
            }
        }
    }, [subscriptions, users]);

    return (
        <DataContext.Provider
            value={{users, subscriptions, combinedData, isLoading, error, pageTitle, setPageTitle}}
        >
            {children}
        </DataContext.Provider>
    );
};

export {DataContext, DataContextProvider};