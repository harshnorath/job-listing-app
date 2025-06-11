import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { getBookmarks, storeBookmarks } from '../utils/storage';
import JobCard from '../components/JobCard';
import { useNavigation } from '@react-navigation/native';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const data = await getBookmarks();
      setBookmarks(data);
    };
    const unsubscribe = navigation.addListener('focus', fetchBookmarks);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    const updated = bookmarks.filter((job) => job.id !== id);
    setBookmarks(updated);
    await storeBookmarks(updated);
  };

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
      <JobCard
        job={item}
        // onPress={() => navigation.navigate('JobDetail', { job: item })}
        onDelete={() => handleDelete(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>🔖 Bookmarked Jobs</Text>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={
          bookmarks.length === 0 ? styles.centered : styles.listContainer
        }
        ListEmptyComponent={<Text style={styles.empty}>No bookmarks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 6,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 24,
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#888',
  },
});
