import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, Car, Wifi, Waves } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 1, name: 'Tous', active: true },
  { id: 2, name: 'Proche', active: false },
  { id: 3, name: 'Premium', active: false },
  { id: 4, name: 'Piscine', active: false },
  { id: 5, name: 'Parking', active: false },
];

const allGyms = [
  {
    id: 1,
    name: 'FitZone Center',
    address: '15 rue de la Paix, Paris',
    distance: '0.8 km',
    rating: 4.6,
    reviews: 324,
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '6h-23h',
    price: '49€/mois',
    amenities: ['Piscine', 'Sauna', 'Parking', 'WiFi'],
    category: 'Premium',
  },
  {
    id: 2,
    name: 'Urban Fitness',
    address: '42 avenue des Sports',
    distance: '1.2 km',
    rating: 4.4,
    reviews: 198,
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '7h-22h',
    price: '39€/mois',
    amenities: ['CrossFit', 'Cours collectifs', 'Parking'],
    category: 'Standard',
  },
  {
    id: 3,
    name: 'AquaFit Club',
    address: '8 boulevard de la Mer',
    distance: '2.1 km',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '6h-22h',
    price: '59€/mois',
    amenities: ['Piscine olympique', 'Spa', 'Parking', 'WiFi'],
    category: 'Premium',
  },
  {
    id: 4,
    name: 'Basic Gym',
    address: '23 rue du Sport',
    distance: '0.5 km',
    rating: 4.2,
    reviews: 89,
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '24h/24',
    price: '29€/mois',
    amenities: ['Musculation', 'Cardio'],
    category: 'Standard',
  },
  {
    id: 5,
    name: 'Elite Sports Center',
    address: '156 avenue de la République',
    distance: '3.2 km',
    rating: 4.7,
    reviews: 267,
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '5h-24h',
    price: '69€/mois',
    amenities: ['Piscine', 'Spa', 'Tennis', 'Parking', 'WiFi'],
    category: 'Premium',
  },
  {
    id: 6,
    name: 'Neighborhood Fit',
    address: '67 rue de la Santé',
    distance: '1.8 km',
    rating: 4.3,
    reviews: 134,
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=500',
    openHours: '6h-23h',
    price: '35€/mois',
    amenities: ['Cours collectifs', 'Yoga', 'WiFi'],
    category: 'Standard',
  },
];

export default function GymsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);

  const handleBack = () => {
    router.back();
  };

  const handleGymPress = (gym: any) => {
    router.push(`/gym/${gym.id}`);
  };

  const getFilteredGyms = () => {
    let filtered = allGyms;
    
    // Filter by category
    if (activeCategory !== 1) {
      const categoryName = categories.find(c => c.id === activeCategory)?.name;
      if (categoryName === 'Proche') {
        filtered = filtered.filter(g => parseFloat(g.distance) <= 1.5);
      } else if (categoryName === 'Premium') {
        filtered = filtered.filter(g => g.category === 'Premium');
      } else if (categoryName === 'Piscine') {
        filtered = filtered.filter(g => g.amenities.some(a => a.toLowerCase().includes('piscine')));
      } else if (categoryName === 'Parking') {
        filtered = filtered.filter(g => g.amenities.includes('Parking'));
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(gym => 
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('piscine')) return Waves;
    if (amenity.toLowerCase().includes('parking')) return Car;
    if (amenity.toLowerCase().includes('wifi')) return Wifi;
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Salles de sport</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#EC5300" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une salle..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Gyms List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.gymsList}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {getFilteredGyms().length} salles trouvées
          </Text>
        </View>
        
        {getFilteredGyms().map((gym) => (
          <TouchableOpacity
            key={gym.id}
            style={styles.gymCard}
            onPress={() => handleGymPress(gym)}
          >
            <Image source={{ uri: gym.image }} style={styles.gymImage} />
            <View style={styles.gymContent}>
              <View style={styles.gymHeader}>
                <Text style={styles.gymName}>{gym.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FCD34D" fill="#FCD34D" />
                  <Text style={styles.ratingText}>{gym.rating}</Text>
                  <Text style={styles.reviewsText}>({gym.reviews})</Text>
                </View>
              </View>
              
              <View style={styles.gymLocation}>
                <MapPin size={14} color="#9CA3AF" />
                <Text style={styles.addressText}>{gym.address}</Text>
                <Text style={styles.distanceText}>{gym.distance}</Text>
              </View>
              
              <View style={styles.gymHours}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.hoursText}>{gym.openHours}</Text>
              </View>
              
              <View style={styles.amenitiesContainer}>
                {gym.amenities.slice(0, 3).map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <View key={index} style={styles.amenityTag}>
                      {IconComponent && <IconComponent size={12} color="#EC5300" />}
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  );
                })}
                {gym.amenities.length > 3 && (
                  <Text style={styles.moreAmenities}>+{gym.amenities.length - 3}</Text>
                )}
              </View>
              
              <View style={styles.gymFooter}>
                <Text style={styles.priceText}>{gym.price}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{gym.category}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#EC5300',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  gymsList: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  gymCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gymImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gymContent: {
    padding: 16,
  },
  gymHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  gymName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 2,
  },
  gymLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  gymHours: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hoursText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3E7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginLeft: 4,
  },
  moreAmenities: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  gymFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});