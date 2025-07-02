import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: 'Quel est votre objectif principal ?',
    options: [
      { id: 'weight_loss', label: 'Perdre du poids', emoji: '🔥' },
      { id: 'muscle_gain', label: 'Prendre du muscle', emoji: '💪' },
      { id: 'fitness', label: 'Améliorer ma forme', emoji: '🏃' },
      { id: 'health', label: 'Rester en bonne santé', emoji: '❤️' },
    ],
  },
  {
    id: 2,
    title: 'Quel est votre niveau actuel ?',
    options: [
      { id: 'beginner', label: 'Débutant', description: 'Je commence tout juste' },
      { id: 'intermediate', label: 'Intermédiaire', description: 'J\'ai quelques bases' },
      { id: 'advanced', label: 'Avancé', description: 'Je m\'entraîne régulièrement' },
    ],
  },
  {
    id: 3,
    title: 'Combien de fois par semaine voulez-vous vous entraîner ?',
    options: [
      { id: '2', label: '2 fois par semaine', description: 'Pour commencer en douceur' },
      { id: '3', label: '3 fois par semaine', description: 'Un bon équilibre' },
      { id: '4', label: '4 fois par semaine', description: 'Pour des résultats rapides' },
      { id: '5+', label: '5+ fois par semaine', description: 'Je suis très motivé(e)' },
    ],
  },
  {
    id: 4,
    title: 'Quels équipements avez-vous ?',
    multiple: true,
    options: [
      { id: 'none', label: 'Aucun équipement', emoji: '🏠' },
      { id: 'dumbbells', label: 'Haltères', emoji: '🏋️' },
      { id: 'resistance_bands', label: 'Élastiques', emoji: '🎯' },
      { id: 'yoga_mat', label: 'Tapis de yoga', emoji: '🧘' },
      { id: 'gym_access', label: 'Accès à une salle', emoji: '🏢' },
    ],
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleOptionSelect = (optionId: string) => {
    if (currentStepData.multiple) {
      const currentAnswers = (answers[currentStepData.id] as string[]) || [];
      if (currentAnswers.includes(optionId)) {
        setAnswers(prev => ({
          ...prev,
          [currentStepData.id]: currentAnswers.filter(id => id !== optionId),
        }));
      } else {
        setAnswers(prev => ({
          ...prev,
          [currentStepData.id]: [...currentAnswers, optionId],
        }));
      }
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentStepData.id]: optionId,
      }));
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      // Complete onboarding
      router.replace('/(tabs)');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const isStepComplete = () => {
    const answer = answers[currentStepData.id];
    if (currentStepData.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const isOptionSelected = (optionId: string) => {
    const answer = answers[currentStepData.id];
    if (currentStepData.multiple) {
      return Array.isArray(answer) && answer.includes(optionId);
    }
    return answer === optionId;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} sur {onboardingSteps.length}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Question */}
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>{currentStepData.title}</Text>
          {currentStepData.multiple && (
            <Text style={styles.questionSubtitle}>Vous pouvez sélectionner plusieurs options</Text>
          )}
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentStepData.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                isOptionSelected(option.id) && styles.optionCardSelected,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              {option.emoji && (
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
              )}
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionLabel,
                  isOptionSelected(option.id) && styles.optionLabelSelected,
                ]}>
                  {option.label}
                </Text>
                {option.description && (
                  <Text style={[
                    styles.optionDescription,
                    isOptionSelected(option.id) && styles.optionDescriptionSelected,
                  ]}>
                    {option.description}
                  </Text>
                )}
              </View>
              <View style={[
                styles.optionRadio,
                isOptionSelected(option.id) && styles.optionRadioSelected,
              ]}>
                {isOptionSelected(option.id) && (
                  <View style={styles.optionRadioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.nextButton, !isStepComplete() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isStepComplete()}
        >
          <LinearGradient
            colors={isStepComplete() ? ['#EC5300', '#FF6B35'] : ['#9CA3AF', '#9CA3AF']}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Commencer' : 'Continuer'}
            </Text>
            <ArrowRight size={20} color="#FFFFFF" />
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
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC5300',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionSection: {
    paddingVertical: 32,
  },
  questionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  optionsContainer: {
    paddingBottom: 120,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: '#FEF3E7',
    borderColor: '#EC5300',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: '#EC5300',
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  optionDescriptionSelected: {
    color: '#9A3412',
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioSelected: {
    borderColor: '#EC5300',
  },
  optionRadioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC5300',
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
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});