import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Clock, Flame, Target, Star, Share, Chrome as Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const sessionStats = {
  duration: '42:15',
  calories: 320,
  exercises: 8,
  sets: 24,
  rating: 0,
};

export default function WorkoutCompleteScreen() {
  const [rating, setRating] = React.useState(0);

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const handleShare = () => {
    console.log('Sharing workout results');
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleViewProgress = () => {
    router.push('/(tabs)/activity');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Trophy size={80} color="#F59E0B" />
          <Text style={styles.title}>Séance terminée !</Text>
          <Text style={styles.subtitle}>Excellent travail aujourd'hui</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Clock size={24} color="#EC5300" />
              <Text style={styles.statValue}>{sessionStats.duration}</Text>
              <Text style={styles.statLabel}>Durée</Text>
            </View>
            <View style={styles.statCard}>
              <Flame size={24} color="#EC5300" />
              <Text style={styles.statValue}>{sessionStats.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Target size={24} color="#EC5300" />
              <Text style={styles.statValue}>{sessionStats.exercises}</Text>
              <Text style={styles.statLabel}>Exercices</Text>
            </View>
            <View style={styles.statCard}>
              <Trophy size={24} color="#EC5300" />
              <Text style={styles.statValue}>{sessionStats.sets}</Text>
              <Text style={styles.statLabel}>Séries</Text>
            </View>
          </View>
        </View>

        {/* Achievement */}
        <View style={styles.achievementCard}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.achievementGradient}
          >
            <Trophy size={32} color="#FFFFFF" />
            <Text style={styles.achievementTitle}>Nouveau record !</Text>
            <Text style={styles.achievementText}>
              Vous avez battu votre record de calories brûlées
            </Text>
          </LinearGradient>
        </View>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Comment s'est passée votre séance ?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <Star
                  size={32}
                  color={star <= rating ? "#F59E0B" : "#9CA3AF"}
                  fill={star <= rating ? "#F59E0B" : "transparent"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Message */}
        <View style={styles.progressMessage}>
          <Text style={styles.progressTitle}>Continuez sur cette lancée !</Text>
          <Text style={styles.progressText}>
            Vous avez complété 3 séances cette semaine. Plus que 2 pour atteindre votre objectif.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share size={20} color="#EC5300" />
            <Text style={styles.shareButtonText}>Partager</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.progressButton} onPress={handleViewProgress}>
            <Text style={styles.progressButtonText}>Voir mes progrès</Text>
          </TouchableOpacity>
        </View>

        {/* Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.homeButtonGradient}
          >
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  achievementCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementGradient: {
    padding: 20,
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  ratingSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  ratingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  progressMessage: {
    backgroundColor: '#F0FDF4',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  progressButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
  },
  progressButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  homeButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },
  homeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});