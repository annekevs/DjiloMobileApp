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
import { ArrowLeft, CreditCard, Smartphone, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const paymentMethods = [
  {
    id: 'card',
    name: 'Carte bancaire',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    color: '#3B82F6',
  },
  {
    id: 'orange_money',
    name: 'Orange Money',
    description: 'Paiement mobile Orange',
    icon: Smartphone,
    color: '#FF6600',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png',
  },
  {
    id: 'mtn_money',
    name: 'MTN Mobile Money',
    description: 'Paiement mobile MTN',
    icon: Smartphone,
    color: '#FFCC00',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/MTN_Logo.svg/200px-MTN_Logo.svg.png',
  },
];

export default function PaymentMethodScreen() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    router.push('/subscription-terms');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const isFormValid = () => {
    if (selectedMethod === 'card') {
      return cardData.number.length >= 19 && cardData.expiry.length === 5 && 
             cardData.cvv.length >= 3 && cardData.name.length > 0;
    } else {
      return phoneNumber.length >= 8;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Mode de paiement</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Payment Methods */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Choisissez votre mode de paiement</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardSelected,
              ]}
              onPress={() => handleMethodSelect(method.id)}
            >
              <View style={styles.methodLeft}>
                <View style={[styles.methodIcon, { backgroundColor: `${method.color}20` }]}>
                  {method.logo ? (
                    <Image source={{ uri: method.logo }} style={styles.methodLogo} />
                  ) : (
                    <method.icon size={24} color={method.color} />
                  )}
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodDescription}>{method.description}</Text>
                </View>
              </View>
              <View style={[
                styles.methodRadio,
                selectedMethod === method.id && styles.methodRadioSelected,
              ]}>
                {selectedMethod === method.id && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Form */}
        {selectedMethod === 'card' && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informations de carte</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChangeText={(value) => handleCardInputChange('number', formatCardNumber(value))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  value={cardData.expiry}
                  onChangeText={(value) => handleCardInputChange('expiry', formatExpiry(value))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={cardData.cvv}
                  onChangeText={(value) => handleCardInputChange('cvv', value)}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nom sur la carte</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={cardData.name}
                onChangeText={(value) => handleCardInputChange('name', value)}
                autoCapitalize="words"
              />
            </View>
          </View>
        )}

        {(selectedMethod === 'orange_money' || selectedMethod === 'mtn_money') && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>
              {selectedMethod === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money'}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Numéro de téléphone</Text>
              <Text style={styles.inputHint}>
                {selectedMethod === 'orange_money' 
                  ? 'Format: 07 XX XX XX XX' 
                  : 'Format: 06 XX XX XX XX'
                }
              </Text>
              <TextInput
                style={styles.input}
                placeholder={selectedMethod === 'orange_money' ? '07 12 34 56 78' : '06 12 34 56 78'}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.mobilePaymentInfo}>
              <Text style={styles.infoTitle}>Comment ça marche ?</Text>
              <Text style={styles.infoText}>
                1. Saisissez votre numéro de téléphone{'\n'}
                2. Vous recevrez un SMS avec un code de confirmation{'\n'}
                3. Suivez les instructions pour valider le paiement{'\n'}
                4. Votre abonnement sera activé immédiatement
              </Text>
            </View>
          </View>
        )}

        {/* Security Info */}
        <View style={styles.securitySection}>
          <Text style={styles.securityTitle}>🔒 Paiement sécurisé</Text>
          <Text style={styles.securityText}>
            Vos informations de paiement sont protégées par un chiffrement SSL 256 bits. 
            Nous ne stockons jamais vos données bancaires.
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.continueButton, !isFormValid() && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid()}
        >
          <LinearGradient
            colors={isFormValid() ? ['#EC5300', '#FF6B35'] : ['#9CA3AF', '#9CA3AF']}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Continuer</Text>
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
  methodsSection: {
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    backgroundColor: '#FEF3E7',
    borderColor: '#EC5300',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  methodRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodRadioSelected: {
    backgroundColor: '#EC5300',
    borderColor: '#EC5300',
  },
  formSection: {
    paddingBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  inputHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  mobilePaymentInfo: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
  securitySection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 120,
  },
  securityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#059669',
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