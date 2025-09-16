import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureOrder as captureOrderApi } from "../../services/apiCheckout";
import { toast } from "sonner";

export function useCaptureOrder() {
  const queryClient = useQueryClient();

  const { mutate: captureOrder, isPending: isCapturing } = useMutation({
    mutationFn: captureOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["checkout"],
      });
      toast.success("Your order has been successfully received.");
    },
    onError: () => {
      toast.error("An error occurred while submitting the order");
    },
  });

  return { captureOrder, isCapturing };
}
