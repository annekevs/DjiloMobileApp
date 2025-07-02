import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Camera } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const reviewCategories = [
  { id: 'equipment', label: 'Équipements', rating: 0 },
  { id: 'cleanliness', label: 'Propreté', rating: 0 },
  { id: 'staff', label: 'Personnel', rating: 0 },
  { id: 'atmosphere', label: 'Ambiance', rating: 0 },
  { id: 'value', label: 'Rapport qualité/prix', rating: 0 },
];

export default function GymReviewScreen() {
  const { id } = useLocalSearchParams();
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState(reviewCategories);
  const [reviewText, setReviewText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gymData = {
    name: 'FitZone Center',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: '15 rue de la Paix, 75001 Paris',
  };

  const handleBack = () => {
    router.back();
  };

  const handleOverallRating = (stars: number) => {
    setOverallRating(stars);
  };

  const handleCategoryRating = (categoryId: string, stars: number) => {
    setCategoryRatings(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, rating: stars } : cat
      )
    );
  };

  const handleAddPhoto = () => {
    // Simulate photo selection
    const newPhoto = 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400';
    setSelectedImages(prev => [...prev, newPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      alert('Veuillez donner une note globale');
      return;
    }

    if (!reviewText.trim()) {
      alert('Veuillez écrire votre avis');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/review-success');
    }, 1500);
  };

  const getAverageRating = () => {
    const totalRatings = categoryRatings.filter(cat => cat.rating > 0);
    if (totalRatings.length === 0) return 0;
    return totalRatings.reduce((sum, cat) => sum + cat.rating, 0) / totalRatings.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un avis</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Gym Info */}
        <View style={styles.gymSection}>
          <Image source={{ uri: gymData.image }} style={styles.gymImage} />
          <View style={styles.gymInfo}>
            <Text style={styles.gymName}>{gymData.name}</Text>
            <Text style={styles.gymAddress}>{gymData.address}</Text>
          </View>
        </View>

        {/* Overall Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Note globale</Text>
          <Text style={styles.sectionSubtitle}>Comment évaluez-vous cette salle ?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleOverallRating(star)}
                style={styles.starButton}
              >
                <Star
                  size={40}
                  color={star <= overallRating ? "#F59E0B" : "#E5E7EB"}
                  fill={star <= overallRating ? "#F59E0B" : "transparent"}
                />
              </TouchableOpacity>
            ))}
          </View>
          {overallRating > 0 && (
            <Text style={styles.ratingText}>
              {overallRating === 1 && "Très décevant"}
              {overallRating === 2 && "Décevant"}
              {overallRating === 3 && "Correct"}
              {overallRating === 4 && "Très bien"}
              {overallRating === 5 && "Excellent"}
            </Text>
          )}
        </View>

        {/* Category Ratings */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Évaluation détaillée</Text>
          <Text style={styles.sectionSubtitle}>Notez différents aspects de la salle</Text>
          
          {categoryRatings.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Text style={styles.categoryLabel}>{category.label}</Text>
              <View style={styles.categoryStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleCategoryRating(category.id, star)}
                    style={styles.categoryStarButton}
                  >
                    <Star
                      size={20}
                      color={star <= category.rating ? "#F59E0B" : "#E5E7EB"}
                      fill={star <= category.rating ? "#F59E0B" : "transparent"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Votre avis</Text>
          <Text style={styles.sectionSubtitle}>
            Partagez votre expérience dans cette salle de sport
          </Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Décrivez votre expérience, les points positifs et négatifs..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.characterCount}>{reviewText.length}/500</Text>
        </View>

        {/* Photos */}
        <View style={styles.photosSection}>
          <Text style={styles.sectionTitle}>Photos (optionnel)</Text>
          <Text style={styles.sectionSubtitle}>
            Ajoutez des photos de la salle, des équipements, etc.
          </Text>
          
          <View style={styles.photosGrid}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: image }} style={styles.selectedPhoto} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <Text style={styles.removePhotoText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            {selectedImages.length < 5 && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
                <Camera size={24} color="#EC5300" />
                <Text style={styles.addPhotoText}>Ajouter une photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.guidelinesTitle}>📝 Conseils pour un bon avis</Text>
          <Text style={styles.guidelinesText}>
            • Soyez honnête et constructif{'\n'}
            • Mentionnez les équipements disponibles{'\n'}
            • Parlez de l'accueil et du service{'\n'}
            • Respectez les autres utilisateurs{'\n'}
            • Évitez les commentaires personnels
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.submitButton, (!overallRating || !reviewText.trim()) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!overallRating || !reviewText.trim() || isSubmitting}
        >
          <LinearGradient
            colors={(!overallRating || !reviewText.trim()) ? ['#9CA3AF', '#9CA3AF'] : ['#EC5300', '#FF6B35']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Publication...' : 'Publier mon avis'}
            </Text>
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
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gymSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 24,
  },
  gymImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  gymInfo: {
    flex: 1,
  },
  gymName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  gymAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  ratingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    flex: 1,
  },
  categoryStars: {
    flexDirection: 'row',
    gap: 4,
  },
  categoryStarButton: {
    padding: 2,
  },
  reviewSection: {
    marginBottom: 32,
  },
  reviewInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  photosSection: {
    marginBottom: 32,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
  },
  selectedPhoto: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  addPhotoText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginTop: 4,
    textAlign: 'center',
  },
  guidelinesSection: {
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 120,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  guidelinesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});