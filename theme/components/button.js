// Example
export const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "500",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "12px",
      padding: "16px",
    },
    md: {
      fontSize: "16px",
      padding: "24px",
      whiteSpace: "nowrap",
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "gray.500",
    },
    solid: {
      bg: "green.500",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
