import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react';

interface GradientButtonProps extends ButtonProps {
  background: string[];
}

const GradientButton: React.FC<GradientButtonProps> = ({
  background,
  children,
  ...rest
}) => {
  const gradient = `linear-gradient(to right, ${background.join(', ')})`;
  const hoverGradient = `linear-gradient(to right, ${background
    .map(color => `${color}88`)
    .join(', ')})`;

  const bg = useColorModeValue(gradient, 'gray.700');
  const hoverBg = useColorModeValue(hoverGradient, 'gray.600');

  return (
    <Button
      bg={bg}
      h={["50px", "50px", "50px", "70px"]}
      fontSize={["md", "lg", "lg", "2xl"]}
      borderRadius={["25px", "25px", "25px", "50px"]}
      w={"250px"}
      // borderRadius={"25px"}
      _hover={{ bg: hoverBg }}
      color="white"
      fontWeight="bold"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
