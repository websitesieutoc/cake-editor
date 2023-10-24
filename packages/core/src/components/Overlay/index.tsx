import { Box } from "@/components";
export function Overlay() {
   return (
      <Box
         zIndex={1}
         padding={3}
         opacity={0.5}
         position="absolute"
         left="10px"
         top="10px"
         fontFamily="monospace"
         text-shadow="1px 1px 2px black"
         color="white"
         background="black"
      >
         W,A,S,D to move cake turntable.
      </Box>
   );
}