import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ expo install @expo/vector-icons

export default function JobCard({ job, onPress, onDelete }) {
  const salary = job?.primary_details?.Salary || 'Not specified';
  const location = job?.primary_details?.Place || 'Not specified';
  const phone = job?.whatsapp_no || 'Not available';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.rowBetween}>
        <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash-bin" size={20} color="#E74C3C" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📍</Text>
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>💰</Text>
        <Text style={[styles.text, styles.salary]}>{salary}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>📞</Text>
        <Text style={styles.text}>{phone}</Text>
      </View>
    </TouchableOpacity>
  );
}

 const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222B45',
    flex: 1,
  },
  label: {
    fontSize: 16,
    width: 24,
  },
  text: {
    fontSize: 14,
    color: '#6C7A93',
    flex: 1,
  },
  salary: {
    color: '#00B894',
    fontWeight: '600',
  },
});

