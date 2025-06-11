import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { useNavigation } from '@react-navigation/native';

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const numColumns = Platform.OS === 'web' ? 2 : 1;
  const itemWidth = screenWidth / numColumns;

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      const jobList = response.data.results;

      if (Array.isArray(jobList)) {
        setJobs((prev) => [...prev, ...jobList]);
        setPage((prev) => prev + 1);
      } else {
        console.warn('❗ Unexpected response shape:', response.data);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ width: itemWidth , paddingLeft:1.5,padding:10}}>
      <JobCard
        job={item}
        onPress={() => navigation.navigate('JobDetail', { job: item })}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>🧾 Explore Jobs</Text>
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={fetchJobs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator color="#0077cc" size="small" /> : null}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
    backgroundColor: 'lightyellow',
    padding:2,
    
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 6,
    color: '#0077CC ',
    textAlign:"center",
    color:"purple"
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
})