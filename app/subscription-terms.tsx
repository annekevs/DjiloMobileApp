import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SubscriptionTermsScreen() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCancellation, setAcceptedCancellation] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (acceptedTerms && acceptedCancellation) {
      router.push('/subscription-checkout');
    }
  };

  const canContinue = acceptedTerms && acceptedCancellation;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Conditions d'abonnement</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Terms of Service */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions d'utilisation</Text>
          <View style={styles.termsContent}>
            <Text style={styles.termsText}>
              <Text style={styles.bold}>1. Abonnement et Paiement</Text>{'\n'}
              • L'abonnement est renouvelé automatiquement selon la période choisie{'\n'}
              • Le paiement est prélevé à la date d'échéance{'\n'}
              • Les prix peuvent être modifiés avec un préavis de 30 jours{'\n\n'}

              <Text style={styles.bold}>2. Accès aux Services</Text>{'\n'}
              • Accès illimité aux programmes d'entraînement{'\n'}
              • Suivi personnalisé par un coach{'\n'}
              • Participation à la communauté{'\n'}
              • Support client 7j/7{'\n\n'}

              <Text style={styles.bold}>3. Utilisation Acceptable</Text>{'\n'}
              • Respecter les autres membres de la communauté{'\n'}
              • Ne pas partager votre compte{'\n'}
              • Utiliser les services à des fins personnelles uniquement{'\n'}
              • Signaler tout contenu inapproprié{'\n\n'}

              <Text style={styles.bold}>4. Propriété Intellectuelle</Text>{'\n'}
              • Tous les contenus sont protégés par des droits d'auteur{'\n'}
              • Interdiction de reproduire ou distribuer les programmes{'\n'}
              • Les vidéos et exercices sont exclusifs aux abonnés{'\n\n'}

              <Text style={styles.bold}>5. Limitation de Responsabilité</Text>{'\n'}
              • Consultez un médecin avant de commencer tout programme{'\n'}
              • FitCoach n'est pas responsable des blessures{'\n'}
              • Adaptez les exercices à votre condition physique
            </Text>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Politique d'annulation</Text>
          <View style={styles.termsContent}>
            <Text style={styles.termsText}>
              <Text style={styles.bold}>Période d'essai gratuite</Text>{'\n'}
              • 7 jours d'essai gratuit pour tous les nouveaux abonnés{'\n'}
              • Annulation possible à tout moment pendant l'essai{'\n'}
              • Aucun frais si annulation avant la fin de l'essai{'\n\n'}

              <Text style={styles.bold}>Annulation d'abonnement</Text>{'\n'}
              • Possible à tout moment depuis votre profil{'\n'}
              • Prend effet à la fin de la période de facturation en cours{'\n'}
              • Accès maintenu jusqu'à la date d'expiration{'\n'}
              • Aucun remboursement au prorata{'\n\n'}

              <Text style={styles.bold}>Remboursement</Text>{'\n'}
              • Remboursement intégral si annulation dans les 7 premiers jours{'\n'}
              • Aucun remboursement après la période d'essai{'\n'}
              • Exceptions possibles en cas de problème technique majeur{'\n\n'}

              <Text style={styles.bold}>Suspension de compte</Text>{'\n'}
              • En cas de non-paiement, suspension après 7 jours{'\n'}
              • Réactivation possible après régularisation{'\n'}
              • Suppression définitive après 30 jours de suspension{'\n\n'}

              <Text style={styles.bold}>Contact</Text>{'\n'}
              • Support disponible par email : support@fitcoach.com{'\n'}
              • Chat en direct dans l'application{'\n'}
              • Réponse sous 24h en moyenne
            </Text>
          </View>
        </View>

        {/* Privacy Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Politique de confidentialité</Text>
          <View style={styles.termsContent}>
            <Text style={styles.termsText}>
              <Text style={styles.bold}>Collecte de données</Text>{'\n'}
              • Informations personnelles (nom, email, âge){'\n'}
              • Données d'activité et de progression{'\n'}
              • Préférences et objectifs{'\n'}
              • Données de paiement (sécurisées){'\n\n'}

              <Text style={styles.bold}>Utilisation des données</Text>{'\n'}
              • Personnalisation des programmes{'\n'}
              • Suivi des progrès{'\n'}
              • Communication et support{'\n'}
              • Amélioration des services{'\n\n'}

              <Text style={styles.bold}>Partage des données</Text>{'\n'}
              • Aucun partage avec des tiers sans consentement{'\n'}
              • Données anonymisées pour les statistiques{'\n'}
              • Respect du RGPD{'\n\n'}

              <Text style={styles.bold}>Sécurité</Text>{'\n'}
              • Chiffrement des données sensibles{'\n'}
              • Serveurs sécurisés{'\n'}
              • Accès restreint aux employés autorisés
            </Text>
          </View>
        </View>

        {/* Acceptance Checkboxes */}
        <View style={styles.acceptanceSection}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Check size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>
              J'ai lu et j'accepte les conditions d'utilisation et la politique de confidentialité
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAcceptedCancellation(!acceptedCancellation)}
          >
            <View style={[styles.checkbox, acceptedCancellation && styles.checkboxChecked]}>
              {acceptedCancellation && <Check size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>
              J'ai lu et je comprends la politique d'annulation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <LinearGradient
            colors={canContinue ? ['#EC5300', '#FF6B35'] : ['#9CA3AF', '#9CA3AF']}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Continuer l'abonnement</Text>
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
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  termsContent: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  acceptanceSection: {
    marginVertical: 24,
    paddingBottom: 120,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#EC5300',
    borderColor: '#EC5300',
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
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
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});