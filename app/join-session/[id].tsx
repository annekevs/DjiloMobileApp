import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, Heart, Share } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const sessionData = {
  1: {
    id: 1,
    title: 'Bootcamp Minceur - Session Intensive',
    description: 'Session de groupe pour brûler un maximum de calories avec des exercices variés et motivants.',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-25',
    time: '18:30',
    duration: '60 min',
    location: 'FitZone Center - Salle 2',
    address: '15 rue de la Paix, 75001 Paris',
    maxParticipants: 15,
    currentParticipants: 8,
    price: '25€',
    coach: {
      name: 'Coach Alexandre',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.9,
      experience: '8 ans d\'expérience',
    },
    level: 'Intermédiaire',
    equipment: 'Fourni sur place',
    participants: [
      {
        id: 1,
        name: 'Marie L.',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 2,
        name: 'Thomas K.',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 3,
        name: 'Sophie M.',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
    program: [
      'Échauffement dynamique (10 min)',
      'Circuit HIIT (30 min)',
      'Renforcement musculaire (15 min)',
      'Étirements et récupération (5 min)',
    ],
  },
};

export default function JoinSessionScreen() {
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  const session = sessionData[id as string] || sessionData[1];

  const handleBack = () => {
    router.back();
  };

  const handleJoinSession = () => {
    setIsJoined(true);
    // Simulate joining the session
    setTimeout(() => {
      router.push('/session-confirmed');
    }, 1000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Sharing session:', session.title);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const spotsRemaining = session.maxParticipants - session.currentParticipants;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: session.image }} style={styles.headerImage} />
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
                onPress={handleLike}
              >
                <Heart 
                  size={24} 
                  color="#FFFFFF" 
                  fill={isLiked ? "#FFFFFF" : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
                <Share size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{session.price}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{session.title}</Text>
            <View style={styles.sessionInfo}>
              <View style={styles.infoItem}>
                <Calendar size={16} color="#EC5300" />
                <Text style={styles.infoText}>{formatDate(session.date)}</Text>
              </View>
              <View style={styles.infoItem}>
                <Clock size={16} color="#EC5300" />
                <Text style={styles.infoText}>{session.time} • {session.duration}</Text>
              </View>
              <View style={styles.infoItem}>
                <MapPin size={16} color="#EC5300" />
                <Text style={styles.infoText}>{session.location}</Text>
              </View>
            </View>
          </View>

          {/* Participants */}
          <View style={styles.participantsSection}>
            <View style={styles.participantsHeader}>
              <Text style={styles.sectionTitle}>Participants</Text>
              <Text style={styles.participantsCount}>
                {session.currentParticipants}/{session.maxParticipants}
              </Text>
            </View>
            <View style={styles.participantsList}>
              {session.participants.map((participant) => (
                <Image 
                  key={participant.id} 
                  source={{ uri: participant.avatar }} 
                  style={styles.participantAvatar} 
                />
              ))}
              <View style={styles.spotsRemaining}>
                <Text style={styles.spotsText}>+{spotsRemaining}</Text>
              </View>
            </View>
            <Text style={styles.spotsRemainingText}>
              {spotsRemaining} places restantes
            </Text>
          </View>

          {/* Coach Info */}
          <View style={styles.coachSection}>
            <Image source={{ uri: session.coach.avatar }} style={styles.coachAvatar} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{session.coach.name}</Text>
              <Text style={styles.coachExperience}>{session.coach.experience}</Text>
              <View style={styles.coachRating}>
                <Star size={12} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.coachRatingText}>{session.coach.rating}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{session.description}</Text>
          </View>

          {/* Program */}
          <View style={styles.programSection}>
            <Text style={styles.sectionTitle}>Programme de la séance</Text>
            {session.program.map((item, index) => (
              <View key={index} style={styles.programItem}>
                <View style={styles.programNumber}>
                  <Text style={styles.programNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.programText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Session Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Détails</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Niveau :</Text>
              <Text style={styles.detailValue}>{session.level}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Équipement :</Text>
              <Text style={styles.detailValue}>{session.equipment}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Adresse :</Text>
              <Text style={styles.detailValue}>{session.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Join Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.joinButton, isJoined && styles.joinButtonDisabled]} 
          onPress={handleJoinSession}
          disabled={isJoined}
        >
          <LinearGradient
            colors={isJoined ? ['#10B981', '#059669'] : ['#EC5300', '#FF6B35']}
            style={styles.joinButtonGradient}
          >
            <Text style={styles.joinButtonText}>
              {isJoined ? 'Inscription confirmée ✓' : `Rejoindre la séance • ${session.price}`}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  sessionInfo: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  participantsSection: {
    marginBottom: 24,
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  participantsCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  participantsList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  spotsRemaining: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotsText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  spotsRemainingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
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
    fontSize: 16,
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
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  programSection: {
    marginBottom: 24,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  programNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EC5300',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  programNumberText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  programText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
  },
  detailsSection: {
    marginBottom: 100,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
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
  joinButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  joinButtonDisabled: {
    opacity: 0.8,
  },
  joinButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});