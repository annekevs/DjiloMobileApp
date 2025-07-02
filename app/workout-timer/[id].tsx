import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw, CircleCheck as CheckCircle, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const workoutData = {
  1: {
    id: 1,
    title: 'HIIT Cardio Intensif',
    totalDuration: 45 * 60, // 45 minutes in seconds
    exercises: [
      {
        id: 1,
        name: 'Jumping Jacks',
        duration: 45,
        rest: 15,
        sets: 3,
        currentSet: 1,
        image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=400',
        instructions: 'Sautez en écartant les jambes et en levant les bras au-dessus de la tête. Gardez le rythme constant.',
        tips: 'Atterrissez en douceur sur la pointe des pieds',
      },
      {
        id: 2,
        name: 'Burpees',
        duration: 30,
        rest: 30,
        sets: 3,
        currentSet: 1,
        image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
        instructions: 'Position planche, saut vers les pieds, saut vertical avec les bras en l\'air, répétez.',
        tips: 'Gardez le dos droit pendant la planche',
      },
      {
        id: 3,
        name: 'Mountain Climbers',
        duration: 45,
        rest: 15,
        sets: 3,
        currentSet: 1,
        image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400',
        instructions: 'Position planche, alternez rapidement les genoux vers la poitrine.',
        tips: 'Maintenez les hanches stables',
      },
      {
        id: 4,
        name: 'High Knees',
        duration: 30,
        rest: 20,
        sets: 2,
        currentSet: 1,
        image: 'https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&cs=tinysrgb&w=400',
        instructions: 'Courez sur place en levant les genoux le plus haut possible.',
        tips: 'Utilisez vos bras pour maintenir l\'équilibre',
      },
    ],
  },
};

export default function WorkoutTimerScreen() {
  const { id } = useLocalSearchParams();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const workout = workoutData[id as string] || workoutData[1];
  const currentExercise = workout.exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise) {
      setTimeRemaining(isResting ? currentExercise.rest : currentExercise.duration);
    }
  }, [currentExerciseIndex, isResting, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (isResting) {
              // Rest finished, start next set or exercise
              if (currentExercise.currentSet < currentExercise.sets) {
                currentExercise.currentSet++;
                setIsResting(false);
                return currentExercise.duration;
              } else {
                // Move to next exercise
                handleNextExercise();
                return 0;
              }
            } else {
              // Exercise finished, start rest
              if (currentExercise.currentSet < currentExercise.sets) {
                setIsResting(true);
                return currentExercise.rest;
              } else {
                handleNextExercise();
                return 0;
              }
            }
          }
          return prev - 1;
        });
        setTotalElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, isResting, currentExercise, isPaused]);

  const handleBack = () => {
    if (isPlaying) {
      Alert.alert(
        'Quitter la séance',
        'Êtes-vous sûr de vouloir quitter ? Votre progression sera perdue.',
        [
          { text: 'Continuer', style: 'cancel' },
          { text: 'Quitter', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsResting(false);
      workout.exercises[currentExerciseIndex].currentSet = 1;
    } else {
      setSessionCompleted(true);
      setIsPlaying(false);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setIsResting(false);
      workout.exercises[currentExerciseIndex].currentSet = 1;
    }
  };

  const handleRestart = () => {
    setTimeRemaining(currentExercise.duration);
    setIsResting(false);
    currentExercise.currentSet = 1;
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleCompleteSession = () => {
    router.push('/workout-complete');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalExercises = workout.exercises.length;
    const currentProgress = currentExerciseIndex / totalExercises;
    return Math.min(currentProgress * 100, 100);
  };

  if (sessionCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completedContainer}>
          <CheckCircle size={80} color="#10B981" />
          <Text style={styles.completedTitle}>Séance terminée !</Text>
          <Text style={styles.completedSubtitle}>
            Félicitations ! Vous avez terminé votre séance en {formatTime(totalElapsedTime)}
          </Text>
          <View style={styles.completedStats}>
            <View style={styles.completedStat}>
              <Text style={styles.completedStatNumber}>{workout.exercises.length}</Text>
              <Text style={styles.completedStatLabel}>Exercices</Text>
            </View>
            <View style={styles.completedStat}>
              <Text style={styles.completedStatNumber}>{formatTime(totalElapsedTime)}</Text>
              <Text style={styles.completedStatLabel}>Durée</Text>
            </View>
            <View style={styles.completedStat}>
              <Text style={styles.completedStatNumber}>~350</Text>
              <Text style={styles.completedStatLabel}>Calories</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteSession}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>Voir mes résultats</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{workout.title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.timerSmall}>{formatTime(totalElapsedTime)}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Exercice {currentExerciseIndex + 1} sur {workout.exercises.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${getProgressPercentage()}%` }
            ]} 
          />
        </View>
      </View>

      {/* Exercise Image */}
      <View style={styles.exerciseImageContainer}>
        <Image source={{ uri: currentExercise.image }} style={styles.exerciseImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>
          {isResting ? 'Repos' : 'Exercice'}
        </Text>
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        <Text style={styles.setInfo}>
          Série {currentExercise.currentSet} sur {currentExercise.sets}
        </Text>
      </View>

      {/* Exercise Info */}
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseInstructions}>{currentExercise.instructions}</Text>
        {currentExercise.tips && (
          <Text style={styles.exerciseTips}>💡 {currentExercise.tips}</Text>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentExerciseIndex === 0 && styles.controlButtonDisabled]} 
          onPress={handlePreviousExercise}
          disabled={currentExerciseIndex === 0}
        >
          <RotateCcw size={24} color={currentExerciseIndex === 0 ? "#9CA3AF" : "#FFFFFF"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.playButtonGradient}
          >
            {isPlaying && !isPaused ? (
              <Pause size={32} color="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleNextExercise}>
          <SkipForward size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Status */}
      {isPaused && (
        <View style={styles.pausedIndicator}>
          <Text style={styles.pausedText}>En pause</Text>
        </View>
      )}

      {/* Restart Button */}
      <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
        <Text style={styles.restartButtonText}>Recommencer l'exercice</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  timerSmall: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC5300',
    borderRadius: 2,
  },
  exerciseImageContainer: {
    position: 'relative',
    height: 200,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 64,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  setInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  exerciseInfo: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  exerciseName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  exerciseInstructions: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  exerciseTips: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FCD34D',
    textAlign: 'center',
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  playButton: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  playButtonGradient: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pausedIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pausedText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
  },
  restartButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  restartButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completedTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 40,
    textAlign: 'center',
  },
  completedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  completedStat: {
    alignItems: 'center',
  },
  completedStatNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  completeButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});