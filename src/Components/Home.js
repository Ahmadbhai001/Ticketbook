import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Input} from '@rneui/themed';
import RNFetchBlob from 'rn-fetch-blob';
const Home = () => {
  const [pastedUrl, setPastedUrl] = useState('');

  {
    /* Android permission */
  }

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloade App Storage Permission',
          message:
            'Downloade App needs access to your Storage ' +
            'so you can downloade files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const {config, fs} = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    const date=new Date();
    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads:{
        useDownloadManager: true,
        notifications: true,
        path:fileDir+"/download_"+ Math.floor(date.getDate()/2)+'.mp4',
        discription:"File download"
      }
    })
      .fetch('GET', pastedUrl, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
        alert('file downloaded successfully')
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: '#0059b3',
          textAlign: 'center',
          marginTop: 20,
          fontSize: 20,
          fontFamily: 'DancingScript-Bold',
        }}>
        Twitter video downloader
      </Text>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputcontainer}>
          {/* Input Container */}
          <Input
            placeholder="Your Link"
            placeholderTextColor={'#000000'}
            value={pastedUrl}
            onChangeText={text => setPastedUrl(text)}
            style={styles.inputBox}
          />
        </View>
        {/* Downloader BTN */}
        <View style={styles.downloadBtn}>
          <TouchableOpacity
            onPress={() => {
              {
                pastedUrl !== ''
                  ? requestStoragePermission()
                  : alert('Please Add Url');
              }
            }}>
            <Text style={styles.btnText}>Download</Text>
          </TouchableOpacity>
        </View>
        <View>{}</View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  inputcontainer: {
    // flex:1,
    // padding: 5,
    marginVertical: 10,
    borderRadius: 20,
  },
  inputBox: {
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  downloadBtn: {
    borderColor: '#000000',
    backgroundColor: '#00b33c',
    borderRadius: 5,
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
  },
  btnText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  },
});
