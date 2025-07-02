import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw, CircleCheck as CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const workoutSessionData = {
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
        instructions: 'Sautez en écartant les jambes et en levant les bras au-dessus de la tête.',
      },
      {
        id: 2,
        name: 'Burpees',
        duration: 30,
        rest: 30,
        sets: 3,
        currentSet: 1,
        image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
        instructions: 'Position planche, saut vers les pieds, saut vertical, répétez.',
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
      },
    ],
  },
};

export default function WorkoutSessionScreen() {
  const { id } = useLocalSearchParams();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  const workout = workoutSessionData[id as string] || workoutSessionData[1];
  const currentExercise = workout.exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise) {
      setTimeRemaining(isResting ? currentExercise.rest : currentExercise.duration);
    }
  }, [currentExerciseIndex, isResting, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
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
              setIsResting(true);
              return currentExercise.rest;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, isResting, currentExercise]);

  const handleBack = () => {
    router.back();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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
  };

  const handleCompleteSession = () => {
    router.push('/workout-complete');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (sessionCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completedContainer}>
          <CheckCircle size={80} color="#10B981" />
          <Text style={styles.completedTitle}>Séance terminée !</Text>
          <Text style={styles.completedSubtitle}>Félicitations pour votre effort</Text>
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
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{workout.title}</Text>
        <View style={styles.headerRight} />
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
              { width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%` }
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
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton} 
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
            {isPlaying ? (
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
    width: 44,
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
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
  },
  completedSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 40,
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