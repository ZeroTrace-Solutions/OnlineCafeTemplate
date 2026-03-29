import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { toast } from 'sonner';

export const useApiMutation = (url, method = 'POST', queryKey = null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api({
        url,
        method,
        data,
      });
      return response;
    },
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
      }
      toast.success(data?.message || 'Action completed successfully');
    },
    onError: (error) => {
      toast.error(error.toString() || 'Something went wrong');
    },
  });
};
