import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Clock, Star, Phone, Globe, Heart, Share, Bookmark, Wifi, Car, Waves, Dumbbell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const gymData = {
  1: {
    id: 1,
    name: 'FitZone Center',
    description: 'Salle de sport moderne et complète avec équipements dernière génération. Espace de 2000m² avec piscine, sauna et cours collectifs.',
    images: [
      'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    address: '15 rue de la Paix, 75001 Paris',
    distance: '0.8 km',
    rating: 4.6,
    reviews: 324,
    openHours: '6h00 - 23h00',
    phone: '+33 1 42 86 17 20',
    website: 'www.fitzone-center.fr',
    price: '49€/mois',
    amenities: [
      { name: 'Piscine', icon: Waves, available: true },
      { name: 'Sauna', icon: null, available: true },
      { name: 'Parking', icon: Car, available: true },
      { name: 'WiFi gratuit', icon: Wifi, available: true },
      { name: 'Musculation', icon: Dumbbell, available: true },
      { name: 'Cours collectifs', icon: null, available: true },
    ],
    schedule: [
      { day: 'Lundi - Vendredi', hours: '6h00 - 23h00' },
      { day: 'Samedi', hours: '8h00 - 22h00' },
      { day: 'Dimanche', hours: '9h00 - 20h00' },
    ],
    classes: [
      {
        id: 1,
        name: 'Yoga',
        instructor: 'Lisa Martin',
        time: '18h30',
        duration: '60 min',
        spots: 12,
        maxSpots: 15,
      },
      {
        id: 2,
        name: 'HIIT',
        instructor: 'Marc Dubois',
        time: '19h45',
        duration: '45 min',
        spots: 8,
        maxSpots: 12,
      },
    ],
    reviews_list: [
      {
        id: 1,
        name: 'Sophie L.',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        comment: 'Excellente salle ! Équipements modernes et personnel très accueillant.',
        date: '1 semaine',
      },
      {
        id: 2,
        name: 'Pierre M.',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4,
        comment: 'Très bien équipée, la piscine est un plus. Un peu cher mais ça vaut le coup.',
        date: '2 semaines',
      },
    ],
  },
};

export default function GymDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const gym = gymData[id as string] || gymData[1];

  const handleBack = () => {
    router.back();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Sharing gym:', gym.name);
  };

  const handleCall = () => {
    console.log('Calling gym:', gym.phone);
  };

  const handleWebsite = () => {
    console.log('Opening website:', gym.website);
  };

  const handleGetDirections = () => {
    console.log('Getting directions to:', gym.address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Images */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {gym.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.headerImage} />
            ))}
          </ScrollView>
          
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          
          {/* Header Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={handleBookmark}
              >
                <Bookmark 
                  size={24} 
                  color="#FFFFFF" 
                  fill={isBookmarked ? "#FFFFFF" : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
                <Share size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {gym.images.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.indicatorActive
                ]} 
              />
            ))}
          </View>

          {/* Distance Badge */}
          <View style={styles.distanceBadge}>
            <MapPin size={12} color="#FFFFFF" />
            <Text style={styles.distanceText}>{gym.distance}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{gym.name}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{gym.rating}</Text>
                <Text style={styles.reviewsText}>({gym.reviews} avis)</Text>
              </View>
              <TouchableOpacity 
                style={[styles.likeButton, isLiked && styles.likeButtonActive]} 
                onPress={handleLike}
              >
                <Heart 
                  size={20} 
                  color={isLiked ? "#FFFFFF" : "#EC5300"} 
                  fill={isLiked ? "#FFFFFF" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Info */}
          <View style={styles.quickInfoSection}>
            <View style={styles.quickInfoItem}>
              <MapPin size={16} color="#EC5300" />
              <Text style={styles.quickInfoText}>{gym.address}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Clock size={16} color="#EC5300" />
              <Text style={styles.quickInfoText}>{gym.openHours}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Phone size={20} color="#EC5300" />
              <Text style={styles.actionButtonText}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
              <Globe size={20} color="#EC5300" />
              <Text style={styles.actionButtonText}>Site web</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonPrimary} onPress={handleGetDirections}>
              <MapPin size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonPrimaryText}>Itinéraire</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.description}>{gym.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Équipements & Services</Text>
            <View style={styles.amenitiesGrid}>
              {gym.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <View style={styles.amenityIcon}>
                    {amenity.icon ? (
                      <amenity.icon size={20} color="#EC5300" />
                    ) : (
                      <View style={styles.amenityIconPlaceholder}>
                        <Text style={styles.amenityIconText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.amenityText}>{amenity.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Schedule */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Horaires d'ouverture</Text>
            {gym.schedule.map((schedule, index) => (
              <View key={index} style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>{schedule.day}</Text>
                <Text style={styles.scheduleHours}>{schedule.hours}</Text>
              </View>
            ))}
          </View>

          {/* Today's Classes */}
          <View style={styles.classesSection}>
            <Text style={styles.sectionTitle}>Cours d'aujourd'hui</Text>
            {gym.classes.map((classItem) => (
              <View key={classItem.id} style={styles.classCard}>
                <View style={styles.classLeft}>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <Text style={styles.classInstructor}>avec {classItem.instructor}</Text>
                  <Text style={styles.classTime}>{classItem.time} • {classItem.duration}</Text>
                </View>
                <View style={styles.classRight}>
                  <Text style={styles.classSpots}>
                    {classItem.spots}/{classItem.maxSpots} places
                  </Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Avis récents</Text>
            {gym.reviews_list.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} color="#FCD34D" fill="#FCD34D" />
                      ))}
                    </View>
                    <Text style={styles.reviewDate}>Il y a {review.date}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>À partir de</Text>
          <Text style={styles.price}>{gym.price}</Text>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.joinButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.joinButtonText}>Rejoindre</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: width,
    height: 300,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  likeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButtonActive: {
    backgroundColor: '#EC5300',
  },
  quickInfoSection: {
    marginBottom: 20,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickInfoText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginLeft: 6,
  },
  actionButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC5300',
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  amenitiesSection: {
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amenityIconPlaceholder: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityIconText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
  },
  scheduleSection: {
    marginBottom: 24,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleDay: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  scheduleHours: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  classesSection: {
    marginBottom: 24,
  },
  classCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  classLeft: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  classInstructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  classTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  classRight: {
    alignItems: 'flex-end',
  },
  classSpots: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceSection: {
    flex: 1,
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  joinButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});