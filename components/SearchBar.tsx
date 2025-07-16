import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

export function SearchBar({ placeholder, value, onChangeText, autoFocus }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={18} color={colors.gray[500]} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[400]}
        returnKeyType="search"
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />
      {value && value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText?.('')} style={styles.clearButton}>
          <X size={18} color={colors.gray[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    flex: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    ...typography.body2,
    flex: 1,
    height: '100%',
    color: colors.gray[800],
  },
  clearButton: {
    padding: 4,
  },
});