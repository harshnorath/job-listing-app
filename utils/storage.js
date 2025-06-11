import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeBookmarks = async (bookmarks) => {
  await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarks));
};

export const getBookmarks = async () => {
  const data = await AsyncStorage.getItem('bookmarkedJobs');
  return data ? JSON.parse(data) : [];
};
