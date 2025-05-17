
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar, Coffee, Filter, Search, Utensils, Wine, X } from 'lucide-react-native';
import { format } from 'date-fns';

export default function EventsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    params.filter ? String(params.filter) : null
  );
  const events = [
    {
      id: '1',
      event_title: 'Sunrise Breakfast',
      event_type: 'Breakfast',
      event_date: '2025-05-15',
      event_time: '08:00',
      ticket_price: 20.0,
      image_url: 'https://example.com/breakfast.jpg',
      description: 'Start your day with a fresh and delicious breakfast.',
      venues: { name: 'The Early Bird Cafe', address: '123 Main St' },
    },
    {
      id: '2',
      event_title: 'Lunch at the Park',
      event_type: 'Lunch',
      event_date: '2025-05-16',
      event_time: '12:00',
      ticket_price: 35.0,
      image_url: 'https://example.com/lunch.jpg',
      description: 'Enjoy a hearty lunch in the park.',
      venues: { name: 'Green Meadow Park', address: '456 Oak Ave' },
    },
    {
      id: '3',
      event_title: 'Evening Dinner Gala',
      event_type: 'Dinner',
      event_date: '2025-05-17',
      event_time: '19:00',
      ticket_price: 50.0,
      image_url: 'https://example.com/dinner.jpg',
      description: 'A night to remember with exquisite dishes.',
      venues: { name: 'Grand Banquet Hall', address: '789 Elm St' },
    },
  ];

  const isLoading = false;

  useEffect(() => {
    if (params.filter) {
      setSelectedFilter(String(params.filter));
    }
  }, [params]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return <Coffee size={18} color="#FF6B35" />;
      case 'Lunch':
        return <Utensils size={18} color="#FF6B35" />;
      case 'Dinner':
        return <Wine size={18} color="#FF6B35" />;
      default:
        return <Utensils size={18} color="#FF6B35" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Events</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B6B6B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#6B6B6B" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <FlatList
        data={events.filter(
          (event) =>
            (!selectedFilter || event.event_type === selectedFilter) &&
            (!searchQuery || event.event_title.toLowerCase().includes(searchQuery.toLowerCase()))
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => router.push(`/events/${item.id}`)}
          >
            <Image
              source={{
                uri: item.image_url,
              }}
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <View style={styles.eventMeta}>
                {getEventTypeIcon(item.event_type)}
                <Text style={styles.eventType}>{item.event_type}</Text>
              </View>
              <Text style={styles.eventTitle}>{item.event_title}</Text>
              <Text style={styles.venueName}>{item.venues.name}</Text>
              <Text
                style={styles.eventDescription}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>{formatDate(item.event_date)}</Text>
                <Text style={styles.eventPrice}>${item.ticket_price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {isLoading ? (
              <Text style={styles.emptyText}>Loading events...</Text>
            ) : (
              <>
                <Text style={styles.emptyText}>No events found</Text>
              </>
            )}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF6B35',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF6B35',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventInfo: {
    padding: 16,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  venueName: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A6A6',
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Inter-Medium',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  resetButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
});