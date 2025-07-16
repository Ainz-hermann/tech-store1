import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button, styles[size]];

    if (variant === 'primary') {
      buttonStyle.push(styles.primaryButton);
    } else if (variant === 'outline') {
      buttonStyle.push(styles.outlineButton);
    } else if (variant === 'ghost') {
      buttonStyle.push(styles.ghostButton);
    }

    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyle = [styles.text];

    if (variant === 'primary') {
      textStyle.push(styles.primaryText);
    } else if (variant === 'outline') {
      textStyle.push(styles.outlineText);
    } else if (variant === 'ghost') {
      textStyle.push(styles.ghostText);
    }

    if (disabled) {
      textStyle.push(styles.disabledText);
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.white : colors.primary[600]} 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryButton: {
    backgroundColor: colors.primary[600],
  },
  outlineButton: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary[600],
  },
  ghostButton: {
    backgroundColor: colors.transparent,
  },
  disabledButton: {
    backgroundColor: colors.gray[200],
    borderColor: colors.gray[200],
  },
  text: {
    ...typography.button,
  },
  primaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary[600],
  },
  ghostText: {
    color: colors.primary[600],
  },
  disabledText: {
    color: colors.gray[500],
  },
});