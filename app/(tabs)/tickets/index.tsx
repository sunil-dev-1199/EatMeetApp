
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { Calendar, MapPin, QrCode, Ticket } from 'lucide-react-native';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

// Static data for session and tickets
const session = {
  user: {
    id: 'user123',
    email: 'user@example.com',
  },
};

const tickets = [
  {
    id: 'ticket1',
    event_id: 'event1',
    purchase_date: '2025-05-01T10:00:00Z',
    payment_status: 'paid',
    events: {
      id: 'event1',
      event_title: 'Spring Festival',
      event_type: 'Festival',
      event_date: '2025-05-15T00:00:00Z',
      event_time: '6:00 PM',
      image_url: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
      venues: {
        name: 'Central Park',
        address: '123 Main St, Cityville',
      },
    },
  },
  {
    id: 'ticket2',
    event_id: 'event2',
    purchase_date: '2025-04-20T14:30:00Z',
    payment_status: 'paid',
    events: {
      id: 'event2',
      event_title: 'Jazz Night',
      event_type: 'Concert',
      event_date: '2025-06-01T00:00:00Z',
      event_time: '8:00 PM',
      image_url: null,
      venues: {
        name: 'Blue Note Club',
        address: '456 Jazz St, Music City',
      },
    },
  },
];

export default function TicketsScreen() {
  const router = useRouter();
  const userId = session?.user?.id;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refetch
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (dateString: any) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatEventDate = (dateString: any) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={styles.ticketBadge}>
                <Ticket size={16} color="#fff" />
                <Text style={styles.ticketBadgeText}>Paid</Text>
              </View>
              <Text style={styles.purchaseDate}>
                Purchased on {formatDate(item.purchase_date)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.eventContent}
              onPress={() => router.push(`/events/${item.events.id}`)}
            >
              <Image
                source={{
                  uri: item.events.image_url || 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
                }}
                style={styles.eventImage}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventType}>{item.events.event_type}</Text>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {item.events.event_title}
                </Text>

                <View style={styles.eventMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color="#6B6B6B" />
                    <Text style={styles.metaText}>
                      {formatEventDate(item.events.event_date)}
                    </Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Text style={styles.metaText}>{item.events.event_time}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <MapPin size={14} color="#6B6B6B" />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {item.events.venues.name}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewTicketButton}>
              <QrCode size={18} color="#FF6B35" />
              <Text style={styles.viewTicketText}>View Ticket QR Code</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ticket size={64} color="#E5E5E5" />
            <Text style={styles.emptyTitle}>No Tickets Yet</Text>
            <Text style={styles.emptyText}>
              You haven't purchased any tickets. Browse events to find something you'd like to attend!
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/events')}
            >
              <Text style={styles.browseButtonText}>Browse Events</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={tickets?.length ? styles.list : styles.emptyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged
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
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  ticketBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A6A6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  ticketBadgeText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  purchaseDate: {
    fontSize: 12,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  eventContent: {
    flexDirection: 'row',
    padding: 12,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  eventType: {
    fontSize: 12,
    color: '#FF6B35',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  eventMeta: {
    gap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  viewTicketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFF1EB',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  viewTicketText: {
    color: '#FF6B35',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '80%',
    fontFamily: 'Inter-Regular',
  },
  browseButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
});