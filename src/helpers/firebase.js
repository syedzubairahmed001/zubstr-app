import firebase from "../global/firebase/firebase";

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token", token);

    return Promise.resolve(token);
  } catch (error) {
    console.error(error);
  }
};
