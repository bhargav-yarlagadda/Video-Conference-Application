import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

/**
 * Custom React hook to fetch a call by its ID using Stream Video SDK.
 * 
 * @param {string | string[]} id - The ID or an array of IDs of the call(s) to fetch.
 * @returns {{ call: Call | undefined, isCallLoading: boolean }} - An object containing:
 * - `call`: The first matching call object (if found).
 * - `isCallLoading`: A boolean indicating whether the call data is still being fetched.
 */
export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>(); // State to store the fetched call object
  const [isCallLoading, setIsCallLoading] = useState(true); // State to track loading status

  const client = useStreamVideoClient(); // Retrieves the Stream Video SDK client

  useEffect(() => {
    if (!client) return; // Exit early if the client is not available

    const loadCall = async () => {
      try {
        // Query calls using the provided ID(s)
        // Reference: https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]); // Set the first matching call if found

        setIsCallLoading(false); // Mark loading as complete
      } catch (error) {
        console.error(error); // Log any errors that occur during the query
        setIsCallLoading(false); // Ensure loading state is updated even on error
      }
    };

    loadCall(); // Trigger the call fetching logic
  }, [client, id]); // Re-run the effect when `client` or `id` changes

  return { call, isCallLoading }; // Return the fetched call and loading status
};
