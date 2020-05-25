declare module "vue-native-websocket";

interface Socket {
  onmessage: (data: any) => void;
  onerror: (data: any) => void;
  onopen: (data: any) => void;
  onclose: (data: any) => void;
}
