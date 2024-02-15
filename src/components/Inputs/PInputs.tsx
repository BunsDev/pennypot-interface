import { Input as ChakraInput, InputProps, useColorModeValue } from '@chakra-ui/react';
import { CSSProperties } from 'react';

interface CustomInputProps extends InputProps {
    gradientBorderColor?: string;
}

const PInput: React.FC<CustomInputProps> = ({ gradientBorderColor, ...rest }) => {
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const focusBorderColor = gradientBorderColor || 'blue.400';

    const styles: CSSProperties = {
        borderColor: borderColor,
        //@ts-ignore
        _focus: {
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
        },
        _active: {
            borderColor: focusBorderColor,
        },

    };

    return <ChakraInput
        h={["50px", "50px", "50px", "70px"]}
        variant="filled" size="lg" {...rest} sx={styles} />;
};

export default PInput;
