import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

export function Input({ label, error, style, secureTextEntry, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.gray[400]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.gray[500]} />
            ) : (
              <Eye size={20} color={colors.gray[500]} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.label,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  inputContainerFocused: {
    borderColor: colors.primary[600],
  },
  inputContainerError: {
    borderColor: colors.error[600],
  },
  input: {
    ...typography.body1,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eyeIcon: {
    paddingRight: 16,
  },
  errorText: {
    ...typography.caption,
    color: colors.error[600],
    marginTop: 4,
  },
});