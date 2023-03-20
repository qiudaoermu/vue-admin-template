import request from "@/utils/request";

export function getDict(params) {
  return request({
    url: "/dict/getDict",
    method: "get",
    params
  });
}
