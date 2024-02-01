import { useEffect, useRef, useState } from 'react';
import { GetdataFunction, PatchImageFunction, PatchdataFunction } from '../../utils/ApiCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Globals from '../../utils/Globals';

export function usePersonalInformationViewModel(navigation) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [buttonShow, setButtonShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const refCameraRBSheet = useRef();
    const [FilePath, setFilePath] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        setModalVisible(true);
        try {
            const id = await AsyncStorage.getItem('id');
            if (id) {
                setUserId(id);
                getUserProfile(id);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setModalVisible(false);
        }
    }

    async function getUserProfile(id) {
        try {
            setModalVisible(true);
            const result = await GetdataFunction('user/' + id + '/profile/');
            console.log('#$#$#$$#$#$', result.data.data)

            if (result.success) {
                const Data = result.data.data;
                setPhoneCode(Data.phone_code);
                setPhone(Data.mobile_number);
            }
        } catch (e) {
            setErrorVisible(true);
            setErrorMessage(e);
        } finally {
            setModalVisible(false);
        }
    }

    async function UserVerify() {
        // Add strong validation checks here
        if (!name || !surname || !email || !phone || !phoneCode) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone format (assuming a simple numeric phone number)
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid numeric phone number.');
            return;
        }

        let info = {
            "first_name": name,
            "last_name": surname,
            "phone_code": phoneCode,
            "email": email,
            "profile": {
                // "address": "string",
                // "postal_code": "string",
                "is_agree_to_terms_and_condition": true
            }
        };

        try {
            setModalVisible(true);
            const result = await PatchdataFunction('user/' + userId + '/profile/', info);

            if (result.success) {
                const Data = result.data.data;
                console.log('%$$%$%$%$%$%', Data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigator' }],
                });
            }
        } catch (e) {
            setErrorVisible(true);
            setErrorMessage(e);
        } finally {
            setModalVisible(false);
        }
    }


    const closeErrorPopup = () => {
        setErrorVisible(false);
    };


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                //  console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.log(err);
                // alert('Write permission err', err);
            }
            return false;
        } else return true;
    };



    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 200,
            maxHeight: 200,
            quality: 2,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
            includeBase64: false,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                //   console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    console.log('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                console.log("%%%%%&&&&*", response.assets[0].base64)
                //   Globals._Base64String = response.assets[0].base64;
                //   Globals._DocName = response.assets[0].fileName;
                //   console.log('base64 -> ',response.assets[0].base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                console.log("%%%%%&&&&*", Globals._Base64String)
                var arr = [];
                arr.push(response.assets[0])
                setFilePath(arr[0].uri);
                console.log(arr[0].uri)
                refCameraRBSheet.current.close();
            });
        }
    };


    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 200,
            maxHeight: 200,
            quality: 2,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            //   Globals._Base64String = response.assets[0].base64;
            //   Globals._DocName = response.assets[0].fileName;
            console.log('base64 -> ', "_________");
            //console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.assets[0].fileName);
            var arr = [];
            arr.push(response.assets[0])
            setFilePath(arr[0].uri);
            refCameraRBSheet.current.close();
        });
    };

    useEffect(() => {
        if (FilePath != null) {
            UpdateProfileImage();
        }
    }, [FilePath]);

    async function UpdateProfileImage() {


        try {
            setModalVisible(true);


            const result = await PatchImageFunction('user/' + userId + '/image/', FilePath);

            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4', result.data.data);

            if (result.success) {
                const Data = result.data.data;
                console.log('%$$%$%$%$%$%', Data);
            }
        } catch (e) {
            alert(e);
        } finally {
            setModalVisible(false);
        }
    }


    return {
        name,
        setName,
        surname,
        setSurname,
        email,
        setEmail,
        phone,
        setPhone,
        buttonShow,
        setButtonShow,
        UserVerify,
        modalVisible,
        setModalVisible,
        getUser,
        phoneCode,
        errorMessage,
        errorVisible,
        closeErrorPopup,
        refCameraRBSheet,
        FilePath,
        captureImage,
        chooseFile
    };
}
