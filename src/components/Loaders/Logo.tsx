import { motion } from "framer-motion";
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
} from "@chakra-ui/react"



const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} forwards 1s linear`;


  const imageStyles = {
    transform: "scale(0.1)" // Scale the image down to 80% of its original size
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Initial position at the bottom
      animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, duration: 1 } }} // Final position with floating animation
    >
      <motion.img
        //@ts-ignore
        src={"/logoHead.png"}
        alt="Logo"
        initial={{ scale: 0.2 }} // Initial scale down
        animate={{ scale: 0.4, transition: { type: "spring", stiffness: 100, damping: 10, duration: 1, delay: 0.5 } }} // Scale up with floating animation
      />
      {/* <chakra.img

        animation={animation} src={logo} ref={ref} {...props} style={imageStyles} /> */}
    </motion.div>

  );
})
