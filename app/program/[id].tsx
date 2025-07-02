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
import { ArrowLeft, Clock, Users, Star, Calendar, Play, Heart, Share, Bookmark, Trophy, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const programData = {
  1: {
    id: 1,
    title: 'Bootcamp Minceur',
    description: 'Programme intensif de 8 semaines conçu pour une perte de poids rapide et durable. Combinaison d\'exercices cardio et de renforcement musculaire.',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8 semaines',
    participants: 156,
    rating: 4.8,
    price: '39€/mois',
    isPaid: true,
    level: 'Intermédiaire',
    coach: {
      name: 'Coach Alexandre',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.9,
      experience: '8 ans d\'expérience',
      specialties: ['Perte de poids', 'HIIT', 'Nutrition'],
    },
    features: [
      'Plan d\'entraînement personnalisé',
      'Suivi nutritionnel inclus',
      'Sessions de groupe 3x/semaine',
      'Accès à l\'app mobile',
      'Support coach 7j/7',
    ],
    workouts: [
      {
        id: 1,
        week: 1,
        title: 'Semaine 1 - Mise en route',
        sessions: [
          { day: 'Lundi', title: 'Cardio HIIT', duration: '30 min' },
          { day: 'Mercredi', title: 'Renforcement', duration: '45 min' },
          { day: 'Vendredi', title: 'Circuit training', duration: '40 min' },
        ],
      },
      {
        id: 2,
        week: 2,
        title: 'Semaine 2 - Intensification',
        sessions: [
          { day: 'Lundi', title: 'HIIT Avancé', duration: '35 min' },
          { day: 'Mercredi', title: 'Force & Cardio', duration: '50 min' },
          { day: 'Vendredi', title: 'Bootcamp', duration: '45 min' },
        ],
      },
    ],
    results: {
      averageWeightLoss: '5-8 kg',
      completionRate: '87%',
      satisfaction: '4.8/5',
    },
    testimonials: [
      {
        id: 1,
        name: 'Marie L.',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        comment: 'Programme fantastique ! J\'ai perdu 7kg en 8 semaines.',
        date: '2 semaines',
      },
      {
        id: 2,
        name: 'Thomas K.',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        comment: 'Coach Alexandre est exceptionnel, très motivant !',
        date: '1 mois',
      },
    ],
  },
};

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  const program = programData[id as string] || programData[1];

  const handleBack = () => {
    router.back();
  };

  const handleSubscribe = () => {
    console.log('Subscribing to program:', program.title);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Sharing program:', program.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: program.image }} style={styles.headerImage} />
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

          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{program.price}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Stats */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{program.title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Calendar size={16} color="#EC5300" />
                <Text style={styles.statText}>{program.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={16} color="#EC5300" />
                <Text style={styles.statText}>{program.participants} inscrits</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={16} color="#EC5300" />
                <Text style={styles.statText}>{program.level}</Text>
              </View>
            </View>
          </View>

          {/* Rating and Actions */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingLeft}>
              <View style={styles.rating}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{program.rating}</Text>
                <Text style={styles.reviewsText}>({program.participants} avis)</Text>
              </View>
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

          {/* Coach Info */}
          <View style={styles.coachSection}>
            <Image source={{ uri: program.coach.avatar }} style={styles.coachAvatar} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{program.coach.name}</Text>
              <Text style={styles.coachExperience}>{program.coach.experience}</Text>
              <View style={styles.coachRating}>
                <Star size={12} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.coachRatingText}>{program.coach.rating}</Text>
              </View>
              <View style={styles.specialties}>
                {program.coach.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialty}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>À propos du programme</Text>
            <Text style={styles.description}>{program.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Ce qui est inclus</Text>
            {program.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureCheck}>✓</Text>
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Résultats moyens</Text>
            <View style={styles.resultsGrid}>
              <View style={styles.resultCard}>
                <Trophy size={24} color="#EC5300" />
                <Text style={styles.resultValue}>{program.results.averageWeightLoss}</Text>
                <Text style={styles.resultLabel}>Perte de poids</Text>
              </View>
              <View style={styles.resultCard}>
                <Target size={24} color="#10B981" />
                <Text style={styles.resultValue}>{program.results.completionRate}</Text>
                <Text style={styles.resultLabel}>Taux de réussite</Text>
              </View>
              <View style={styles.resultCard}>
                <Star size={24} color="#F59E0B" />
                <Text style={styles.resultValue}>{program.results.satisfaction}</Text>
                <Text style={styles.resultLabel}>Satisfaction</Text>
              </View>
            </View>
          </View>

          {/* Program Schedule */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Programme d'entraînement</Text>
            <View style={styles.weekSelector}>
              {program.workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  style={[
                    styles.weekButton,
                    selectedWeek === workout.week && styles.weekButtonActive
                  ]}
                  onPress={() => setSelectedWeek(workout.week)}
                >
                  <Text style={[
                    styles.weekButtonText,
                    selectedWeek === workout.week && styles.weekButtonTextActive
                  ]}>
                    Semaine {workout.week}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {program.workouts
              .filter(w => w.week === selectedWeek)
              .map((workout) => (
                <View key={workout.id} style={styles.weekContent}>
                  <Text style={styles.weekTitle}>{workout.title}</Text>
                  {workout.sessions.map((session, index) => (
                    <View key={index} style={styles.sessionCard}>
                      <View style={styles.sessionLeft}>
                        <Text style={styles.sessionDay}>{session.day}</Text>
                        <Text style={styles.sessionTitle}>{session.title}</Text>
                      </View>
                      <View style={styles.sessionRight}>
                        <Text style={styles.sessionDuration}>{session.duration}</Text>
                        <TouchableOpacity style={styles.sessionPlay}>
                          <Play size={16} color="#EC5300" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
          </View>

          {/* Testimonials */}
          <View style={styles.testimonialsSection}>
            <Text style={styles.sectionTitle}>Témoignages</Text>
            {program.testimonials.map((testimonial) => (
              <View key={testimonial.id} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image source={{ uri: testimonial.avatar }} style={styles.testimonialAvatar} />
                  <View style={styles.testimonialInfo}>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <View style={styles.testimonialRating}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} color="#FCD34D" fill="#FCD34D" />
                      ))}
                    </View>
                    <Text style={styles.testimonialDate}>Il y a {testimonial.date}</Text>
                  </View>
                </View>
                <Text style={styles.testimonialComment}>{testimonial.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.subscribeButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.subscribeButtonText}>S'inscrire au programme</Text>
            <Text style={styles.subscribeButtonPrice}>{program.price}</Text>
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
    width: '100%',
    height: '100%',
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
  priceBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#EC5300',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
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
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingLeft: {
    flex: 1,
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
  coachSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  coachAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  coachExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  coachRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coachRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialty: {
    backgroundColor: '#FEF3E7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
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
  featuresSection: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureCheck: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  scheduleSection: {
    marginBottom: 24,
  },
  weekSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  weekButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  weekButtonActive: {
    backgroundColor: '#EC5300',
  },
  weekButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
  },
  weekContent: {
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionLeft: {
    flex: 1,
  },
  sessionDay: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginBottom: 4,
  },
  sessionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  sessionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 12,
  },
  sessionPlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialsSection: {
    marginBottom: 100,
  },
  testimonialCard: {
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
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  testimonialRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  testimonialDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  testimonialComment: {
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  subscribeButtonPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});