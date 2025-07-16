import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function Checkbox({ checked, onToggle, disabled = false }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
      onPress={onToggle}
      disabled={disabled}
    >
      {checked && (
        <Check size={14} color={colors.white} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  disabled: {
    backgroundColor: colors.gray[200],
    borderColor: colors.gray[300],
  },
});