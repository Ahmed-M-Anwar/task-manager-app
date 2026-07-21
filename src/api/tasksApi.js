import axiosClient from './axiosClient'

const RESOURCE = '/todos'

export const tasksApi = {
  getAll: (limit = 10) =>
    axiosClient.get(RESOURCE, { params: { _limit: limit } }),

  create: (payload) => axiosClient.post(RESOURCE, payload),

  update: (id, payload) => axiosClient.put(`${RESOURCE}/${id}`, payload),

  remove: (id) => axiosClient.delete(`${RESOURCE}/${id}`),
}
