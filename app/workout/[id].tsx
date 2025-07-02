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
import { ArrowLeft, Play, Clock, Flame, Target, Star, Heart, Share, Bookmark } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const workoutData = {
  1: {
    id: 1,
    title: 'HIIT Cardio Intensif',
    description: 'Un entraînement cardio haute intensité pour brûler un maximum de calories en peu de temps.',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '45 min',
    calories: 350,
    level: 'Intermédiaire',
    equipment: 'Aucun équipement requis',
    coach: {
      name: 'Sarah Martin',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.8,
      experience: '5 ans d\'expérience',
    },
    exercises: [
      {
        id: 1,
        name: 'Jumping Jacks',
        duration: '45 sec',
        rest: '15 sec',
        reps: '3 séries',
        image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
      {
        id: 2,
        name: 'Burpees',
        duration: '30 sec',
        rest: '30 sec',
        reps: '3 séries',
        image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
      {
        id: 3,
        name: 'Mountain Climbers',
        duration: '45 sec',
        rest: '15 sec',
        reps: '3 séries',
        image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
      {
        id: 4,
        name: 'High Knees',
        duration: '30 sec',
        rest: '30 sec',
        reps: '3 séries',
        image: 'https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
    ],
    rating: 4.7,
    reviews: 156,
    tags: ['Cardio', 'HIIT', 'Perte de poids', 'Sans équipement'],
  },
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const workout = workoutData[id as string] || workoutData[1];

  const handleBack = () => {
    router.back();
  };

  const handleStartWorkout = () => {
    router.push(`/workout-session/${workout.id}`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Sharing workout:', workout.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: workout.image }} style={styles.headerImage} />
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

          {/* Play Button */}
          <TouchableOpacity style={styles.playButtonLarge} onPress={handleStartWorkout}>
            <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Stats */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{workout.title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Clock size={16} color="#EC5300" />
                <Text style={styles.statText}>{workout.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Flame size={16} color="#EC5300" />
                <Text style={styles.statText}>{workout.calories} cal</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={16} color="#EC5300" />
                <Text style={styles.statText}>{workout.level}</Text>
              </View>
            </View>
          </View>

          {/* Rating and Actions */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingLeft}>
              <View style={styles.rating}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{workout.rating}</Text>
                <Text style={styles.reviewsText}>({workout.reviews} avis)</Text>
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
            <Image source={{ uri: workout.coach.avatar }} style={styles.coachAvatar} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{workout.coach.name}</Text>
              <Text style={styles.coachExperience}>{workout.coach.experience}</Text>
              <View style={styles.coachRating}>
                <Star size={12} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.coachRatingText}>{workout.coach.rating}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{workout.description}</Text>
          </View>

          {/* Equipment */}
          <View style={styles.equipmentSection}>
            <Text style={styles.sectionTitle}>Équipement</Text>
            <Text style={styles.equipment}>{workout.equipment}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <View style={styles.tags}>
              {workout.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Exercises */}
          <View style={styles.exercisesSection}>
            <Text style={styles.sectionTitle}>Exercices ({workout.exercises.length})</Text>
            {workout.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <Text style={styles.exerciseNumber}>{index + 1}</Text>
                <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseStats}>
                    <Text style={styles.exerciseStat}>{exercise.duration}</Text>
                    <Text style={styles.exerciseStat}>•</Text>
                    <Text style={styles.exerciseStat}>{exercise.reps}</Text>
                    <Text style={styles.exerciseStat}>•</Text>
                    <Text style={styles.exerciseStat}>Repos: {exercise.rest}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.startButtonText}>Commencer la séance</Text>
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
  playButtonLarge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(236, 83, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
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
  },
  coachRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
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
  equipmentSection: {
    marginBottom: 24,
  },
  equipment: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tagsSection: {
    marginBottom: 24,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FEF3E7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  exercisesSection: {
    marginBottom: 100,
  },
  exerciseCard: {
    flexDirection: 'row',
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
  exerciseNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
    marginRight: 16,
    minWidth: 24,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 6,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseStat: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 8,
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
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});