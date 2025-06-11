import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import { storeBookmarks, getBookmarks } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function JobDetailScreen({ route }) {
  const { job } = route.params;
  const navigation = useNavigation();

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  };

  const bookmarkJob = async () => {
    const existing = await getBookmarks();

    const isAlreadyBookmarked = existing.some(item => item.id === job.id);
    if (isAlreadyBookmarked) {
      showToast('Already bookmarked!');
      navigation.goBack();
      return;
    }

    const updated = [...existing, job];
    await storeBookmarks(updated);

    showToast('Job bookmarked!');
    navigation.goBack();
  };

  const details = job?.primary_details || {};

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.text}>📍 Location: {details.Place || 'N/A'}</Text>
        <Text style={styles.text}>💰 Salary: {details.Salary || 'N/A'}</Text>
        <Text style={styles.text}>💼 Type: {details.Job_Type || 'N/A'}</Text>
        <Text style={styles.text}>🧠 Experience: {details.Experience || 'N/A'}</Text>
        <Text style={styles.text}>📞 Phone: {job.whatsapp_no || 'N/A'}</Text>

        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button title=" Back" onPress={() => navigation.goBack()} color="#666" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="🔖 Bookmark" onPress={bookmarkJob} color="#0077cc" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222B45',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
