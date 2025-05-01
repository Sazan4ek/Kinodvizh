import { useEffect, useState } from "react";



const useRequest = (request, dependsOn, ...args) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // setTimeout(() => {
        //     request(...args)
        //         .catch((error) => setError(error))
        //         .finally(() => setLoading(false));

        // }, 5000);

        request(...args)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));


    }, dependsOn)

    return [loading, error];
};

export default useRequest;