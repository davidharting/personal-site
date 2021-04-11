import Typography from "typography";
import StAnnesTheme from "typography-theme-st-annes";

const originalOrverideStyles = StAnnesTheme.overrideStyles;

StAnnesTheme.overrideStyles = (handles, options) => {
  const styles = originalOrverideStyles(handles, options);
  styles.a.color = "#1ca086";
  return styles;
};

const typography = new Typography(StAnnesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
