const { contextBridge } = require('electron');


const apiBase =
  process.env.VITE_API ||
  process.env.API_BASE_URL ||
  'http://13.53.169.202:8080'; 

contextBridge.exposeInMainWorld('config', { apiBase });
