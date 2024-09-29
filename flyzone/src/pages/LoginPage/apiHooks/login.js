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
    const queryClient = useQueryClient();
  
    const uploadMutation = useMutation({
      mutationFn: (formData) =>
        postToServer(`token`, formData),
  
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: ['all-users'],
          })
          .then(() => {});
      },
    });
    return uploadMutation;
  };