import axios from "axios";

export function ConfigureAxios() {
  if(!window.config.backendUrl) {
    alert("window.config.backendUrl not found");
    return;
  }
  axios.defaults.baseURL = window.config.backendUrl;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common["Accept"] = "*/*";
}

export function SetAxiosAuthorizationToken(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}


