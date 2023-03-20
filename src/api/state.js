import request from "@/utils/request";

export function errorPosStatis() {
  return request({
    url: "/device/errorPosStatis",
    method: "post"
  });
}
export function productStatistics() {
  return request({
    url: "/device/productStatistics",
    method: "post"
  });
}
