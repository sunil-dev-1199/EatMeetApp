
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Coffee, Utensils, Wine } from 'lucide-react-native';
import { format } from 'date-fns';

export default function HomeScreen() {
  const router = useRouter();
  
 
  const session = {
    user: {
      id: 'user-id',  
      email: 'test@domain.com',  
    },
  };

  const userId = session?.user?.id;

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: '1',
      event_title: 'Breakfast Meetup',
      event_type: 'Breakfast',
      event_date: '2025-05-12T08:00:00Z',
      event_time: '08:00 AM',
      ticket_price: 25.0,
      image_url: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
      venues: { name: 'Cafe Delight', address: '123 Main St' },
    },
    {
      id: '2',
      event_title: 'Lunch at Park',
      event_type: 'Lunch',
      event_date: '2025-05-13T12:00:00Z',
      event_time: '12:00 PM',
      ticket_price: 30.0,
      image_url: 'https://images.pexels.com/photos/1205039/pexels-photo-1205039.jpeg',
      venues: { name: 'Park Plaza', address: '456 Park Ave' },
    },
  ];

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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Eat Meet Club</Text>
      </View>

      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Explore by Category</Text>
        <View style={styles.categories}>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push({ pathname: '/events', params: { filter: 'Breakfast' } })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#FFF1EB' }]}>
              <Coffee size={24} color="#FF6B35" />
            </View>
            <Text style={styles.categoryLabel}>Breakfast</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push({ pathname: '/events', params: { filter: 'Lunch' } })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#E6FFFF' }]}>
              <Utensils size={24} color="#00A6A6" />
            </View>
            <Text style={styles.categoryLabel}>Lunch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push({ pathname: '/events', params: { filter: 'Dinner' } })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#F2F2F2' }]}>
              <Wine size={24} color="#4D4D4D" />
            </View>
            <Text style={styles.categoryLabel}>Dinner</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.upcomingSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => router.push('/events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <TouchableOpacity 
              key={event.id}
              style={styles.eventCard}
              onPress={() => router.push(`/events/${event.id}`)}
            >
              <Image 
                source={{ 
                  uri: event.image_url || 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg'
                }} 
                style={styles.eventImage} 
              />
              <View style={styles.eventInfo}>
                <View style={styles.eventMeta}>
                  {getEventTypeIcon(event.event_type)}
                  <Text style={styles.eventType}>{event.event_type}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.event_title}</Text>
                <Text style={styles.venueName}>{event.venues.name}</Text>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventDate}>{formatDate(event.event_date)}</Text>
                  <Text style={styles.eventPrice}>${event.ticket_price.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No upcoming events found</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/events')}
            >
              <Text style={styles.browseButtonText}>Browse All Events</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
  welcomeText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 4,
    fontFamily: 'Inter-Bold',
  },
  categorySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Inter-Medium',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    alignItems: 'center',
    width: '30%',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  upcomingSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF6B35',
    fontFamily: 'Inter-Medium',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
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
  noEventsContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
  },
  noEventsText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  browseButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
});
