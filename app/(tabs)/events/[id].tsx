
import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, DollarSign, MapPin, Share2 } from 'lucide-react-native';
import { format } from 'date-fns';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Static data for development
  const event = {
    id: '1',
    event_title: 'Tech Conference 2025',
    event_type: 'Conference',
    event_date: '2025-06-15',
    event_time: '10:00 AM',
    ticket_price: 150.0,
    description: 'Join us for an exciting tech conference covering the latest trends in technology.',
    image_url: 'https://via.placeholder.com/500',
    venues: {
      id: '1',
      name: 'Tech Hall',
      address: '123 Tech Street, San Francisco, CA',
      description: 'A modern venue for tech events.',
      logo_url: 'https://via.placeholder.com/100',
    },
  };

  const hasTicket = false;

  const formatDate = (dateString: any) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  const handlePurchaseTicket = () => {
    Alert.alert('Purchase Ticket', 'This feature is currently in development.');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing functionality would be implemented here.');
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ 
          uri: event.image_url || 'https://via.placeholder.com/500',
        }} 
        style={styles.coverImage} 
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eventType}>{event.event_type}</Text>
          <Text style={styles.title}>{event.event_title}</Text>
          
          <View style={styles.venueContainer}>
            <View style={styles.venueHeader}>
              {event.venues.logo_url ? (
                <Image 
                  source={{ uri: event.venues.logo_url }} 
                  style={styles.venueLogo} 
                />
              ) : (
                <View style={[styles.venueLogo, styles.venueLogoPlaceholder]}>
                  <Text style={styles.venueLogoText}>
                    {event.venues.name.charAt(0)}
                  </Text>
                </View>
              )}
              <View style={styles.venueInfo}>
                <Text style={styles.venueName}>{event.venues.name}</Text>
                <View style={styles.addressContainer}>
                  <MapPin size={14} color="#6B6B6B" />
                  <Text style={styles.venueAddress}>{event.venues.address}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={20} color="#FF6B35" />
            <Text style={styles.detailText}>{formatDate(event.event_date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={20} color="#FF6B35" />
            <Text style={styles.detailText}>{event.event_time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <DollarSign size={20} color="#00A6A6" />
            <Text style={[styles.detailText, styles.priceText]}>${event.ticket_price.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>About This Event</Text>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>
        
        <View style={styles.venueDetailsContainer}>
          <Text style={styles.sectionTitle}>About the Venue</Text>
          <Text style={styles.descriptionText}>{event.venues.description}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          {hasTicket ? (
            <View style={styles.ticketPurchased}>
              <Text style={styles.ticketPurchasedText}>You have a ticket for this event!</Text>
              <TouchableOpacity 
                style={styles.viewTicketsButton}
                onPress={() => router.push('/tickets')}
              >
                <Text style={styles.viewTicketsButtonText}>View My Tickets</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.purchaseButton}
              onPress={handlePurchaseTicket}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.purchaseButtonText}>
                  Purchase Ticket (${event.ticket_price.toFixed(2)})
                </Text>
              )}
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Share2 size={20} color="#FF6B35" />
            <Text style={styles.shareButtonText}>Share Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B35',
    marginBottom: 16,
    fontFamily: 'Inter-Medium',
  },
  backButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  coverImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  eventType: {
    fontSize: 16,
    color: '#FF6B35',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  venueContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  venueLogoPlaceholder: {
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  venueLogoText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueAddress: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  detailsContainer: {
    marginBottom: 24,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
  },
  priceText: {
    color: '#00A6A6',
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  venueDetailsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Inter-Medium',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    marginBottom: 24,
  },
  purchaseButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingVertical: 16,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  ticketPurchased: {
    backgroundColor: '#E6FFFF',
    borderWidth: 1,
    borderColor: '#00A6A6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketPurchasedText: {
    fontSize: 16,
    color: '#00A6A6',
    marginBottom: 12,
    fontFamily: 'Inter-Medium',
  },
  viewTicketsButton: {
    backgroundColor: '#00A6A6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewTicketsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});