import request from "@/utils/request";

export function errorPosStatis() {
  return request({
    url: "/screen/errorPosStatis",
    method: "post",
  });
}
export function productStatistics() {
  return request({
    url: "/screen/productStatistics",
    method: "post",
  });
}
