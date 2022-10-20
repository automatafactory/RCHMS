import { useQueryClient } from "react-query"
const queryClient = useQueryClient()

const networkAuthenticated = async ({ url, body }) => {
  return axiosInstance({
    url: url,
    method: "POST",
    data: body,
  }).then(({ data }) => {
    return data
  })
}

export const authenticated = ({ url, body }) => {
  queryClient.setMutationDefaults(["add-planet"], {
    mutationFn: (data) => networkAuthenticated({ url, body }),
    onMutate: async (variables) => {
      const { successCb, errorCb } = variables
      return { successCb, errorCb }
    },
    onSuccess: (result, variables, context) => {
      if (context.successCb) {
        context.successCb(result)
      }
    },
    onError: (error, variables, context) => {
      if (context.errorCb) {
        context.errorCb(error)
      }
    },
  })
  return useMutation(["add-planet"])
}
