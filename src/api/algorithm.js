import request from "@/utils/request";

export function getAlgorithm(params) {
  return request({
    url: "/algorithm/getMethodInfo ",
    method: "post",
    params,
  });
}
