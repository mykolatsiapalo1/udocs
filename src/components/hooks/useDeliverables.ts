import API from "../../other/baseAPI";

export default function useDeliverables() {
  const getListDeliverables = async () => {
    try {
      const res = await API.get("/deliverables/getlist");

      if (res.data.error) {
        return { error: res.data.error };
      }

      return res.data;
    } catch (e) {
      return { error: e };
    }
  };

  return { getListDeliverables: getListDeliverables };
}
