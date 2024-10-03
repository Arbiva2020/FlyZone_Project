import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getFromServer,
  postToServer,
} from '../../../api.js';

export const usePostNewUser = () => {
    const {
      isPending,
      error,
      data,
    } = useQuery({
      queryKey: ['post-user'],
      queryFn: () =>
        postToServer(`post-user`).then((res) => res.data),
    });
  
    return {
        data, error, isPending
    };
  };

  export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
  
    const uploadMutation = useMutation({
      mutationFn: (formData) =>
        postToServer(`user`, formData),
  
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: ['post-user'],
          })
          .then(() => {});
      },
    });
    return uploadMutation;
  };