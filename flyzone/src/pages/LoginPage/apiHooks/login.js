import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getFromServer,
  postToServer,
} from '../../../api.js';

export const useFetchAllUsers = () => {
    const {
      isPending,
      error,
      data,
    } = useQuery({
      queryKey: ['all-users'],
      queryFn: () =>
        getFromServer(`all-users`).then((res) => res.data),
    });
  
    return {
        data, error, isPending
    };
  };

  export const useLoginMutation = () => {
    // const queryClient = useQueryClient();
  
    // const uploadMutation = useMutation({
    //   mutationFn: (formData) =>
    //     postToServer(`token`, formData),
  
    //   onSuccess: () => {
    //     queryClient
    //       .invalidateQueries({
    //         queryKey: ['all-users'],
    //       })
    //       .then(() => {});
    //   },
    // });
    // return uploadMutation;
    
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (formData) =>
        postToServer('token', formData), // Ensure postToServer is set up correctly
  
      onSuccess: () => {
        queryClient.invalidateQueries(['all-users']); // Adjust this if necessary
      },
      onError: (error) => {
        console.error("Login failed:", error); // Log the error for debugging
      },
    });
  };